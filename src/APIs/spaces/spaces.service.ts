import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './entities/space.entity';
import { CreateSpaceDto } from './dto/create-space.dto';
import { SpaceRole } from '../spaces-roles/entities/space-role.entity';
import { User } from '../users/entities/user.entity';
import { UserSpace } from '../users_spaces/entities/user-space.entity';
import { JoinSpaceDTO } from './dto/join-space.dto';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>,
    @InjectRepository(SpaceRole)
    private readonly spaceRoleRepository: Repository<SpaceRole>,
    @InjectRepository(UserSpace)
    private readonly userSpaceRepository: Repository<UserSpace>
  ) {}

  // space 생성
  async createSpace(createSpaceDto: CreateSpaceDto, user: User): Promise<Space> {
    const { name, logo } = createSpaceDto;

    const space = new Space();
    space.name = name;
    space.logo = logo;
    space.adminCode = this.generateEntryCode();
    space.joinCode = this.generateEntryCode();
    space.createdAt = new Date();
    
    const role = new SpaceRole();
    role.isAdmin = true;
    role.isOwner = true;
    
    const userSpace = new UserSpace();
    userSpace.user = user;
    userSpace.space = space;
    userSpace.spaceRole = role;
    
    space.spaceRoles = [role]

    try {
      await this.spaceRoleRepository.save(role);

      await this.spaceRepository.save(space);
      await this.userSpaceRepository.save(userSpace);

      return space;
    } catch (error) {
      throw new Error('스페이스 생성에 실패했습니다.');
    }
  }

  // 입장 코드 생성
  private generateEntryCode(): string {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return code;
  }

  // space 조회
  async getSpacesByUser(user: User): Promise<Space[]> {
    const userSpaces = await this.userSpaceRepository.find({
      where: { user },
      relations: ['space'],
    });
  
    return userSpaces.map(userSpace => userSpace.space);
  }

  async joinSpace(joinSpaceDto: JoinSpaceDTO, user: User) {
    const { code } = joinSpaceDto;
  
    // 공간 찾기
    const space = await this.spaceRepository.findOne({where :{ joinCode :code }});
  
    if (!space) {
      throw new NotFoundException('입장 코드에 해당하는 공간을 찾을 수 없습니다.');
    }
  
    // isAdmin false 역할 생성
    const spaceRole = new SpaceRole();
    spaceRole.isAdmin = false;
    spaceRole.createdAt = new Date();
  
    // 유저와 역할, 공간 연결하여 저장
    const userSpace = new UserSpace();
    userSpace.user = user;
    userSpace.spaceRole = spaceRole;
    userSpace.space = space;
  
    try {
      // 역할과 유저를 저장
      await this.spaceRoleRepository.save(spaceRole);
      await this.userSpaceRepository.save(userSpace);
  
      return { space, isAdmin: spaceRole.isAdmin };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('공간 참여에 실패했습니다.');
    }
  }

  // 유저 역할 변경
  async updateSpaceRoles(spaceId: number, user: User, updatedRoles: SpaceRole[]): Promise<void> {
    const ownerRole = await this.spaceRoleRepository.findOne({
      where: { space: { id: spaceId }, isOwner: true },
      relations: ['userSpaces'],
    });

    if (!ownerRole || ownerRole.userSpaces[0].user.id !== user.id) {
      throw new UnauthorizedException('소유자만 업데이트 가능합니다.');
    }

    await Promise.all(
      updatedRoles.map(async (role) => {
        const existingRole = await this.spaceRoleRepository.findOne({
          where: {id: role.id},  relations: ['userSpaces'] });
        if (!existingRole) {
          throw new NotFoundException(`${{id: role.id}} 찾을 수 없음.`);
        }
        
        existingRole.isAdmin = role.isAdmin;
        existingRole.updatedAt = new Date();
        await this.spaceRoleRepository.save(existingRole);
      }),
    );
  }

  // 스페이스 삭제
  async deleteSpace(spaceId: number, user: User): Promise<boolean> {
    const space = await this.spaceRepository.findOne({
      where: {id: spaceId}, relations: ['spaceRoles'] });
  
    if (!space) {
      throw new NotFoundException('스페이스를 찾을 수 없습니다');
    }
  
    const ownerRole = space.spaceRoles.find((role) => role.isOwner);
  
    if (!ownerRole || ownerRole.isAdmin === false) {
      throw new UnauthorizedException('소유자만 스페이스를 삭제할 수 있습니다');
    }
  
    try {
      // 스페이스외 스페이스 롤의 deletedAt 값을 설정하여 소프트 삭제
      space.deletedAt = new Date();
      ownerRole.deletedAt = new Date();
      await this.spaceRepository.save(space);
  
      // 삭제 성공 시 true 반환
      return true;
    } catch (error) {
      // 삭제 실패 시 false 반환
      return false;
    }
  }
  
  // 스페이스 롤 삭제
  async softDeleteSpaceRole(ownerRoleId: number, targetRoleId: number): Promise<boolean> {
    const ownerRole = await this.spaceRoleRepository.findOne({
      where: {id: ownerRoleId}, relations: ['userSpaces'] });

    if (!ownerRole) {
      throw new NotFoundException('소유자 역할을 찾을 수 없습니다.');
    }

    if (!ownerRole.isOwner) {
      throw new UnauthorizedException('소유자만 역할을 삭제할 수 있습니다.');
    }

    const targetRole = await this.spaceRoleRepository.findOne({where: {id:targetRoleId}});

    if (!targetRole) {
      throw new NotFoundException('삭제할 역할을 찾을 수 없습니다.');
    }

    targetRole.deletedAt = new Date();
    await this.spaceRoleRepository.save(targetRole);

    return true;
  }
}
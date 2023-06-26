import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './entities/space.entity';
import { CreateSpaceDto } from './dto/create-space.dto';
import { SpaceRole } from '../spaces-roles/entities/space-role.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>,
    @InjectRepository(SpaceRole)
    private readonly spaceRoleRepository: Repository<SpaceRole>
  ) {}

  async createSpace(createSpaceDto: CreateSpaceDto): Promise<Space> {
    const { name, logo, isAdmin } = createSpaceDto;
  
    const space = new Space();
    space.name = name;
    space.logo = logo;
  
    const createdSpace = await this.spaceRepository.save(space);
  
    // Create and assign SpaceRole
    const spaceRole = new SpaceRole();
    spaceRole.isAdmin = isAdmin;
    spaceRole.space = createdSpace;
  
    await this.spaceRoleRepository.save(spaceRole);
  
    return createdSpace;
  }
  

  async getSpacesByUser(userId: number): Promise<Space[]> {
    return this.spaceRepository
      .createQueryBuilder('space')
      .leftJoin('space.userSpaces', 'userSpace')
      .where('userSpace.userId = :userId', { userId })
      .getMany();
  }

  // TODO: Implement other methods as needed
}




// import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Space } from './entities/space.entity';
// import { CreateSpaceDTO } from './dto/create-space.dto';
// import { UserSpace } from '../users_spaces/entities/user-space.entity';
// import { SpaceRole } from '../spaces-roles/entities/space-role.entity';
// import { SpaceRoleEnum } from '../spaces-roles/enum/space-role.enum';
// import { User } from '../users/entities/user.entity';
// import { UserIdDTO } from './dto/user-id.dto';
// import { PermissionDTO } from './dto/permission-space.dto';
// import { UpdateSpaceDTO } from './dto/update-space.dto';

// @Injectable()
// export class SpaceService {
//   constructor(
//     @InjectRepository(Space)
//     private readonly spaceRepository: Repository<Space>,
//     @InjectRepository(UserSpace)
//     private readonly userSpaceRepository: Repository<UserSpace>,
//     @InjectRepository(SpaceRole)
//     private readonly spaceRoleRepository: Repository<SpaceRole>,
//   ) {}

//   // space 생성
//   async createSpace(createSpaceDTO: CreateSpaceDTO, user: User): Promise<Space> {
//     const { name, logo, roles } = createSpaceDTO;

//     const adminCode = this.generateCode();
//     const participantCode = this.generateCode();

//     // 생성된 참가 코드를 space에 저장
//     const space = this.spaceRepository.create({
//       name,
//       logo,
//       adminCode,
//       participantCode,
//     });

//     await this.spaceRepository.save(space);

//     const ownerRole = await this.spaceRoleRepository.findOne({
//       where: { name: SpaceRoleEnum.Owner },
//     });

//     await this.userSpaceRepository.create({
//       user,
//       space,
//       spaceRole: ownerRole,
//     });

//     return space;
//   }

//   // 유저 space 조회
//   async getUserSpaces(user: User): Promise<Space[]> {
//     const userSpaces = await this.userSpaceRepository.find({
//       where: { user },
//       relations: ['space'],
//     });

//     return userSpaces.map((userSpace) => userSpace.space);
//   }

//   // space 생성 시 code 생성
//   private generateCode(): string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';

//     for (let i = 0; i < 8; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       code += characters.charAt(randomIndex);
//     }

//     return code;
//   }

//   async getSpaceById(spaceId: number): Promise<Space> {
//     const space = await this.spaceRepository.findOne({where: {id: spaceId}});

//     if (!space) {
//       throw new NotFoundException('스페이스를 찾을 수 없습니다.');
//     }

//     return space;
//   }

//   // 유저 권한 변경
//   async changeMemberPermissions(
//   spaceId: number,
//   permissionDTO: PermissionDTO,
// ): Promise<Space> {
//   const space = await this.getSpaceById(spaceId);
//   if (!space) {
//     throw new NotFoundException('스페이스를 찾을 수 없습니다.');
//   }

//   const { memberId, role } = permissionDTO;
//   const userSpace = await this.userSpaceRepository.findOne({
//     where: { space, user: { id: memberId } },
//     relations: ['spaceRole'],
//   });

//   if (!userSpace) {
//     throw new NotFoundException('유저를 찾을 수 없습니다.');
//   }

//   // 새로운 SpaceRole 엔터티 생성
//   const newSpaceRole = await this.spaceRoleRepository.findOne({
//     where: { name: role },
//   });

//   if (!newSpaceRole) {
//     throw new NotFoundException('권한을 찾을 수 없습니다.');
//   }

//   // 유저의 권한 변경
//   userSpace.spaceRole = newSpaceRole;

//   // 변경된 유저 권한 정보를 저장
//   await this.userSpaceRepository.save(userSpace);

//   return space;
// }

//   // 소유자 임명
//   async appointOwner(spaceId: number, userIdDTO: UserIdDTO): Promise<Space> {
//     const space = await this.getSpaceById(spaceId);
//     if (!space) {
//       throw new NotFoundException('스페이스가 존재하지 않습니다.');
//     }
//     return space;
//   }

//   // 스페이스 참가를 위한 코드
//   async getSpaceByParticipantCode(code: string): Promise<Space | undefined> {
//     return this.spaceRepository.findOne({ where: { participantCode: code } });
//   }

//   // 스페이스 업데이트
//   async updateSpace(spaceId: number, updateSpaceDTO: UpdateSpaceDTO, ownerId: number): Promise<Space> {
//     const space = await this.spaceRepository.findOne({ where: { id: spaceId }});
  
//     if (!space) {
//       throw new NotFoundException('스페이스가 존재하지 않습니다.');
//     }
  
//     const userSpace = await this.userSpaceRepository.findOne({
//       where: { space, user: { id: ownerId } },
//       relations: ['spaceRole'],
//     });
  
//     if (!userSpace || userSpace.spaceRole.name !== SpaceRoleEnum.Owner) {
//       throw new ForbiddenException('스페이스 소유자만 업데이트가 가능합니다.');
//     }
  
//     space.name = updateSpaceDTO.name;
//     space.logo = updateSpaceDTO.logo;
  
//     return this.spaceRepository.save(space);
//   }

//   // 스페이스 삭제
//   async softDeleteSpace(spaceId: number, ownerId: number): Promise<void> {
//     const space = await this.spaceRepository.findOne({where: { id: spaceId }});

//     if (!space) {
//       throw new NotFoundException('Space를 찾을 수 없습니다.');
//     }

//     const userSpace = await this.userSpaceRepository.findOne({
//       where: { space, user: { id: ownerId } },
//       relations: ['spaceRole'],
//     });

//     if (!userSpace || userSpace.spaceRole.name !== SpaceRoleEnum.Owner) {
//       throw new ForbiddenException('Space 소유자만 삭제 가능합니다.');
//     }

//     await this.spaceRepository.softDelete(spaceId);
//   }
// }
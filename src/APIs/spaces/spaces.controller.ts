import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SpaceService } from './spaces.service';
import { Space } from './entities/space.entity';
import { CreateSpaceDto } from './dto/create-space.dto';

@Controller('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async createSpace(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
  return this.spaceService.createSpace(createSpaceDto);
}

}




// import { Controller, Get, Post, Body, UseGuards, Param, NotFoundException, Delete, Req, Patch } from '@nestjs/common';
// import { CreateSpaceDTO } from './dto/create-space.dto';
// import { User } from '../users/entities/user.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { SpaceService } from './spaces.service';
// import { Roles } from './decorators/roles.decorator';
// import { RolesGuard } from '../roles/roles.guard';
// import { SpaceRoleEnum } from '../spaces-roles/enum/space-role.enum';
// import { PermissionDTO } from './dto/permission-space.dto';
// import { UserIdDTO } from './dto/user-id.dto';
// import { JoinSpaceDTO } from './dto/join-space.dto';
// import { UpdateSpaceDTO } from './dto/update-space.dto';
// import { GetUser } from './decorators/getuser.decorator';
// import { UserSpace } from '../users_spaces/entities/user-space.entity';

// @Controller('spaces')
// export class SpaceController {
//   constructor(private readonly spaceService: SpaceService) {}

//   @Get()
//   @UseGuards(AuthGuard('jwt'))
//   async getUserSpaces(@GetUser() user: User) {
//     return this.spaceService.getUserSpaces(user);
//   }

//   // 스페이스 생성
//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(SpaceRoleEnum.Owner)
//   async createSpace(@Body() createSpaceDTO: CreateSpaceDTO, @GetUser() user: User) {
//     const { name, logo, spaceRoles } = createSpaceDTO;
//     const space = await this.spaceService.createSpace(name, logo, user);
    
//     const ownerRole = spaceRoles.find(role => role.isAdmin);
//     await this.spaceService.addUserToSpace(space, user, ownerRole);
    
//     return space;
//   }

//   // 소유자 권한 변경
//   @Post(':id/permissions')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(SpaceRoleEnum.Owner)
//   async changeMemberPermissions(
//     @Param('id') id: number,
//     @Body() permissionDTO: PermissionDTO,
//   ) {
//     const { userId, isAdmin } = permissionDTO;
//     const userSpace = await this.spaceService.getUserSpaceBySpaceIdAndUserId(id, userId);
//     if (!userSpace) {
//       throw new NotFoundException('UserSpace를 찾을 수 없습니다.');
//     }

//     userSpace.spaceRole.isAdmin = isAdmin;
//     await this.spaceService.saveUserSpace(userSpace);

//     return userSpace;
//   }

//   // 소유자 임명
//   @Post(':id/appoint-owner')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(SpaceRoleEnum.Owner)
//   async appointOwner(@Param('id') id: number, @Body() userIdDTO: UserIdDTO) {
//     const { userId } = userIdDTO;
//     const user = await this.spaceService.getUserById(userId);
//     if (!user) {
//       throw new NotFoundException('사용자를 찾을 수 없습니다.');
//     }

//     const space = await this.spaceService.getSpaceById(id);
//     if (!space) {
//       throw new NotFoundException('Space를 찾을 수 없습니다.');
//     }

//     const ownerRole = space.spaceRoles.find(role => role.isAdmin);
//     if (!ownerRole) {
//       throw new NotFoundException('Owner 역할을 찾을 수 없습니다.');
//     }

//     await this.spaceService.addUserToSpace(space, user, ownerRole);

//     return space;
//   }

//   // space 참가
//   @Post('/join')
//   async joinSpace(@Body() joinSpaceDTO: JoinSpaceDTO, @GetUser() user: User) {
//     const { code } = joinSpaceDTO;
//     const space = await this.spaceService.getSpaceByParticipantCode(code);
//     if (!space) {
//       throw new NotFoundException('Space를 찾을 수 없습니다.');
//     }
    
//     const userSpace = await this.spaceService.getUserSpaceBySpaceIdAndUserId(space.id, user.id);
//     if (userSpace) {
//       throw new NotFoundException('이미 Space에 참여 중입니다.');
//     }

//     const participantRole = space.spaceRoles.find(role => !role.isAdmin);
//     if (!participantRole) {
//       throw new NotFoundException('Participant 역할을 찾을 수 없습니다.');
//     }

//     await this.spaceService.addUserToSpace(space, user, participantRole);

//     return space;
//   }

//   // space 수정
//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(SpaceRoleEnum.Owner)
//   async updateSpace(
//     @Param('id') id: number,
//     @Body() updateSpaceDTO: UpdateSpaceDTO,
//     @GetUser() user: User,
//   ) {
//     const { name, logo } = updateSpaceDTO;
//     const space = await this.spaceService.getSpaceById(id);
//     if (!space) {
//       throw new NotFoundException('Space를 찾을 수 없습니다.');
//     }

//     space.name = name;
//     space.logo = logo;

//     await this.spaceService.saveSpace(space);

//     return space;
//   }

//   // space 삭제
//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(SpaceRoleEnum.Owner)
//   async deleteSpace(@Param('id') id: number, @GetUser() user: User) {
//     const space = await this.spaceService.getSpaceById(id);
//     if (!space) {
//       throw new NotFoundException('Space를 찾을 수 없습니다.');
//     }

//     await this.spaceService.removeSpace(space);

//     return space;
//   }
// }

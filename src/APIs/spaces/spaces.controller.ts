import { Controller, Get, Post, Body, Param, Request, UseGuards, Req,
  Patch, Delete, UnauthorizedException, ParseIntPipe} from '@nestjs/common';
import { SpaceService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { GetUser } from './decorators/getuser.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Space } from './entities/space.entity';
import { JoinSpaceDTO } from './dto/join-space.dto';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { CurrentUser } from './decorators/current-user.decorator';
import { SpaceRole } from '../spaces-roles/entities/space-role.entity';

@Controller('spaces')
export class SpaceController {
  constructor(
    private readonly spaceService: SpaceService) {}

  // space 생성
  @Post()
  @UseGuards(AuthGuard)
  async createSpace(@Body() createSpaceDto: CreateSpaceDto, @GetUser() user: User) {
    return this.spaceService.createSpace(createSpaceDto, user);
  }

  // space 조회
  @UseGuards(AuthGuard)
  @Get('user')
  async getUserSpaces(@Request() req): Promise<Space[]> {
    const user: User = req.user;
    return this.spaceService.getSpacesByUser(user);
  }

  // space 조인
  @Post('join')
  async joinSpace(
    @Body() joinSpaceDto: JoinSpaceDTO,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user; // 인증된 사용자 정보

    const result = await this.spaceService.joinSpace(joinSpaceDto, user);
    return result;
  }

  // 유저 권한 변경
  @UseGuards(AuthGuard)
  @Patch(':id/space-roles')
  async updateSpaceRoles(
    @Param('id') spaceId: number,
    @Body() updatedRoles: SpaceRole[],
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.spaceService.updateSpaceRoles(spaceId, user, updatedRoles);
  }

  // 스페이스 삭제
  @Delete(':id')
  async deleteSpace(@Param('id') id: number, @Req() req: RequestWithUser): Promise<boolean> {
    const success = await this.spaceService.deleteSpace(id, req.user);
    if (!success) {
      throw new UnauthorizedException('스페이스 삭제 실패');
    }
    return true;
  }

  // 스페이스 롤 삭제
  @Delete('/:spaceId/roles/:roleId')
  async softDeleteSpaceRole(
    @Param('spaceId', ParseIntPipe) spaceId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this.spaceService.softDeleteSpaceRole(spaceId, roleId);
  }
}
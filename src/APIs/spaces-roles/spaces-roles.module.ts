import { Module } from '@nestjs/common';
import { SpacesRolesController } from './spaces-roles.controller';
import { SpacesRolesService } from './spaces-roles.service';

@Module({
  controllers: [SpacesRolesController],
  providers: [SpacesRolesService]
})
export class UsersModule {}

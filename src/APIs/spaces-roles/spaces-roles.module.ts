import { Module } from '@nestjs/common';
import { SpacesRolesController } from './spaces-roles.controller';
import { SpacesRolesService } from './spaces-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceRole } from './entities/space-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceRole])],
  controllers: [SpacesRolesController],
  providers: [SpacesRolesService],
  exports: [SpacesRolesService]
})
export class SpacesRolesModule {}

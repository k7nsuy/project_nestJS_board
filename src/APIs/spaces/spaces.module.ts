import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { SpaceController } from './spaces.controller';
import { SpaceService } from './spaces.service';
import { SpacesRolesModule } from '../spaces-roles/spaces-roles.module';
import { SpaceRole } from '../spaces-roles/entities/space-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space, SpaceRole])],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpacesModule {}

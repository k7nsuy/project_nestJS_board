import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { SpaceController } from './spaces.controller';
import { SpaceService } from './spaces.service';
import { SpaceRole } from '../spaces-roles/entities/space-role.entity';
import { UserSpace } from '../users_spaces/entities/user-space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space, SpaceRole, UserSpace])],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpacesModule {}

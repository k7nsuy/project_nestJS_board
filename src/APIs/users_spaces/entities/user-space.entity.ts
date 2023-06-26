import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Space } from '../../spaces/entities/space.entity';
import { SpaceRole } from '../../spaces-roles/entities/space-role.entity';

@Entity()
export class UserSpace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSpaces)
  user: User;

  @ManyToOne(() => Space, (space) => space.userSpaces)
  space: Space;

  @ManyToOne(() => SpaceRole, (spaceRole) => spaceRole.userSpaces)
  spaceRole: SpaceRole;
}


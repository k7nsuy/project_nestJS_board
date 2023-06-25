import { Space } from 'src/APIs/spaces/entities/space.entity';
import { UserSpace } from 'src/APIs/users_spaces/user-space.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,
     CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne  } from 'typeorm';

@Entity()
export class SpaceRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn() // 데이터 등록시 자동으로 시간 추가
  createdAt: Date

  @UpdateDateColumn() // 데이터 업데이트 시 자동으로 시간 추가
  updatedAt: Date

  @DeleteDateColumn() // soft 삭제를 위한 시간 칼럼 추가
  deletedAt: Date;

  @ManyToOne(() => Space, space => space.spaceRoles)
  space: Space;

  @OneToMany(() => UserSpace, userSpace => userSpace.spaceRole)
  userSpaces: UserSpace[];
}

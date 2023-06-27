import { Post } from 'src/APIs/posts/entities/post.entity';
import { SpaceRole } from 'src/APIs/spaces-roles/entities/space-role.entity';
// import { UserSpace } from 'src/APIs/users_spaces/entities/user-space.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,
CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne,
JoinColumn} from 'typeorm';
import { UserSpace } from 'src/APIs/users_spaces/entities/user-space.entity';
import { IsString, Length } from 'class-validator';
import { User } from 'src/APIs/users/entities/user.entity';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @IsString()
  @Length(8, 8)
  adminCode: string;

  @IsString()
  @Length(8, 8)
  joinCode: string;

  @CreateDateColumn() // 데이터 등록시 자동으로 시간 추가
  createdAt: Date

  @UpdateDateColumn() // 데이터 업데이트 시 자동으로 시간 추가
  updatedAt: Date

  @DeleteDateColumn() // soft 삭제를 위한 시간 칼럼 추가
  deletedAt: Date;

  @OneToMany(() => Post, post => post.space, { cascade: true })
  posts: Post[];

  @OneToMany(() => SpaceRole, spaceRole => spaceRole.space, { cascade: true })
  spaceRoles: SpaceRole[];

  @OneToMany(() => UserSpace, userSpace => userSpace.space)
  userSpaces: UserSpace[];
}


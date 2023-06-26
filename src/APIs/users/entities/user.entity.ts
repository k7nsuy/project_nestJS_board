import { Chat } from 'src/APIs/chats/entities/chat.entity';
import { Post } from 'src/APIs/posts/entities/post.entity';
import { Space } from 'src/APIs/spaces/entities/space.entity';
import { UserSpace } from 'src/APIs/users_spaces/entities/user-space.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn,
  CreateDateColumn, UpdateDateColumn } from 'typeorm';

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({ nullable: true })
    profilePicture: string;

    @CreateDateColumn() // 데이터 등록시 자동으로 시간 추가
    createdAt: Date

    @UpdateDateColumn() // 데이터 업데이트 시 자동으로 시간 추가
    updatedAt: Date

    @DeleteDateColumn() // soft 삭제를 위한 시간 칼럼 추가
    deletedAt: Date;
  
    @OneToMany(() => Post, post => post.author)
    posts: Post[];
  
    @OneToMany(() => Chat, chat => chat.author)
    chats: Chat[];

    @OneToMany(() => UserSpace, userSpace => userSpace.user)
    userSpaces: UserSpace[];
}
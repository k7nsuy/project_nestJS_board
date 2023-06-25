import { Chat } from 'src/APIs/chats/entities/chat.entity';
import { Space } from 'src/APIs/spaces/entities/space.entity';
import { User } from 'src/APIs/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
     CreateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: string; // "공지" 또는 "질문"

  @Column({ nullable: true })
  attachment: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @CreateDateColumn() // 데이터 등록시 자동으로 시간 추가
  createdAt: Date

  @DeleteDateColumn() // soft 삭제를 위한 시간 칼럼 추가
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Space, (space) => space.posts)
  space: Space;

  @OneToMany(() => Chat, (chat) => chat.post)
  chats: Chat[];
}

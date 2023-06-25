import { Post } from 'src/APIs/posts/entities/post.entity';
import { User } from 'src/APIs/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
     CreateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isAnonymous: boolean;

  @CreateDateColumn() // 데이터 등록시 자동으로 시간 추가
  createdAt: Date

  @DeleteDateColumn() // soft 삭제를 위한 시간 칼럼 추가
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.chats)
  author: User;

  @ManyToOne(() => Post, (post) => post.chats)
  post: Post;

  @ManyToOne(() => Chat, (chat) => chat.replies)
  parentComment: Chat;

  @OneToMany(() => Chat, (chat) => chat.parentComment)
  replies: Chat[];
}

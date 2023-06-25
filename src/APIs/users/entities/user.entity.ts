import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn,
  CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileImage: string;

  @CreateDateColumn() // 데이터 등록시 자동으로 시간 추가
  createdAt: Date

  @UpdateDateColumn() // 데이터 업데이트 시 자동으로 시간 추가
  updatedAt: Date

  @DeleteDateColumn() // soft 삭제를 위한 시간 칼럼 추가
  deletedAt: Date;

  // @OneToMany(() => Post, (post) => post.userId)
  // posts: Post[];

  // @OneToMany(() => Comment, (comment) => comment.userId)
  // comments: Comment[];
}

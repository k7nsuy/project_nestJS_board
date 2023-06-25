// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

// @Entity('spaces')
// export class SpaceEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column()
//   logo: string;

//   @ManyToMany(() => UserEntity)
//   @JoinTable()
//   members: UserEntity[];

//   @ManyToMany(() => UserEntity)
//   @JoinTable()
//   owners: UserEntity[];

//   @OneToMany(() => SpaceRoleEntity, spaceRoles => spaceRoles.space)
//   spaceRoles: SpaceRoleEntity[];

//   @Column({ default: false })
//   isDeleted: boolean;

//   @Column('simple-array')
//   adminCodes: string[];

//   @Column('simple-array')
//   participantCodes: string[];
// }

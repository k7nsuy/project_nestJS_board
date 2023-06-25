// import { Repository } from 'typeorm';
// import { Space } from './space.entity';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SpaceRepository extends Repository<Space> {
//   async createSpace(name: string, logo: string, ownerId: number): Promise<Space> {
//     const space = new Space();
//     space.name = name;
//     space.logo = logo;
//     space.ownerId = ownerId;
//     // 다른 필요한 속성 설정

//     return this.save(space); // 데이터베이스에 공간 생성 및 저장
//   }

//   async updateSpace(space: Space): Promise<Space> {
//     return this.save(space); // 데이터베이스에서 공간 업데이트
//   }

//   async deleteSpace(spaceId: number): Promise<void> {
//     await this.softDelete(spaceId); // 공간 소프트 삭제
//   }

//   // async findById(spaceId: number): Promise<Space> {
//   //   return this.findOne(spaceId); // 공간 아이디로 조회
//   // }

//   // 다른 필요한 메서드들 추가
// }

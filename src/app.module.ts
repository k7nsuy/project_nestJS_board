import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { moduleConfig } from './configs/module.config';
import { UsersModule } from './APIs/users/users.module';
import databaseConfig from './configs/database.config';
import { UserSpaceModule } from './APIs/users_spaces/user-space.module';
import { SpacesModule } from './APIs/spaces/spaces.module';
import { PostsModule } from './APIs/posts/posts.module';
import { ChatsModule } from './APIs/chats/chats.module';
import { SpacesRolesModule } from './APIs/spaces-roles/spaces-roles.module';
import { AuthModule } from './APIs/auth/auth.module';
import 'dotenv/config'

@Module({
  imports: [AuthModule, UsersModule, UserSpaceModule, SpacesModule, SpacesRolesModule,
    PostsModule, ChatsModule,
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      ...databaseConfig[process.env.NODE_ENV],
      entities: [__dirname + '/APIs/**/entities/*.entity.{js,ts}'],
    })
  }),
  ConfigModule.forRoot(moduleConfig)],
  controllers: [],
  providers: [],
})

export class AppModule {}

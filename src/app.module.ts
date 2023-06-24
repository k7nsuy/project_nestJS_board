import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { moduleConfig } from './configs/module.config';
import { UsersModule } from './APIs/users/users.module';
import { AuthModule } from './APIs/auth/auth.module';
import { SpacesModule } from './APIs/spaces/spaces.module';
import { PostsModule } from './APIs/posts/posts.module';
import { ChatsModule } from './APIs/chats/chats.module';
import databaseConfig from './configs/database.config';

@Module({
  imports: [UsersModule, AuthModule, SpacesModule, PostsModule, ChatsModule,
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      ...databaseConfig[process.env.NODE_ENV || 'development'],
      entities: [__dirname + '../src/APIs/**/entities/*.entity.{js,ts}'],
    })
  }),
  ConfigModule.forRoot(moduleConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}

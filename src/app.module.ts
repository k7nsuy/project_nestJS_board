import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { moduleConfig } from './configs/module.config';
import { UsersModule } from './APIs/users/users.module';
import databaseConfig from './configs/database.config';

@Module({
  imports: [UsersModule,
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      ...databaseConfig[process.env.NODE_ENV || 'development'],
      entities: [__dirname + '/APIs/**/entities/*.entity.{js,ts}'],
    })
  }),
  ConfigModule.forRoot(moduleConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}

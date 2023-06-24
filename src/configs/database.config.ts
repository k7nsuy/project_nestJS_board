// config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: Record<string, TypeOrmModuleOptions> = {
  production: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1390',
    database: 'board_production',
    synchronize: false,
    logging: false,
    // 기타 필요한 설정
  },
  development: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1390',
    database: 'board_development',
    synchronize: true,
    logging: true,
    // 기타 필요한 설정
  },
};

export default databaseConfig;

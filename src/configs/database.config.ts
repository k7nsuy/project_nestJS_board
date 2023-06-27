import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config'

const databaseConfig: Record<string, TypeOrmModuleOptions> = {
  production: {
    type: 'mysql',
    host: process.env.DB_PROD_HOST,
    port: parseInt(process.env.DB_PROD_PORT),
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    synchronize: false,
    logging: false,
    // 기타 필요한 설정
  },
  development: {
    type: 'mysql',
    host: process.env.DB_DEV_HOST,
    port: parseInt(process.env.DB_DEV_PORT),
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASE,
    synchronize: true,
    logging: true,
    // 기타 필요한 설정
  },
};

export default databaseConfig;

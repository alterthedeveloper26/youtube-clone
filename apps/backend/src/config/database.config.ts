import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: configService.get<number>('DB_PORT') || 5432,
  username: configService.get<string>('DB_USERNAME') || 'postgres',
  password: configService.get<string>('DB_PASSWORD') || 'postgres',
  database: configService.get<string>('DB_NAME') || 'youtube_clone',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: configService.get<string>('NODE_ENV') !== 'production', // Auto-sync in dev
  logging: configService.get<string>('NODE_ENV') === 'development',
  ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
});


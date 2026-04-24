import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Decision } from './entities/decision.entity';
import { Friction } from './entities/friction.entity';
import { TimeBreakdown } from './entities/time-breakdown.entity';
import { User } from './entities/user.entity';
import { WorkSession } from './entities/work-session.entity';
import { Attachment } from './entities/attachment.entity';
import { DecisionsModule } from './decisions/decisions.module';
import { FrictionsModule } from './frictions/frictions.module';
import { ReportsModule } from './reports/reports.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const sslEnabled = config.get<string>('DB_SSL', 'true') === 'true';

        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            ssl: sslEnabled ? { rejectUnauthorized: false } : false,
            entities: [User, WorkSession, Decision, Friction, TimeBreakdown, Attachment],
            synchronize: false,
            logging: false,
          };
        }

        return {
          type: 'postgres' as const,
          host: config.get<string>('DB_HOST', 'localhost'),
          port: Number(config.get<string>('DB_PORT', 5432)),
          username: config.get<string>('DB_USER', 'postgres'),
          password: config.get<string>('DB_PASSWORD', 'postgres'),
          database: config.get<string>('DB_NAME', 'dev_intelligence'),
          ssl: sslEnabled ? { rejectUnauthorized: false } : false,
          entities: [User, WorkSession, Decision, Friction, TimeBreakdown, Attachment],
          synchronize: false,
          logging: false,
        };
      },
    }),
    AuthModule,
    SessionsModule,
    DecisionsModule,
    FrictionsModule,
    DashboardModule,
    ReportsModule,
  ],
})
export class AppModule {}

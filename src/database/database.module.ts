import { Module, Global } from '@nestjs/common';
import { Client } from 'pg'; // import to connect Nest with Postgres
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm'; // import to connect Nest with Postgres via TypeORM

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    // use TypeOrmModule to connect Nest with Postgres vis TypeORM
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres; // Read configService for corresponding database (postgres, mysql)
        return {
          type: 'postgres', // Select database (postgres, mysql)
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: true, // Synchronize database conection for table creation in dev mode. MUST BE false IN PROD MODE!
          autoLoadEntities: true, // Entities must be auto loaded
        };
      },
    }),
  ],

  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG', // provide app with database conection
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;

        // New instance of conection created with > new Client
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect(); // connection established
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}

import { Module, Global } from '@nestjs/common';
import { Client } from 'pg'; // import to connect nest with postgres
import { ConfigType } from '@nestjs/config';
import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
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
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}

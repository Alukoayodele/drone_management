import 'reflect-metadata';


import { config } from '@config';
import { DataSource } from 'typeorm';
import { Drone, Fleet, Medication } from './repositories';
import { InitDrone1706574610442 } from './migrations/1706574610442-init-drone';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    migrationsRun: true,
    logging: true,
    entities: [Drone, Fleet, Medication],
    migrations: [InitDrone1706574610442],
    extra: {
        // max connection pool size
        max: 20,
        // connection timeout
        connectionTimeoutMillis: 10000,
    },
});

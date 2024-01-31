import 'reflect-metadata';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from '@config';
import { DataSource } from 'typeorm';
import { Drone, Fleet, Medication } from './repositories';
import { InitializedDroneManagement1706714075919 } from './migrations/1706714075919-initialized-drone-management';


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
    migrations: [InitializedDroneManagement1706714075919],
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
        // max connection pool size
        max: 20,
        // connection timeout
        connectionTimeoutMillis: 10000,
    },
});

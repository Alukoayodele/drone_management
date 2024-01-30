import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeding/main.seeder";
import { Fleet } from "../repositories";
import { FleetFactory } from "./seeding/factories/fleet.factory";
import { config } from '@config';

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    password: config.db.password,
    entities: [Fleet],
    factories: [FleetFactory],
    seeds: [MainSeeder]
}

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
});

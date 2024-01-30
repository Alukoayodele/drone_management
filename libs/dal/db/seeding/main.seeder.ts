import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";

import { Fleet } from "@dm/dal/repositories";

export class MainSeeder implements Seeder {
    public async run(datasource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        // const fleetRepository = datasource.getRepository(Fleet)

        const fleetFactory = factoryManager.get(Fleet)

        const fleets = await fleetFactory.saveMany(3);
    }
}

import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";


import { Fleet } from '@dm/dal/repositories/drone/fleet.schema';

export const FleetFactory = setSeederFactory(Fleet, (faker: Faker) => {
    const fleet = new Fleet();
    fleet.name = faker.company.name();
    return fleet;
});


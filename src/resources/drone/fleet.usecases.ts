import { Fleet, FleetRepository } from '@dm/dal';
import DroneUsecases from './drone.usecases';
import { DroneModelEnum } from '@dm/dal/repositories/drone/type';
class FleetUsecases {
    private fleetRepository;


    constructor() {
        this.fleetRepository = new FleetRepository()

    }

    async findFleet() {
        return this.fleetRepository.find({})

    }

    async getFleetById(id: number) {
        return this.fleetRepository.findOne({ id })

    }

    async createFleetIfNotExists() {
        const fleets = await this.fleetRepository.find({})
        if (fleets.length >= 1) {
            return;
        }

        const fleet = new Fleet();
        fleet.name = 'My first fleet';
        const newFleet = await this.fleetRepository.save(fleet);
        console.log(`Database prepopulated`)
        return newFleet;
    }
}

export default FleetUsecases;

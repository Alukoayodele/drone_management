import { Fleet, FleetRepository } from '@dm/dal';
class FleetUsecases {
    private fleetRepository;


    constructor() {
        this.fleetRepository = new FleetRepository()
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
        const firstFleet = await this.fleetRepository.save(fleet);
        console.log(`First Fleet created with fleet id :${firstFleet.id}`)
    }
}

export default FleetUsecases;

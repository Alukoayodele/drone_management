import { Fleet, FleetRepository } from '@dm/dal';

class FleetUsecases {
    private fleetRepository;


    constructor() {
        this.fleetRepository = new FleetRepository()
    }

    async getFleetById(id: number) {
        return this.fleetRepository.findOne({ id })

    }
}

export default FleetUsecases;

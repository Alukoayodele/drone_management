import { Drone, DroneRepository, Fleet } from '@dm/dal';
import { DroneStateEnum } from '@dm/dal/repositories/drone/type';
import { CreateDroneCommand } from './types';
import FleetUsecases from './fleet.usecases';

class DroneUsecases {
    private droneRepository;
    private fleetUsecases;


    constructor() {
        this.droneRepository = new DroneRepository()
        this.fleetUsecases = new FleetUsecases();
    }

    async registerDrone(command: CreateDroneCommand) {
        const fleet = (await this.fleetUsecases.getFleetById(command.fleetId)) as Fleet;
        const drone = new Drone();
        drone.batteryCapacity = command.batteryCapacity;
        drone.model = command.model;
        drone.serialNumber = command.serialNumber;
        drone.weightLimit = command.weightLimit;
        drone.state = DroneStateEnum.IDLE;
        drone.fleet = fleet;

        const newDrone = await this.droneRepository.save(drone);

        return newDrone;

    }
}

export default DroneUsecases;

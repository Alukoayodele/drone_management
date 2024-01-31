import { Drone, DroneRepository, Fleet, Medication } from '@dm/dal';
import { DroneStateEnum } from '@dm/dal/repositories/drone/type';
import { CreateDroneCommand } from './types';
import FleetUsecases from './fleet.usecases';
import { BadRequest } from '@exceptions';
import MedicationUsecases from '@resources/medication/medication.usecases';
import { MedicationInput } from '@resources/medication/type';

class DroneUsecases {
    private droneRepository;
    private fleetUsecases;
    private medicationUsecases;


    constructor() {
        this.droneRepository = new DroneRepository();
        this.fleetUsecases = new FleetUsecases();
        this.medicationUsecases = new MedicationUsecases()
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

    async loadDrone(droneId: number, medications: MedicationInput[]) {
        const drone = (await this.findDroneById(droneId)) as Drone;

        if (drone.state !== DroneStateEnum.IDLE) throw new BadRequest('Drone is not in IDLE state for loading');

        const totalWeightToLoad = medications.reduce((total, med) => total + med.weight, 0);

        if (totalWeightToLoad > drone.weightLimit) throw new BadRequest('Total weight exceeds the drone limit');

        if (drone.batteryCapacity < 25) throw new BadRequest('Drone battery level is below 25%');

        const loadedMedications = medications.map((medicationData) => {
            const medication: Medication = {
                id: medicationData.id,
                image: medicationData.image,
                code: medicationData.code,
                name: medicationData.name,
                weight: medicationData.weight,
                drone
            }
            return medication
        })

        await this.medicationUsecases.addMedications(loadedMedications);

        drone.state = DroneStateEnum.LOADED;
        await this.droneRepository.save(drone);

    }

    async findAvailableDrones() {
        return this.droneRepository.find({
            state: DroneStateEnum.IDLE
        })
    }
    async findDroneById(droneId: number) {
        return await this.droneRepository.findOne({ id: droneId }, { relations: ['medications'] })
    }
}

export default DroneUsecases;

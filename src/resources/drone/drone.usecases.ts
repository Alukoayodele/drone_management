import { Drone, DroneRepository, Fleet, Medication } from '@dm/dal';
import { DroneModelEnum, DroneStateEnum } from '@dm/dal/repositories/drone/type';
import { CreateDroneCommand } from './types';
import FleetUsecases from './fleet.usecases';
import { BadRequest, NotFoundError } from '@exceptions';
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
        const droneMedication: Medication[] = []

        const loadedMedications = medications.map((medicationData) => {
            const medication: MedicationInput = {
                image: medicationData.image,
                code: medicationData.code,
                name: medicationData.name,
                weight: medicationData.weight,
            }
            return medication
        })

        const medicationData = await this.medicationUsecases.addMedications(loadedMedications, drone);

        for (const id of medicationData) {
            const newDroneMedication = await this.medicationUsecases.findMedication(id);
            droneMedication.push(newDroneMedication!);
        }
        if (droneMedication.length > 0) {
            drone.medications = [...droneMedication]
        }
        drone.state = DroneStateEnum.LOADED;
        await this.droneRepository.save(drone);

    }

    async findAvailableDrones() {
        return this.droneRepository.find({
            state: DroneStateEnum.IDLE
        })
    }
    async findDroneById(droneId: number) {
        const drone = await this.droneRepository.findOne({ id: droneId }, { relations: ['medications'] })
        if (!drone) throw new NotFoundError(`Drone with id: ${droneId} does not exist`)
        return drone
    }

    async findDroneLoadedDrone(droneId: number) {
        const drone = await this.droneRepository.findOne({ id: droneId, state: DroneStateEnum.LOADED }, { relations: ['medications'] })
        if (!drone) throw new NotFoundError(`Drone with id: ${droneId} does not exist`)
        return drone
    }

    async registerDroneIfNotExist() {
        const checkDrones = await this.droneRepository.find({});
        const checkFleet = await this.fleetUsecases.findFleet()
        if (checkDrones.length >= 1 && checkFleet.length >= 1) {
            return;
        }
        const newDrone = {
            serialNumber: "22344hdksyr",
            model: DroneModelEnum.HEAVYWEIGHT,
            weightLimit: 500,
            batteryCapacity: 100,
            fleetId: 1
        }

        const registerDrone = await this.registerDrone(newDrone)
        const newMedication = [
            {
                weight: 50,
                code: "HB-45887",
                image: "yudoossjfhfh",
                name: "Polo Vaccine"
            },
            {
                weight: 450,
                code: "HB-45889",
                image: "yudoossjfhfh",
                name: "Covid Vaccine"
            }
        ]
        await this.loadDrone(registerDrone.id, newMedication)
    }
}

export default DroneUsecases;

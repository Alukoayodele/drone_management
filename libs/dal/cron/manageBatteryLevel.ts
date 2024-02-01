import { Not } from "typeorm";
import { Drone, DroneBatteryRepository, DroneRepository } from "../repositories";
import { DroneStateEnum } from "../repositories/drone/type";

const manageBatteryLevel = async () => {
    try {
        let droneRepository = new DroneRepository();
        const drones = await droneRepository.find({ state: Not(DroneStateEnum.IDLE) })


        for (const drone of drones) {
            const workingDrone = new Drone();
            workingDrone.batteryCapacity = drone.batteryCapacity - 5

            await droneRepository.update({ id: drone.id }, { batteryCapacity: workingDrone.batteryCapacity })
        }

        console.log('Drone Battery level reduced by 5%.');
    } catch (error) {
        console.error('Error while reducing battery level:', error);
    }
}

export default manageBatteryLevel;
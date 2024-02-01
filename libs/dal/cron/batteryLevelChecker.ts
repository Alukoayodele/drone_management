import * as cron from 'node-cron';
import { Not } from 'typeorm';
import { BatteryLog, DroneBatteryRepository, DroneRepository } from "../repositories";
import { DroneStateEnum } from '../repositories/drone/type';


const batteryLevelChecker = async () => {
    try {
        let droneRepository = new DroneRepository();
        let batteryLevelRepository = new DroneBatteryRepository()
        const drones = await droneRepository.find({ state: Not(DroneStateEnum.IDLE) })

        for (const drone of drones) {
            const batteryLog = new BatteryLog()
            batteryLog.batteryLevel = drone.batteryCapacity;
            batteryLog.drone = drone;
            batteryLog.timestamp = new Date();
            await batteryLevelRepository.save(batteryLog)
        }
        console.log('Battery levels checked and logged.');

    } catch (error) {
        console.error('Error checking battery levels:', error);
    }
}


export default batteryLevelChecker;
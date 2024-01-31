import { DroneModelEnum } from "@dm/dal/repositories/drone/type";

export interface CreateDroneCommand {
    serialNumber: string;
    model: DroneModelEnum;
    weightLimit: number;
    batteryCapacity: number;
    fleetId: number;
}

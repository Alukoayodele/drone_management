export interface CreateDroneCommand {
    serialNumber: string;
    model: string;
    weightLimit: number;
    batteryCapacity: number;
    fleetId: number;
}
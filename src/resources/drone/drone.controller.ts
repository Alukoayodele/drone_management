import BaseCommand from '@resources/base.command';
import { NextFunction, Request, Response } from 'express';
import { createDroneSchema, loadDroneSchema } from './validation.schema';
import DroneUsecases from './drone.usecases';
import { Drone } from '@dm/dal';

class DroneController {
    private droneUsecases;
    private createDroneCommand;
    private loadDroneCommand;

    constructor() {
        this.droneUsecases = new DroneUsecases()
        this.createDroneCommand = new BaseCommand(createDroneSchema);
        this.loadDroneCommand = new BaseCommand(loadDroneSchema);
    }

    async view(req: Request, res: Response, next: NextFunction) {
        try {
            const droneId = parseInt(req.params.droneId, 10);
            const drone = (await this.droneUsecases.findDroneById(droneId)) as Drone;

            res.status(200).json({
                status: 'success',
                message: "Drone's details fetched successfully",
                data: drone
            })

        } catch (error) {
            console.log(error)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const command = this.createDroneCommand.execute(req.body);

            const drone = await this.droneUsecases.registerDrone(command);

            res.status(201).json({
                status: 'success',
                message: 'Drone added to the fleet successfully',
                data: drone
            })
        } catch (error) {
            next(error);
        }
    }

    async load(req: Request, res: Response, next: NextFunction) {
        try {
            const command = this.loadDroneCommand.execute(req.body);

            const { droneId, medications } = command;

            await this.droneUsecases.loadDrone(droneId, medications);

            res.status(200).json({
                status: 'success',
                message: 'Medications loaded successfully'
            })
        } catch (error) {
            next(error)
        }

    }

    async loadedMedications(req: Request, res: Response, next: NextFunction) {
        try {
            const droneId = parseInt(req.params.droneId, 10);
            const { medications } = await this.droneUsecases.findDroneLoadedDrone(droneId);

            res.status(200).json({
                status: 'success',
                message: "Drone's loaded Medication fetched successfully",
                data: medications
            })
        } catch (error) {
            next(error)
        }
    }

    async availableDrones(req: Request, res: Response, next: NextFunction) {
        try {
            const availableDrones = await this.droneUsecases.findAvailableDrones();

            res.status(200).json({
                status: 'success',
                message: 'Available Drones fetched successfully',
                data: availableDrones
            })
        } catch (error) {
            next(error)
        }
    }

    async batteryLevel(req: Request, res: Response, next: NextFunction) {
        try {
            const droneId = parseInt(req.params.droneId, 10);
            const { batteryCapacity, serialNumber } = (await this.droneUsecases.findDroneById(droneId)) as Drone;

            res.status(200).json({
                status: 'success',
                message: "Drone's battery capacity fetched successfully",
                data: {
                    batteryLevel: `${serialNumber} is currently at ${batteryCapacity}%`,
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new DroneController()
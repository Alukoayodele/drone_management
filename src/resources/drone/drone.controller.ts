import BaseCommand from '@resources/base.command';
import { NextFunction, Request, Response } from 'express';
import { createDroneSchema } from './validation.schema';
import DroneUsecases from './drone.usecases';

class DroneController {
    private droneUsecases;
    private createDroneCommand;

    constructor() {
        this.droneUsecases = new DroneUsecases()
        this.createDroneCommand = new BaseCommand(createDroneSchema);
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
}

export default new DroneController()
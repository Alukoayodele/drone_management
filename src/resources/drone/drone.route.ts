import { Router, Response, Request } from 'express';
import droneController from './drone.controller';

const droneRoutes = Router();


droneRoutes.post('/drones', (req: Request, res: Response, next) => {
    droneController.register(req, res, next)
})

droneRoutes.post('/drones/load', (req: Request, res: Response, next) => {
    droneController.load(req, res, next)
})

droneRoutes.get('/drones/medication/:droneId', (req: Request, res: Response, next) => {
    droneController.loadedMedications(req, res, next)
})

droneRoutes.get('/drones/availableDrones', (req: Request, res: Response, next) => {
    droneController.availableDrones(req, res, next)
})

droneRoutes.get('/drones/batteryLevel/:droneId', (req: Request, res: Response, next) => {
    droneController.batteryLevel(req, res, next)
})

export default droneRoutes;
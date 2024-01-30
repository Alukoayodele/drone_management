import { Router, Response, Request } from 'express';
import droneController from './drone.controller';

const droneRoutes = Router();


droneRoutes.post('drones', (req: Request, res: Response, next) => {
    droneController.register(req, res, next)
})

export default droneRoutes;
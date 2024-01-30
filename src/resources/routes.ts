import { Express } from 'express';
import droneRoutes from './drone/drone.route';

const routes = (app: Express) => {
    app.get('/', (_req, res) => {
        res.status(200).json({ message: 'Welcome to Our Drone Management System' })
    });

    app.use('api/v1', [
        droneRoutes
    ]);

    app.all('*', (_req, res) => {
        res
            .status(200)
            .json({ message: 'This route is unavailable on this server' });
    });
}

export default routes;
import { AppDataSource } from '@dm/dal/datasource';
import DroneUsecases from '@resources/drone/drone.usecases';
import FleetUsecases from '@resources/drone/fleet.usecases';

const initializeDb = async () => {
    try {
        await AppDataSource.initialize()
        await new FleetUsecases().createFleetIfNotExists()
        await new DroneUsecases().registerDroneIfNotExist()
        console.log('Connected to the Database successfully')
    } catch (error) {
        console.log(error)
    }
};

export default initializeDb;

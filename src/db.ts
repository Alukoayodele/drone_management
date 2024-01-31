import { AppDataSource } from '@dm/dal/datasource';
import FleetUsecases from '@resources/drone/fleet.usecases';

const initializeDb = async () => {
    try {
        await AppDataSource.initialize()
        await new FleetUsecases().createFleetIfNotExists()
        console.log('Connected to the Database successfully')
    } catch (error) {
        console.log(error)
    }
};

export default initializeDb;

import { DataSource } from 'typeorm';
import { AppDataSource } from './datasource';

export class DalService {
    public static dataSource: DataSource;

    constructor(dataSource: DataSource = AppDataSource) {
        DalService.dataSource = dataSource;
    }

    // eslint-disable-next-line class-methods-use-this
    async connect() {
        try {
            await DalService.dataSource.initialize();
        } catch (error) {
            console.error('Unable to connect to database', error);
        }
    }

    async disconnect() {
        try {
            await DalService.dataSource.destroy();
        } catch (error) {
            console.error('Unable to disconnect database', error);
        }
    }
}
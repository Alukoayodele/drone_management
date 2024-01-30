import { DalService } from '../libs/dal/dal.service'

const initializeDb = async () => {
    const dalService = new DalService();
    await dalService.connect();
};

initializeDb();

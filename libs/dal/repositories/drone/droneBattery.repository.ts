import BaseRepository from '../base.repository';
import { BatteryLog } from './droneBattery.schema';

export class DroneBatteryRepository extends BaseRepository<BatteryLog> {
    constructor() {
        super(BatteryLog);
    }
}

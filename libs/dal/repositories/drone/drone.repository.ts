import { Drone } from './drone.schema';
import BaseRepository from '../base.repository';

export class DroneRepository extends BaseRepository<Drone> {
    constructor() {
        super(Drone);
    }
}

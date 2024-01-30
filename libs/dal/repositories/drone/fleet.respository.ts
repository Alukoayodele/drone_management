import { Fleet } from './fleet.schema';
import BaseRepository from '../base.repository';

export class FleetRepository extends BaseRepository<Fleet> {
    constructor() {
        super(Fleet);
    }
}

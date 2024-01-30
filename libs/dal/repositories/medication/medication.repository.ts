import { Medication } from './medication.schema';
import BaseRepository from '../base.repository';

export class MedicationRepository extends BaseRepository<Medication> {
    constructor() {
        super(Medication);
    }
}

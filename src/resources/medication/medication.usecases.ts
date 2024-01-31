import { Medication, MedicationRepository } from "@dm/dal";



class MedicationUsecases {
    private medicationRepository;

    constructor() {
        this.medicationRepository = new MedicationRepository()
    }

    async addMedications(medications: Medication[]) {
        for (const medication of medications) {
            await this.medicationRepository.save(medication);
        }
    }
}

export default MedicationUsecases;
import { Drone, Medication, MedicationRepository } from "@dm/dal";
import { MedicationInput } from "./type";



class MedicationUsecases {
    private medicationRepository;

    constructor() {
        this.medicationRepository = new MedicationRepository()
    }

    async addMedications(medications: MedicationInput[], drone: Drone) {
        const medicationData = []
        for (const medication of medications) {
            const newMedication = new Medication()
            newMedication.code = medication.code;
            newMedication.drone = { ...drone };
            newMedication.image = medication.image;
            newMedication.weight = medication.weight;
            newMedication.name = medication.name;
            const { id } = await this.medicationRepository.save(newMedication);
            medicationData.push(id)
        }
        return medicationData;
    }

    async findMedication(id: number) {
        try {

            return this.medicationRepository.findOne({ id })
        } catch (error) {
            console.log(error)
        }
    }
}

export default MedicationUsecases;
import { Drone } from "@dm/dal";

export interface MedicationInput {
    image: string;
    weight: number;
    code: string;
    name: string;
    drone?: Drone
}

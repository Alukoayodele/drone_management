import { ObjectSchema, mixed, number, object, string } from 'yup';
import { CreateDroneCommand } from './types'

export const createDroneSchema: ObjectSchema<CreateDroneCommand> = object({
    serialNumber: string().length(100).required(),
    model: string().required(),
    weightLimit: number().positive().required(),
    batteryCapacity: number().positive().max(100).required(),
    fleetId: number().required()
})
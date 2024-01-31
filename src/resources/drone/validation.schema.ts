import { ObjectSchema, array, mixed, number, object, string } from 'yup';
import { CreateDroneCommand } from './types'
import { DroneModelEnum } from '@dm/dal/repositories/drone/type';

export const createDroneSchema: ObjectSchema<CreateDroneCommand> = object({
    serialNumber: string().max(100).required(),
    model: mixed<DroneModelEnum>().oneOf(Object.values(DroneModelEnum)).required(),
    weightLimit: number().positive().max(500).required(),
    batteryCapacity: number().positive().max(100).required(),
    fleetId: number().required()
})

export const loadDroneSchema = object({
    droneId: number().required(),
    medications: array().of(object().shape({
        name: string().required(),
        weight: number().required(),
        code: string().required(),
        image: string().required(),
        id: number().required(),
    }))
})
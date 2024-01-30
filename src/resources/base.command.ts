import { BadRequest } from '@exceptions';
import { ObjectSchema, ValidationError } from 'yup';

class BaseCommand<T extends Record<keyof T, unknown>> {
    private schema: ObjectSchema<Partial<T>>;

    constructor(resourceSchema: ObjectSchema<Partial<T>>) {
        this.schema = resourceSchema;
    }

    execute(payload: T) {
        try {
            this.validatePayload(payload);
            this.removeEmptyValues(payload);
        } catch (error) {
            throw new BadRequest((error as ValidationError).errors);
        }

        return payload;
    }

    private validatePayload(payload: T) {
        this.schema.validateSync(payload, { abortEarly: false });
    }

    private removeEmptyValues(payload: T) {
        Object.keys(payload).forEach((payloadName) => {
            const payloadNew = payload;
            const value = payloadNew[payloadName as keyof T];

            if (value === '') {
                delete payloadNew[payloadName as keyof T];
            }
        });
    }
}

export default BaseCommand;

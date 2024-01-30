import { DeepPartial, EntityTarget, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../datasource';

class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(target: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(target);
    }

    async save(payload: T) {
        return this.repository.save(payload);
    }

    async findOne(
        criteria: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
        options?: Omit<FindOneOptions<T>, 'where'>
    ) {
        return this.repository.findOne({
            where: criteria,
            ...options,
        });
    }

    async find(
        criteria: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
        options?: Omit<FindManyOptions<T>, 'where'>
    ) {
        return this.repository.find({ where: criteria, ...options });
    }

    async update(criteria: FindOptionsWhere<T>, payload: DeepPartial<T>) {
        await this.repository.update(criteria, payload);
    }
}

export default BaseRepository;

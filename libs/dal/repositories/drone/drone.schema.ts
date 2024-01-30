import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fleet } from './fleet.schema';
import { DroneStateEnum } from './type';

@Entity('drone')
export class Drone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    serialNumber: string;

    @Column()
    model: string;

    @Column()
    weightLimit: number;

    @Column()
    batteryCapacity: number;

    @Column({
        type: 'enum',
        enum: DroneStateEnum,
        default: DroneStateEnum.IDLE
    })
    state: DroneStateEnum;

    @ManyToOne(() => Fleet, fleet => fleet.drones)
    fleet: Fleet;

}

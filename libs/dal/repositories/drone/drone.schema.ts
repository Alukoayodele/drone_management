import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Fleet } from './fleet.schema';
import { DroneModelEnum, DroneStateEnum } from './type';
import { Medication } from '../medication';
import { BatteryLog } from './droneBattery.schema';

@Entity('drone')
export class Drone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    serialNumber: string;

    @Column({
        type: 'enum',
        enum: DroneModelEnum
    })
    model: DroneModelEnum;

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

    @ManyToOne(() => Fleet, (fleet) => fleet.drones)
    fleet: Fleet;

    @OneToMany(() => Medication, (medications) => medications.drone)
    medications: Medication[];

    @OneToMany(() => BatteryLog, batteryLogs => batteryLogs.drone)
    batteryLogs: BatteryLog[];

}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Drone } from "./drone.schema";


@Entity('droneBatteryLogs')
export class BatteryLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Drone, drone => drone.batteryLogs)
    drone: Drone;

    @Column()
    batteryLevel: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}

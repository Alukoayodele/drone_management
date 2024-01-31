import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Drone } from '../drone';

@Entity('medication')
export class Medication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'float' })
    weight: number;

    @Column({ type: 'varchar', length: 10 })
    code: string;

    @Column({ type: 'varchar', length: 255 })
    image: string;

    @ManyToOne(() => Drone, drone => drone.medications)
    drone: Drone;
}


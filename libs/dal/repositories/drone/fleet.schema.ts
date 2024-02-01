import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Drone } from './drone.schema';

@Entity('fleet')
export class Fleet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @OneToMany(() => Drone, drones => drones.fleet)
    drones: Drone[];
}

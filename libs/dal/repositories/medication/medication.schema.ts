// src/models/Medication.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('medication')
export class Medication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    weight: number;

    @Column()
    code: string;

    @Column()
    image: string;
}

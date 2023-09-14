import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: 'STUDENT_ROLE', unique: true })
    role!: string;
}
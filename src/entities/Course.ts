import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import Professor from "./Professor";

@Entity('courses')
export default class Course{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    period: string

    @ManyToMany(()=>Professor, professor => professor.courses)
    @JoinTable()
    professors: Professor[]
}
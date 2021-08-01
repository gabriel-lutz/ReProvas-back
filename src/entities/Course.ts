import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Exam from "./Exam";
import Period from "./Period";
import Professor from "./Professor";

@Entity('courses')
export default class Course{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(()=>Period)
    @JoinColumn()
    period: Period

    @ManyToMany(()=>Professor, professor => professor.courses)
    @JoinTable()
    professors: Professor[]

    @OneToMany(()=>Exam, exam => exam.course)
    exams: Exam[]
}
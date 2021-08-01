import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, OneToMany } from "typeorm";
import Course from "./Course";
import Exam from "./Exam";

@Entity('professors')
export default class Professor{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(()=>Course, course => course.professors)
    courses: Course

    @OneToMany(()=>Exam, exam=>exam.professor)
    exams: Exam[]

}
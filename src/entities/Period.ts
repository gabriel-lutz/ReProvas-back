import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Course from "./Course";

@Entity('period')
export default class Period{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(()=>Course, course=> course.period)
    courses: Course[]
}
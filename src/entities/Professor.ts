import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany } from "typeorm";
import Course from "./Course";

@Entity('professors')
export default class Professor{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(()=>Course, course => course.professors)
    courses: Course

}
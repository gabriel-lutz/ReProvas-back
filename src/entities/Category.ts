import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany } from "typeorm";
import Exam from "./Exam";

@Entity('categories')
export default class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(()=>Exam, exam=>exam.category)
    exams: Exam[]
}
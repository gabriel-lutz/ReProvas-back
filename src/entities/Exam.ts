import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import Category from "./Category";
import Course from "./Course";
import Professor from "./Professor";


@Entity('exams')
export default class Exam{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    pdfLink: string

    @ManyToOne(()=>Category)
    @JoinColumn()
    category: Category
    
    @ManyToOne(()=>Course)
    @JoinColumn()
    course: Course
    
    @ManyToOne(()=> Professor)
    @JoinColumn()
    professor: Professor
}
import { getRepository } from "typeorm"
import {examInterface} from "../controllers/examsController"
import Category from "../entities/Category"
import Course from "../entities/Course"
import Exam from "../entities/Exam"
import Professor from "../entities/Professor"

export async function registerService(newExam: examInterface){
    try{
    
    console.log(newExam)
    const category = await getRepository(Category).findOne({id: newExam.categoryId})
    const course = await getRepository(Course).findOne({id: newExam.courseId})
    const professor = await getRepository(Professor).findOne({id: newExam.professorId})
    const exam = getRepository(Exam).create(newExam)
    exam.category = category
    exam.course = course
    exam.professor = professor

    console.log(exam)
    const result = await getRepository(Exam).save(exam)

    console.log(result)
    return result
    }catch(err){
        console.log(err)
    }
}
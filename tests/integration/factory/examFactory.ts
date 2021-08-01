import { getRepository } from "typeorm"
import Category from "../../../src/entities/Category"
import Course from "../../../src/entities/Course"
import Exam from "../../../src/entities/Exam"
import Professor from "../../../src/entities/Professor"


export async function createExam(){
    const newExam={
        name: "Prova de Teste",
        pdfLink: "http://www.teste.com/teste.pdf",
        categoryId: 1,
        courseId: 1,
        professorId: 1
      }

    const category = await getRepository(Category).findOne({id: newExam.categoryId})
    const course = await getRepository(Course).findOne({id: newExam.courseId})
    const professor = await getRepository(Professor).findOne({id: newExam.professorId})
    const exam = getRepository(Exam).create(newExam)
    exam.category = category
    exam.course = course
    exam.professor = professor

    const result = await getRepository(Exam).save(exam)
}
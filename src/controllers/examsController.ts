import {Request, Response} from "express"
import { checkIfEntityExistsService, filteredExamsListService, registerService } from "../services/examsService"
import { examSchema } from "../schemas"
import { createQueryBuilder, getRepository } from "typeorm"
import Professor from "../entities/Professor"
import Course from "../entities/Course"
import Category from "../entities/Category"
import Period from "../entities/Period"

export interface examInterface{
    name: string,
    pdfLink: string,
    categoryId: number,
    courseId: number,
    professorId: number
}

export async function examsController(req: Request, res: Response){
    try{
        const newExam: examInterface = req.body
        if(examSchema.validate(newExam).error){
            return res.sendStatus(400)
        }
        const professorExists = await checkIfEntityExistsService(Professor, newExam.professorId)
        if(!professorExists){
            return res.status(404).send("Código de professor inválido")
        }

        const courseExists = await checkIfEntityExistsService(Course, newExam.courseId)
        if(!courseExists){
            return res.status(404).send("Código de disciplina inválido")
        }
        
        const categoryExists = await checkIfEntityExistsService(Category, newExam.categoryId)
        if(!categoryExists){
            return res.status(404).send("Código de categoria inválido")
        }
        
        await registerService(newExam)

        res.sendStatus(201)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function categoriesController(req:Request,res:Response){
    try{
        const result = await getRepository(Category).find()
        res.send(result)
      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }
}

export async function coursesController(req:Request,res:Response){
    try{
        const result = await getRepository(Course).find({relations: ["professors"]})
        res.send(result)
      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }
}

export async function examsListByCategoriesController(req: Request, res:Response){
    try{
        const id: number = Number(req.params.id)
        
        if(id < 1 || isNaN(id)){
            return res.sendStatus(400)
        }

        const professorExists = await checkIfEntityExistsService(Professor, id)
        if(!professorExists){
            return res.status(404).send("Código de professor inválido")
        }
     
        const result  = await filteredExamsListService("professor", id)
        res.send(result)
      }catch(err){
        res.sendStatus(500)
        console.log(err)
      }
}

export async function examsListByProfessor(req: Request, res: Response){
    try{
        const result = await getRepository(Professor).find({relations: ["exams"]})
        res.send(result)
      }catch(err){
        res.sendStatus(500)
        console.log(err)
      }
}

export async function examsListByPeriodsController(req:Request, res:Response){
    try{
        const result = await getRepository(Period).find({relations: ["courses", "courses.exams", "courses.exams.professor"], order:{id:"ASC"}})
        res.send(result)
      }catch(err){
        res.sendStatus(500)
        console.log(err)
      }
}

export async function examsListByCourseController(req:Request, res:Response){
    try{
        const id: number = Number(req.params.id)
        
        if(id < 1 || isNaN(id)){
            return res.sendStatus(400)
        }

        const courseExists = await checkIfEntityExistsService(Course, id)
        if(!courseExists){
            return res.status(404).send("Código de disciplina inválido")
        }
    
        const result  = await filteredExamsListService("course", id)
        res.send(result)
      }catch(err){
        res.sendStatus(500)
        console.log(err)
      }
}
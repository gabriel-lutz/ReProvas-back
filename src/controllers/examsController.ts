import {Request, Response} from "express"
import { registerService } from "../services/examsService"
import { examSchema } from "../schemas"
import { createQueryBuilder, getRepository } from "typeorm"
import Professor from "../entities/Professor"
import Course from "../entities/Course"
import Category from "../entities/Category"

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

        const professorsList = await getRepository(Professor).find({where: {id: newExam.professorId}})
        if(!professorsList.length){
            return res.status(404).send("Código de professor inválido")
        }

        const coursesList = await getRepository(Course).find({where: {id: newExam.courseId}})
        if(!coursesList.length){
            return res.status(404).send("Código de curso inválido")
        }
        
        const categoriesList = await getRepository(Category).find({where: {id: newExam.categoryId}})
        if(!categoriesList.length){
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

        const professorsList = await getRepository(Professor).find({where: {id: id}})
        if(!professorsList.length){
            return res.status(404).send("Código de professor inválido")
        }
     
        const result  = await createQueryBuilder("Category")
                                .innerJoinAndSelect("Category.exams", "exams")
                                .innerJoinAndSelect("exams.professor", "professor")
                                .innerJoinAndSelect("exams.course", "course")
                                .where("professor.id = :pid", {pid:id})
                                .getMany()
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
import {Request, Response} from "express"
import { registerService } from "../services/examsService"
import { examSchema } from "../schemas"
import { join } from "path/posix"
import { getRepository } from "typeorm"
import Professor from "../entities/Professor"
import Course from "../entities/Course"
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
        const professorsList = await await getRepository(Professor).find()
        const coursesList = await getRepository(Course).find()
        console.log(professorsList)
        if(examSchema.validate(newExam).error){
            return res.sendStatus(400)
        }
        
        const created = registerService(newExam)
        res.sendStatus(201)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
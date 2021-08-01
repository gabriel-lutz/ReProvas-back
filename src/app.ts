import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import {categoriesController, 
        coursesController, 
        examsController, 
        examsListByCategoriesController, 
        examsListByCourseController, 
        examsListByPeriodsController, 
        examsListByProfessor} from "./controllers/examsController"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/exams/periods", examsListByPeriodsController)
app.get("/exams/courses/:id", examsListByCourseController)
app.get("/exams/professors", examsListByProfessor)
app.get("/exams/professors/:id", examsListByCategoriesController)
app.get("/courses", coursesController);
app.get("/categories", categoriesController);
app.post("/exams", examsController)

export default app;

export async function init () {
  await connectDatabase();
}
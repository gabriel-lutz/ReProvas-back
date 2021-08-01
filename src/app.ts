import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import { createQueryBuilder, getRepository } from "typeorm";
import {categoriesController, coursesController, examsController, examsListByCategoriesController, examsListByProfessor} from "./controllers/examsController"
import Professor from "./entities/Professor";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/exams/professors", examsListByProfessor)
app.get("/exams/professors/:id", examsListByCategoriesController)
app.get("/courses", coursesController);
app.get("/categories", categoriesController);
app.post("/exams", examsController)

export default app;

export async function init () {
  await connectDatabase();
}
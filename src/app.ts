import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import { getConnection, getRepository } from "typeorm";
import {examsController} from "./controllers/examsController"
import Exam from "./entities/Exam";
import Course from "./entities/Course";
import Professor from "./entities/Professor";
import Category from "./entities/Category";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/courses", async (req, res) => {
  try{
    const result = await getRepository(Course).find({relations: ["professors"]})
    res.send(result)
  }catch(err){
    console.log(err)
    res.sendStatus(500)
  }
});

app.get("/categories", async (req, res) => {
  try{
    const result = await getRepository(Category).find()
    res.send(result)
  }catch(err){
    console.log(err)
    res.sendStatus(500)
  }
});

app.post("/exams", examsController)

export default app;

export async function init () {
  await connectDatabase();
}
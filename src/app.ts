import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";
import { getRepository } from "typeorm";
import {examsController} from "./controllers/examsController"
import Exam from "./entities/Exam";
import Course from "./entities/Course";
import Professor from "./entities/Professor";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  try{
    console.log("funcionou")
    res.send(200)
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
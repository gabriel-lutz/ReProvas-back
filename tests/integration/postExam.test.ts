import supertest from "supertest";
import "../../src/setup"
import { getConnection, getRepository } from "typeorm";
import app, { init } from "../../src/app";
import Exam from "../../src/entities/Exam";

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /exams", () => {
    const newExam={
      name: "Prova de Teste",
      pdfLink: "http://www.teste.com/teste.pdf",
      categoryId: 1,
      courseId: 1,
      professorId: 1
    }
  
    it("should answer with status 201 when sending a valid object", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send(newExam);
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(201);
      expect(before.length).toBeLessThan(after.length)
    });
  
    it("should answer with status 404 when sending a category id that does not exists", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, categoryId: 1000});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(404);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 404 when sending a course id that does not exists", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, courseId: 1000});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(404);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 404 when sending a professor id that does not exists", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, professorId: 1000});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(404);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 400 when sending a invalid file name", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, name: ""});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(400);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 400 when sending a invalid pdf link", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, pdfLink: "http://notAValidLink"});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(400);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 400 when sending a var type that is not a number for category id", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, categoryId: "test"});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(400);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 400 when sending a var type that is not a number for course id", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, courseId: "test"});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(400);
      expect(before.length).toEqual(after.length)
    });
  
    it("should answer with status 400 when sending a var type that is not a number for professor id", async () => {
      const before = await getRepository(Exam).find()
      const response = await supertest(app).post("/exams").send({...newExam, professorId: "test"});
      const after = await getRepository(Exam).find()
      expect(response.status).toBe(400);
      expect(before.length).toEqual(after.length)
    });
  });
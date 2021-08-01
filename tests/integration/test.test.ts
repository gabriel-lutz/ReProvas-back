import supertest from "supertest";
import "../../src/setup"
import { Any, getConnection, getRepository } from "typeorm";
import app, { init } from "../../src/app";
import Exam from "../../src/entities/Exam";
import { any, array } from "joi";

console.log(process.env.DATABASE_URL)

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


describe("GET /categories", () => {
  it("should answer with and array of 5 categories (P1,P2,P3,2ch,Outras)", async () => {
    const response = await supertest(app).get("/categories");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String)
        })
      ])
    )
  });
});

describe("GET /courses", () => {
  it("should answer with and array of courses and its array of professors", async () => {
    const response = await supertest(app).get("/courses");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number), 
          name: expect.any(String),
          period: expect.any(String),
          professors: expect.any(Array) 
        })
      ])
    )
  });
});


describe("GET /exams/professors/:id", () => {
  it("should answer with and array of categories and its array of exams that are apllied by a specific professor", async () => {
    const response = await supertest(app).get("/exams/professors/1");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number), 
          name: expect.any(String),
          exams: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              pdfLink: expect.any(String),
              professor:expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
              }),
              course: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                period: expect.any(String)
              })
            })
          ])
        })
      ])
    )
  });

  it("should answer with status code 404 when sending a id that is not related to a professor", async () => {
    const response = await supertest(app).get("/exams/professors/1000");
    expect(response.status).toBe(404)
  });

  it("should answer with status code 400 when sending a id that is 0", async () => {
    const response = await supertest(app).get("/exams/professors/0");
    expect(response.status).toBe(400)
  });

  it("should answer with status code 400 when sending a id that is negative", async () => {
    const response = await supertest(app).get("/exams/professors/-1");
    expect(response.status).toBe(400)
  });

  it("should answer with status code 400 when sending a id that is not a number", async () => {
    const response = await supertest(app).get("/exams/professors/test");
    expect(response.status).toBe(400)
  });

});

describe("GET /exams/professors", () => {
  it("should answer with and array of professors and exams", async () => {
    const response = await supertest(app).get("/exams/professors");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          exams: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              pdfLink: expect.any(String),
              course: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                period: expect.any(String)
              })
            })
          ])
        })
      ])
    )
  });

  
});

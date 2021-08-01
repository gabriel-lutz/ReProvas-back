import supertest from "supertest";
import "../../src/setup"
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { createExam } from "./factory/examFactory";
import { clearDatabase } from "./utils/database";

beforeAll(async () => {
  await init();
  await createExam()
});

afterAll(async () => {
  await clearDatabase()
  await getConnection().close();
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
                  name: expect.any(String)
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
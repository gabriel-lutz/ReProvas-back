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

describe("GET /exams/periods", () => {
    it("should answer with and array of courses and exams by periods", async () => {
      const response = await supertest(app).get("/exams/periods");
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            courses: expect.any(Array)
          })
        ])
      )
    });
  });
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

describe("GET /courses", () => {
    it("should answer with and array of courses and its array of professors", async () => {
      const response = await supertest(app).get("/courses");
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number), 
            name: expect.any(String),
            professors: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
              })
            ]) 
          })
        ])
      )
    });
  });
import {MigrationInterface, QueryRunner} from "typeorm";

export class periodTable1627781524574 implements MigrationInterface {
    name = 'periodTable1627781524574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."courses" RENAME COLUMN "period" TO "periodId"`);
        await queryRunner.query(`CREATE TABLE "period" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cabecec858892ab647cd28673b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."courses" DROP COLUMN "periodId"`);
        await queryRunner.query(`ALTER TABLE "public"."courses" ADD "periodId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."courses" ADD CONSTRAINT "FK_70dccaa3b56eb011ca55f6d71a1" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."courses" DROP CONSTRAINT "FK_70dccaa3b56eb011ca55f6d71a1"`);
        await queryRunner.query(`ALTER TABLE "public"."courses" DROP COLUMN "periodId"`);
        await queryRunner.query(`ALTER TABLE "public"."courses" ADD "periodId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "period"`);
        await queryRunner.query(`ALTER TABLE "public"."courses" RENAME COLUMN "periodId" TO "period"`);
        await queryRunner.query(`INSERT INTO period (name) VALUES ('1° semestre'), ('2° semestre'), ('3° semestre'), ('4° semestre'), ('5° semestre'), ('6° semestre'), ('7° semestre'), ('8° semestre'), ('Eletivas')`);
        await queryRunner.query(`INSERT INTO professors (name) Values ('Walter White'), ('Joaozinho Matemágico'), ('Clarice Lispector'), ('Bob McBobface'), ('Dave Daveson'), ('Max Still'), ('Saru Mann')`);
        await queryRunner.query(`INSERT INTO courses (name, "periodId") VALUES ('Quimica 1', 1), ('Calculo 2', 2), ('Literatura para Leigos 3', 9), ('Quimica 2',2), ('Quimica 3', 3), ('Calculo 1', 1), ('Fisica 1', 4), ('Fisica 2', 5), ('Literatura 1', 6), ('Literatura 2',7),('Literatura 3',8), ('Literatura para leigos 2', 9)`);
        await queryRunner.query(`INSERT INTO "courses_professors_professors" ("coursesId", "professorsId") VALUES (1,1), (1,2), (1,3), (2,1), (2,2), (3,3),(11,2), (10,3), (12,3), (12,1), (12,6),(11,1), (10,2), (9,7), (7,7), (6,3),(5,2), (1,6), (1,5), (2,5), (4,4),(9,1), (8,5), (3,6), (3,1), (5,3),(5,1), (7,2), (7,3), (8,1), (12,2)`);
        await queryRunner.query(`INSERT INTO categories (name) VALUES ('P1'), ('P2'), ('P3'), ('2ch'), ('Outras')`);
    } 
}

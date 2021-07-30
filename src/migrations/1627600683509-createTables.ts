import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1627600683509 implements MigrationInterface {
    name = 'createTables1627600683509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6b249c6363a154820c909c45e27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "period" character varying NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pdfLink" character varying NOT NULL, "categoryId" integer, "courseId" integer, "professorId" integer, CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses_professors_professors" ("coursesId" integer NOT NULL, "professorsId" integer NOT NULL, CONSTRAINT "PK_c154f90f7865c02f2822c813473" PRIMARY KEY ("coursesId", "professorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_293d77c3ddfd0a031c5d70e742" ON "courses_professors_professors" ("coursesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_306dd156b27c9958605f130fbe" ON "courses_professors_professors" ("professorsId") `);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_bcfdfcbfb5fe82b98eb79ac5818" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_professors_professors" ADD CONSTRAINT "FK_293d77c3ddfd0a031c5d70e7425" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "courses_professors_professors" ADD CONSTRAINT "FK_306dd156b27c9958605f130fbee" FOREIGN KEY ("professorsId") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses_professors_professors" DROP CONSTRAINT "FK_306dd156b27c9958605f130fbee"`);
        await queryRunner.query(`ALTER TABLE "courses_professors_professors" DROP CONSTRAINT "FK_293d77c3ddfd0a031c5d70e7425"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_bcfdfcbfb5fe82b98eb79ac5818"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_3dcd9199b8cd801383e623c3d11"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_a4b572eed2e7293985b93a55eb3"`);
        await queryRunner.query(`DROP INDEX "IDX_306dd156b27c9958605f130fbe"`);
        await queryRunner.query(`DROP INDEX "IDX_293d77c3ddfd0a031c5d70e742"`);
        await queryRunner.query(`DROP TABLE "courses_professors_professors"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "professors"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}

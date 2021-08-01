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
    }

}

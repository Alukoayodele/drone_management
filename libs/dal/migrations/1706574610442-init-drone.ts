import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDrone1706574610442 implements MigrationInterface {
    name = 'InitDrone1706574610442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fleet" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_17e0760d2492f67c67ce0fe4aa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."drone_state_enum" AS ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')`);
        await queryRunner.query(`CREATE TABLE "drone" ("id" SERIAL NOT NULL, "serialNumber" character varying(100) NOT NULL, "model" character varying NOT NULL, "weightLimit" integer NOT NULL, "batteryCapacity" integer NOT NULL, "state" "public"."drone_state_enum" NOT NULL DEFAULT 'IDLE', "fleetId" integer, CONSTRAINT "PK_2ac525cb1c63c95423e754dd41f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medication" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "weight" integer NOT NULL, "code" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_0682f5b7379fea3c2fdb77d6545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drone" ADD CONSTRAINT "FK_55219ad4d70df0c0a58e62be040" FOREIGN KEY ("fleetId") REFERENCES "fleet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drone" DROP CONSTRAINT "FK_55219ad4d70df0c0a58e62be040"`);
        await queryRunner.query(`DROP TABLE "medication"`);
        await queryRunner.query(`DROP TABLE "drone"`);
        await queryRunner.query(`DROP TYPE "public"."drone_state_enum"`);
        await queryRunner.query(`DROP TABLE "fleet"`);
    }

}

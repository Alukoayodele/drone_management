import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializedDroneManagement1706730722011 implements MigrationInterface {
    name = 'InitializedDroneManagement1706730722011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fleet" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_17e0760d2492f67c67ce0fe4aa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medication" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "weight" double precision NOT NULL, "code" character varying(10) NOT NULL, "image" character varying(255) NOT NULL, "drone_id" integer, CONSTRAINT "PK_0682f5b7379fea3c2fdb77d6545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "droneBatteryLogs" ("id" SERIAL NOT NULL, "battery_level" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "drone_id" integer, CONSTRAINT "PK_646a236713588f07383f25173ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drone" ("id" SERIAL NOT NULL, "serial_number" character varying(100) NOT NULL, "model" "public"."drone_model_enum" NOT NULL, "weight_limit" integer NOT NULL, "battery_capacity" integer NOT NULL, "state" "public"."drone_state_enum" NOT NULL DEFAULT 'IDLE', "fleet_id" integer, CONSTRAINT "PK_2ac525cb1c63c95423e754dd41f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medication" ADD CONSTRAINT "FK_33c2bb2164fbe7686940f958a22" FOREIGN KEY ("drone_id") REFERENCES "drone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "droneBatteryLogs" ADD CONSTRAINT "FK_d9acf088261a7aca64131d83a69" FOREIGN KEY ("drone_id") REFERENCES "drone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drone" ADD CONSTRAINT "FK_8b9b712a8d28d7ae0fdf8860304" FOREIGN KEY ("fleet_id") REFERENCES "fleet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drone" DROP CONSTRAINT "FK_8b9b712a8d28d7ae0fdf8860304"`);
        await queryRunner.query(`ALTER TABLE "droneBatteryLogs" DROP CONSTRAINT "FK_d9acf088261a7aca64131d83a69"`);
        await queryRunner.query(`ALTER TABLE "medication" DROP CONSTRAINT "FK_33c2bb2164fbe7686940f958a22"`);
        await queryRunner.query(`DROP TABLE "drone"`);
        await queryRunner.query(`DROP TABLE "droneBatteryLogs"`);
        await queryRunner.query(`DROP TABLE "medication"`);
        await queryRunner.query(`DROP TABLE "fleet"`);
    }

}

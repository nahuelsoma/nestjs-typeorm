import {MigrationInterface, QueryRunner} from "typeorm";

export class fixIds1657821685742 implements MigrationInterface {
    name = 'fixIds1657821685742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "customer_id_seq" OWNED BY "customer"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"customer_id_seq"')
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"user_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "user_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "customer_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}

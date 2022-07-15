import {MigrationInterface, QueryRunner} from "typeorm";

export class productBrandRelation1657824362178 implements MigrationInterface {
    name = 'productBrandRelation1657824362178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brand" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "image" character varying(255) NOT NULL,
                "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"),
                CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "brandId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "brandId"
        `);
        await queryRunner.query(`
            DROP TABLE "brand"
        `);
    }

}

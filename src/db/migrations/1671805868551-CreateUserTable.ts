import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1671805868551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255),
                    password TEXT,
                    created TIMESTAMP DEFAULT NOW(),
                    UNIQUE(email)
          )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}

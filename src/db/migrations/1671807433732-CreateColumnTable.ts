import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateColumnTable1671807433732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "column" (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    example_data TEXT,
                    created TIMESTAMP DEFAULT NOW()
          )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "column" cascade`);
  }
}

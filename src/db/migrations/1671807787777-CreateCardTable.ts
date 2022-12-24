import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCardTable1671807787777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS card (
                    id SERIAL PRIMARY KEY,
                    column_id INTEGER NOT NULL REFERENCES "column"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    example_data TEXT,
                    created TIMESTAMP DEFAULT NOW()
          )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS card cascade`);
  }
}

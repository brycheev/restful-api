import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1671810300108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS comment (
                    id SERIAL PRIMARY KEY,
                    text TEXT,
                    card_id INTEGER NOT NULL REFERENCES card(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    created TIMESTAMP DEFAULT NOW()
          )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS card cascade`);
  }
}

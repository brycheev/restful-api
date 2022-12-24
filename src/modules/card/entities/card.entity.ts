import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnEntity } from '../../column/entities/column.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  example_data: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
  @JoinColumn({ name: 'column_id' })
  column: ColumnEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.card)
  comments: Array<CommentEntity>;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => CardEntity, (card) => card.comments)
  @JoinColumn({ name: 'card_id' })
  card: CardEntity;
}

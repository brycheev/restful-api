import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('column')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  is_deleted: boolean;

  @Column()
  example_data: string;

  @ManyToOne(() => UserEntity, (user) => user.columns)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.column)
  @JoinColumn({ name: 'card_id' })
  cards: Array<CardEntity>;
}

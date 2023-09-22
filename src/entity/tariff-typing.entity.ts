import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tarif-typing')
export class TariffTyping {
  @PrimaryGeneratedColumn()
  tariff_typing_id: number;

  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column()
  status: number;
}
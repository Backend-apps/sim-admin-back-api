import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tariff')
export class Tariff {
  @PrimaryGeneratedColumn()
  tarif_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  deadline: number;

  @Column()
  sms: string;

  // @Column()
  // minutes: string;

  @Column()
  mega_byte: string;

  @Column()
  sale: number;

  @Column()
  category_id: number;

  @Column()
  status: number;
}

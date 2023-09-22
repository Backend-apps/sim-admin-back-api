import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('packge')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  package_name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  deadline: number;

  @Column()
  time: string;

  @Column()
  ussd_code: number;

  @Column()
  sale: number;

  @Column()
  category_id: number;

  @Column()
  status: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  status: number;
}

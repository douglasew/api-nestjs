import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import { hashSync } from "bcrypt";
import { Gender } from "../dto/create-user.dto";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  phone_number: string;

  @Column({ type: "enum", enum: Gender, default: Gender.F })
  gender: Gender;

  @Column()
  birthday: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated-at" })
  updatedAt: string;

  @DeleteDateColumn({ name: "deleted-at" })
  deletedAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

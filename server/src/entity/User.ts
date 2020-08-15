import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import {IsNotEmpty, Min} from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: 'First name should not be empty' })
    firstName: string;

    @Column()
    @IsNotEmpty({ message: 'Last name should not be empty' })
    lastName: string;

    @Column()
    @Min(0, { message: 'Age must be greater than 0' })
    age: number;

    @Column()
    fullName: string;

    @BeforeInsert()
    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

}

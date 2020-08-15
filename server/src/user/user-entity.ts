import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import {ObjectType, Field, ID, } from 'type-graphql';
import {IsNotEmpty, Min} from 'class-validator';

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    @IsNotEmpty({ message: 'First name should not be empty' })
    firstName: string;

    @Column()
    @Field()
    @IsNotEmpty({ message: 'Last name should not be empty' })
    lastName: string;

    @Column()
    @Field()
    @Min(0, { message: 'Age must be greater than 0' })
    age: number;

    @Column()
    @Field()
    fullName: string;

    @BeforeInsert()
    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

}

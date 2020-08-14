import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @BeforeInsert()
    updateFirstName() {
        this.firstName = this.firstName + 'WOOT';
    }

}

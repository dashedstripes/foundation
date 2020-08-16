import { Service } from 'typedi';
import { User } from './user-entity';
import { getConnection } from 'typeorm';
import { UserInput } from './user-input';
import { validate } from 'class-validator';

@Service()
export class UserService {

  public async find() {
    return await getConnection('local').getRepository(User).find();
  }

  public async create(input: UserInput) {
    let user = new User()
    user.firstName = input.firstName
    user.lastName = input.lastName
    user.age = input.age

    const errors = await validate(user);

    if(errors.length > 0) {
      throw errors;
    }

    return await getConnection('local').getRepository(User).save(user);
  }

}
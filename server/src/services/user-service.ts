import { Service } from 'typedi';
import { User } from '../entity/user';
import { getConnection } from 'typeorm';

@Service()
export class UserService {

  public async find() {
    return await getConnection('local').getRepository(User).find();
  }

}
import {createConnection} from "typeorm"
import {User} from './user-entity'
import { validate } from "class-validator";

function buildValidUser() {
  const user = new User()
  user.firstName = 'Adam'
  user.lastName = 'Gray'
  user.age = 26
  return user;
}

describe('User', () => {

  let connection;
  let user;

  beforeAll(async ()=>{
    connection = await createConnection('test')
  })

  beforeEach(async () => {
    user = buildValidUser();
  })

  afterEach(async () => {
    await connection.createQueryBuilder().delete().from(User).execute()
  })

  it('should create a user', async () => {
    await connection.manager.save(user)
    const newUser = await connection.manager.findOne(User)

    expect(newUser.firstName).toEqual('Adam')
    expect(newUser.lastName).toEqual('Gray')
    expect(newUser.age).toEqual(26)
    expect(newUser.fullName).toEqual('Adam Gray')
  })

  it('should not be valid with empty firstName', async () => {
    user.firstName = '';
    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('firstName');
    expect(errors[0].constraints).toEqual({ isNotEmpty: 'First name should not be empty'})
  })

  it('should not be valid with empty lastName', async () => {
    user.lastName = '';
    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('lastName');
    expect(errors[0].constraints).toEqual({ isNotEmpty: 'Last name should not be empty'})
  })

  it('should not be valid with negative age', async () => {
    user.age = -10;
    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('age');
    expect(errors[0].constraints).toEqual({ min: 'Age must be greater than 0'})
  })

  it('should generate a fullName from firstName and lastName', async () => {
    await connection.manager.save(user)
    const newUser = await connection.manager.findOne(User)
    expect(newUser.fullName).toEqual('Adam Gray')
  })

})
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/user";
import { UserService } from "../../services/user-service";
import { UserInput } from "./user-input";

@Resolver(User)
export class UserResolver {

  constructor(private userService: UserService) {}

  @Query(returns => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userService.find();
  }

  @Mutation(returns => User)
  async createUser(@Arg('user') user: UserInput) {
    return this.userService.create(user);
  }
}
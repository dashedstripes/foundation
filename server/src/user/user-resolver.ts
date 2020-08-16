import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./user-entity";
import { UserService } from "./user-service";
import { UserInput } from "./user-input";
import { GraphQLError } from "graphql";

@Resolver(User)
export class UserResolver {

  constructor(private userService: UserService) {}

  @Query(returns => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userService.find();
  }

  @Mutation(returns => User)
  async createUser(@Arg('user') user: UserInput) {
    try {
      return await this.userService.create(user);
    } catch(err) {
      throw new GraphQLError(err);
    }
  }
}
import { Resolver, Query } from "type-graphql";
import { User } from "../../entity/user";
import { UserService } from "../../services/user-service";

@Resolver(User)
export class UserResolver {

  constructor(private userService: UserService) {}

  @Query(returns => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.userService.find();
  }
}
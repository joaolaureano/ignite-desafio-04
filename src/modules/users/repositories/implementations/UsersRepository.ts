import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const new_user = new User();
    Object.assign(new_user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      admin: false,
    });
    this.users.push(new_user);
    return new_user;
  }

  findById(id: string): User | undefined {
    const user_by_id = this.users.find((user) => user.id === id);
    return user_by_id;
  }

  findByEmail(email: string): User | undefined {
    const user_by_email = this.users.find((user) => user.email === email);
    return user_by_email;
  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.findIndex((user) => user.id === receivedUser.id);
    if (index === -1) {
      throw new Error("User not found");
    }
    Object.assign(receivedUser, { admin: true, updated_at: new Date() });
    this.users[index] = receivedUser;
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

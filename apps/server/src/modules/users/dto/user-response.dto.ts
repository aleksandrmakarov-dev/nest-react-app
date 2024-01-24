import { User } from "@prisma/client";

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  role: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.bio = user.bio;
    this.image = user.image;
    this.role = user.role;
  }
}

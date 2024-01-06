import { Role, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const externalProviders: string[] = ["google", "github"];

interface InitialUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const users: InitialUser[] = [
  {
    name: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: Role.ADMIN,
  },
  {
    name: "editor",
    email: "editor@example.com",
    password: "editor123",
    role: Role.EDITOR,
  },
  {
    name: "user",
    email: "user@example.com",
    password: "user123",
    role: Role.USER,
  },
];

async function seed() {
  const prisma = new PrismaClient();

  await prisma.$connect();

  await prisma.tag.deleteMany();
  await prisma.article.deleteMany();

  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.externalProvider.deleteMany();

  await prisma.externalProvider.createMany({
    data: externalProviders.map((p) => ({
      name: p,
    })),
  });

  await Promise.all(
    users.map(async (user) => {
      const { password, ...userData } = user;
      const passwordHash = await bcrypt.hash(user.password, 10);
      const now = new Date();

      const createdUser = await prisma.user.create({
        data: { ...userData, passwordHash: passwordHash, emailVerifiedAt: now },
      });

      if (!createdUser) {
        throw Error("Failed to create user");
      }
    }),
  );

  console.log("Seeding completed");
}

seed();

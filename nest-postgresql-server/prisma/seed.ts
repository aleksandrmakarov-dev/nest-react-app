import { Role, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const externalProviders: string[] = [
  "google",
  "github",
  "linkedin",
  "facebook",
];

interface InitialUser {
  name: string;
  bio: string;
  email: string;
  password: string;
  role: Role;
}

const initialUserData: InitialUser = {
  name: "admin",
  bio: "the ruler of the website",
  email: "admin@example.com",
  password: "admin",
  role: Role.ADMIN,
};

async function seed() {
  const prisma = new PrismaClient();

  await prisma.$connect();

  await prisma.profile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.externalProvider.deleteMany();

  await prisma.externalProvider.createMany({
    data: externalProviders.map((p) => ({
      name: p,
    })),
  });

  const passwordHash = await bcrypt.hash(initialUserData.password, 10);
  const now = new Date();

  const createdUser = await prisma.user.create({
    data: {
      email: initialUserData.email,
      passwordHash: passwordHash,
      emailVerifiedAt: now,
      role: initialUserData.role,
    },
  });

  if (!createdUser) {
    throw Error("Failed to create user");
  }

  const createdProfile = await prisma.profile.create({
    data: {
      name: initialUserData.name,
      bio: initialUserData.bio,
      userID: createdUser.id,
    },
  });

  if (!createdProfile) {
    throw new Error("Failed to create user profile");
  }

  console.log("Seeding completed");
}

seed();

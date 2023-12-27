-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('LOCAL', 'EXTERNAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerificationToken" TEXT NOT NULL,
    "emailVerificationTokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "passwordResetToken" TEXT NOT NULL,
    "passwordResetTokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "passwordResetedAt" TIMESTAMP(3),
    "role" "Role" NOT NULL,
    "profileID" TEXT,
    "accountIDs" TEXT[],
    "externalProviderIDs" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createByIp" TEXT,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "externalProviderID" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userIDs" TEXT[],
    "accountIDs" TEXT[],

    CONSTRAINT "ExternalProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExternalProviderToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileID_key" ON "User"("profileID");

-- CreateIndex
CREATE UNIQUE INDEX "Account_refreshToken_key" ON "Account"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "_ExternalProviderToUser_AB_unique" ON "_ExternalProviderToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExternalProviderToUser_B_index" ON "_ExternalProviderToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_externalProviderID_fkey" FOREIGN KEY ("externalProviderID") REFERENCES "ExternalProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExternalProviderToUser" ADD CONSTRAINT "_ExternalProviderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExternalProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExternalProviderToUser" ADD CONSTRAINT "_ExternalProviderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `passwordResetedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetedAt",
ADD COLUMN     "passwordResetAt" TIMESTAMP(3),
ALTER COLUMN "emailVerificationToken" DROP NOT NULL,
ALTER COLUMN "emailVerificationTokenExpiresAt" DROP NOT NULL,
ALTER COLUMN "passwordResetToken" DROP NOT NULL,
ALTER COLUMN "passwordResetTokenExpiresAt" DROP NOT NULL;

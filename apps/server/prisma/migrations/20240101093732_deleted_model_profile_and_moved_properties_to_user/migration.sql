/*
  Warnings:

  - You are about to drop the column `profileID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userID_fkey";

-- DropIndex
DROP INDEX "User_profileID_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileID",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'unknown';

-- DropTable
DROP TABLE "Profile";

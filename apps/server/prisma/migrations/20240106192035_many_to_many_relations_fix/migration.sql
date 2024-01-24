/*
  Warnings:

  - You are about to drop the column `tagIDs` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `articleIDs` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `accountIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `articleIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `externalProviderIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tagIDs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "tagIDs";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "articleIDs";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountIDs",
DROP COLUMN "articleIDs",
DROP COLUMN "externalProviderIDs",
DROP COLUMN "tagIDs";

/*
  Warnings:

  - You are about to drop the column `accountIDs` on the `ExternalProvider` table. All the data in the column will be lost.
  - You are about to drop the column `userIDs` on the `ExternalProvider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExternalProvider" DROP COLUMN "accountIDs",
DROP COLUMN "userIDs";

-- CreateTable
CREATE TABLE "_UserToFavoriteArticles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToFavoriteArticles_AB_unique" ON "_UserToFavoriteArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToFavoriteArticles_B_index" ON "_UserToFavoriteArticles"("B");

-- AddForeignKey
ALTER TABLE "_UserToFavoriteArticles" ADD CONSTRAINT "_UserToFavoriteArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToFavoriteArticles" ADD CONSTRAINT "_UserToFavoriteArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

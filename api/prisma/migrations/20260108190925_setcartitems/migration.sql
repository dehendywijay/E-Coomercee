/*
  Warnings:

  - You are about to drop the column `cartItems` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "cartItems";

-- CreateTable
CREATE TABLE "_ProductToProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductToProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductToProfile_B_index" ON "_ProductToProfile"("B");

-- AddForeignKey
ALTER TABLE "_ProductToProfile" ADD CONSTRAINT "_ProductToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProfile" ADD CONSTRAINT "_ProductToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

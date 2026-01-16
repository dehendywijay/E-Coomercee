/*
  Warnings:

  - Made the column `originalPrice` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "condition" TEXT,
ADD COLUMN     "sold" INTEGER DEFAULT 0,
ADD COLUMN     "unitWeight" TEXT,
ALTER COLUMN "originalPrice" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "description" SET NOT NULL;

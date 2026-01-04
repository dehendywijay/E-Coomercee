/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currentPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isOfficialStore` on the `Product` table. All the data in the column will be lost.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `storeId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "currentPrice",
DROP COLUMN "isOfficialStore",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "storeId",
ADD COLUMN     "storeId" INTEGER NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Store" DROP CONSTRAINT "Store_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

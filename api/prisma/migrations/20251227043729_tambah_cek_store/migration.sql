-- CreateEnum
CREATE TYPE "cekStore" AS ENUM ('YA', 'NO');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "buka" "cekStore" DEFAULT 'NO';

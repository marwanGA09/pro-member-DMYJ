/*
  Warnings:

  - You are about to drop the column `month_covered` on the `MonthlyPayment` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `MonthlyPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthlyPayment" DROP COLUMN "month_covered",
DROP COLUMN "total_amount",
ADD COLUMN     "month" INTEGER,
ADD COLUMN     "uuid" INTEGER NOT NULL DEFAULT 378925;

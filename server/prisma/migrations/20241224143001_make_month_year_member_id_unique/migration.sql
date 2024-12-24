/*
  Warnings:

  - A unique constraint covering the columns `[month,year,member_id]` on the table `MonthlyPayment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MonthlyPayment" ALTER COLUMN "uuid" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPayment_month_year_member_id_key" ON "MonthlyPayment"("month", "year", "member_id");

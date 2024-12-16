/*
  Warnings:

  - The `sex` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex",
ALTER COLUMN "full_name" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sex" "Sex";

-- CreateTable
CREATE TABLE "MonthlyPayment" (
    "id" SERIAL NOT NULL,
    "monthly_amount" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "month_covered" INTEGER[],
    "year" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyPayment_id_key" ON "MonthlyPayment"("id");

-- AddForeignKey
ALTER TABLE "MonthlyPayment" ADD CONSTRAINT "MonthlyPayment_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPayment" ADD CONSTRAINT "MonthlyPayment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `bookNumber` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `membershipAmmount` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `signedDate` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[book_number]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_number` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membership_amount` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_createdBy_fkey";

-- DropIndex
DROP INDEX "Member_bookNumber_key";

-- DropIndex
DROP INDEX "User_phonenumber_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "bookNumber",
DROP COLUMN "createdBy",
DROP COLUMN "dateOfBirth",
DROP COLUMN "membershipAmmount",
DROP COLUMN "profileImage",
DROP COLUMN "signedDate",
ADD COLUMN     "book_number" TEXT NOT NULL,
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "membership_amount" INTEGER NOT NULL,
ADD COLUMN     "profile_image" TEXT,
ADD COLUMN     "signed_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phonenumber",
ADD COLUMN     "phone_number" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_book_number_key" ON "Member"("book_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

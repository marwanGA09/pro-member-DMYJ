/*
  Warnings:

  - You are about to drop the column `first_name` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `Member` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "middle_name",
ADD COLUMN     "full_name" VARCHAR(80) NOT NULL;

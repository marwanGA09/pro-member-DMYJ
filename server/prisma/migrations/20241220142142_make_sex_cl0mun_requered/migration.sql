/*
  Warnings:

  - Made the column `sex` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "sex" SET NOT NULL;

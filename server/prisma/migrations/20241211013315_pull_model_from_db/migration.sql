-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('economy', 'academy', 'social', 'dawah', 'managment', 'other');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(80) NOT NULL,
    "first_name" VARCHAR(80) NOT NULL,
    "middle_name" VARCHAR(80) NOT NULL,
    "last_name" VARCHAR(80) NOT NULL,
    "date_of_birth" DATE,
    "email" VARCHAR(100) NOT NULL,
    "sector" "Sector" NOT NULL DEFAULT 'economy',
    "password" VARCHAR(200) NOT NULL,
    "phonenumber" VARCHAR(20) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

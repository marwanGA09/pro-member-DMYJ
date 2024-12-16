-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'bank_transfer', 'other');

-- AlterTable
ALTER TABLE "MonthlyPayment" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL DEFAULT 'cash';

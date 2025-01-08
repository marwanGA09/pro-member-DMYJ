-- CreateTable
CREATE TABLE "MembershipAmountGrouped" (
    "range" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MembershipAmountGrouped_range_key" ON "MembershipAmountGrouped"("range");

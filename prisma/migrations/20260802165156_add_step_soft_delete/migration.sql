-- AlterTable
ALTER TABLE "FlwSteps" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "FlwSteps_flwId_deletedAt_idx" ON "FlwSteps"("flwId", "deletedAt");

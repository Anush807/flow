-- DropIndex
DROP INDEX "FlwSteps_flwId_position_key";

-- AlterTable
ALTER TABLE "FlwSteps" ADD COLUMN     "branchIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parentStepId" TEXT;

-- CreateIndex
CREATE INDEX "FlwSteps_flwId_parentStepId_branchIndex_position_idx" ON "FlwSteps"("flwId", "parentStepId", "branchIndex", "position");

-- AddForeignKey
ALTER TABLE "FlwSteps" ADD CONSTRAINT "FlwSteps_parentStepId_fkey" FOREIGN KEY ("parentStepId") REFERENCES "FlwSteps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

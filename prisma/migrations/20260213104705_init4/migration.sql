-- AlterTable
ALTER TABLE "FlwExecutionSteps" ADD COLUMN     "error" TEXT,
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ALTER COLUMN "retryCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "FlwExecutionSteps" ADD COLUMN     "errorPayload" JSONB,
ADD COLUMN     "idempotencyKey" TEXT,
ADD COLUMN     "outputPayload" JSONB;

-- AlterTable
ALTER TABLE "FlwExecutions" ADD COLUMN     "triggerPayload" JSONB,
ADD COLUMN     "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FlwSteps" ADD COLUMN     "inputMapping" JSONB,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "operationKey" TEXT;

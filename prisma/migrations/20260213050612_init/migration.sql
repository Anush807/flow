-- CreateEnum
CREATE TYPE "FlwStepType" AS ENUM ('Trigger', 'Action');

-- CreateEnum
CREATE TYPE "FlwExecutionStatus" AS ENUM ('Pending', 'Success', 'Failed');

-- CreateTable
CREATE TABLE "Flw" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlwSteps" (
    "id" TEXT NOT NULL,
    "flwId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "type" "FlwStepType" NOT NULL,
    "integrationKey" TEXT NOT NULL,
    "configPayload" JSONB,

    CONSTRAINT "FlwSteps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlwExecutions" (
    "id" TEXT NOT NULL,
    "flwId" TEXT NOT NULL,
    "lockedBy" TEXT,
    "status" "FlwExecutionStatus" NOT NULL,
    "lockedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "FlwExecutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlwExecutionSteps" (
    "id" TEXT NOT NULL,
    "flwExecutionId" TEXT NOT NULL,
    "flwStepId" TEXT NOT NULL,
    "status" "FlwExecutionStatus" NOT NULL,
    "nextRetryAt" TIMESTAMP(3) NOT NULL,
    "retyCount" INTEGER NOT NULL,
    "inputSnapshot" TEXT NOT NULL,
    "outputSnapshot" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "error" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlwExecutionSteps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedEvents" (
    "id" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,
    "flwId" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedEvents_eventKey_key" ON "ProcessedEvents"("eventKey");

-- AddForeignKey
ALTER TABLE "FlwSteps" ADD CONSTRAINT "FlwSteps_flwId_fkey" FOREIGN KEY ("flwId") REFERENCES "Flw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlwExecutions" ADD CONSTRAINT "FlwExecutions_flwId_fkey" FOREIGN KEY ("flwId") REFERENCES "Flw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlwExecutionSteps" ADD CONSTRAINT "FlwExecutionSteps_flwExecutionId_fkey" FOREIGN KEY ("flwExecutionId") REFERENCES "FlwExecutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlwExecutionSteps" ADD CONSTRAINT "FlwExecutionSteps_flwStepId_fkey" FOREIGN KEY ("flwStepId") REFERENCES "FlwSteps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessedEvents" ADD CONSTRAINT "ProcessedEvents_flwId_fkey" FOREIGN KEY ("flwId") REFERENCES "Flw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

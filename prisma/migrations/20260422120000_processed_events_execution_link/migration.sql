ALTER TABLE "ProcessedEvents"
ADD COLUMN "flwExecutionId" TEXT;

CREATE UNIQUE INDEX "ProcessedEvents_flwExecutionId_key"
ON "ProcessedEvents"("flwExecutionId");

ALTER TABLE "ProcessedEvents"
ADD CONSTRAINT "ProcessedEvents_flwExecutionId_fkey"
FOREIGN KEY ("flwExecutionId") REFERENCES "FlwExecutions"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

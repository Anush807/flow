CREATE TYPE "FlwConditionSourceType" AS ENUM ('Trigger', 'StepOutput');

CREATE TYPE "FlwConditionOperator" AS ENUM (
  'Equals',
  'NotEquals',
  'Contains',
  'NotContains',
  'GreaterThan',
  'LessThan',
  'Exists',
  'NotExists'
);

CREATE TYPE "FlwConditionLogicGate" AS ENUM ('And', 'Or');

CREATE TABLE "FlwConditions" (
  "id" TEXT NOT NULL,
  "flwId" TEXT NOT NULL,
  "flwStepId" TEXT,
  "sourceType" "FlwConditionSourceType" NOT NULL,
  "sourceStepId" TEXT,
  "fieldPath" TEXT NOT NULL,
  "operator" "FlwConditionOperator" NOT NULL,
  "comparisonValue" JSONB,
  "logicGate" "FlwConditionLogicGate" NOT NULL DEFAULT 'And',
  "position" INTEGER NOT NULL,

  CONSTRAINT "FlwConditions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FlwConditions_flwId_flwStepId_position_idx"
ON "FlwConditions"("flwId", "flwStepId", "position");

ALTER TABLE "FlwConditions"
ADD CONSTRAINT "FlwConditions_flwId_fkey"
FOREIGN KEY ("flwId") REFERENCES "Flw"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE "FlwConditions"
ADD CONSTRAINT "FlwConditions_flwStepId_fkey"
FOREIGN KEY ("flwStepId") REFERENCES "FlwSteps"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

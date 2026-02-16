/*
  Warnings:

  - A unique constraint covering the columns `[flwId,position]` on the table `FlwSteps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FlwSteps_flwId_position_key" ON "FlwSteps"("flwId", "position");

/*
  Warnings:

  - You are about to drop the column `error` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `inputSnapshot` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `nextRetryAt` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `outputSnapshot` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `retyCount` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `FlwExecutionSteps` table. All the data in the column will be lost.
  - Added the required column `retryCount` to the `FlwExecutionSteps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlwExecutionSteps" DROP COLUMN "error",
DROP COLUMN "finishedAt",
DROP COLUMN "inputSnapshot",
DROP COLUMN "nextRetryAt",
DROP COLUMN "outputSnapshot",
DROP COLUMN "retyCount",
DROP COLUMN "startedAt",
DROP COLUMN "timeStamp",
ADD COLUMN     "retryCount" INTEGER NOT NULL;

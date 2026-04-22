/*
  Warnings:

  - You are about to drop the column `isActive` on the `Flw` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventKey]` on the table `Flw` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[webhookKey]` on the table `Flw` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FlwStatus" AS ENUM ('Draft', 'Active', 'Paused', 'Archived');

-- AlterTable
ALTER TABLE "Flw" DROP COLUMN "isActive",
ADD COLUMN     "eventKey" TEXT,
ADD COLUMN     "status" "FlwStatus" NOT NULL DEFAULT 'Draft',
ADD COLUMN     "webhookKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Flw_eventKey_key" ON "Flw"("eventKey");

-- CreateIndex
CREATE UNIQUE INDEX "Flw_webhookKey_key" ON "Flw"("webhookKey");

-- CreateTable
CREATE TABLE "FlwDataRecord" (
    "id" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlwDataRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FlwDataRecord_collection_idx" ON "FlwDataRecord"("collection");

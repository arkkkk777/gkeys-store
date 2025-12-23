-- AlterTable
ALTER TABLE "orders" ADD COLUMN "externalOrderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "orders_externalOrderId_key" ON "orders"("externalOrderId");

-- CreateIndex
CREATE INDEX "orders_externalOrderId_idx" ON "orders"("externalOrderId");

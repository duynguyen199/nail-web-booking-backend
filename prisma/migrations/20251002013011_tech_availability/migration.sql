-- CreateEnum
CREATE TYPE "public"."AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'LUNCH', 'ON_HOLD');

-- CreateTable
CREATE TABLE "public"."Availability" (
    "id" TEXT NOT NULL,
    "techId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Availability_techId_key" ON "public"."Availability"("techId");

-- CreateIndex
CREATE INDEX "Availability_techId_idx" ON "public"."Availability"("techId");

-- AddForeignKey
ALTER TABLE "public"."Availability" ADD CONSTRAINT "Availability_techId_fkey" FOREIGN KEY ("techId") REFERENCES "public"."NailTechProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

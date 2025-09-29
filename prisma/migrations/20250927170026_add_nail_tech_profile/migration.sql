-- CreateTable
CREATE TABLE "public"."NailTechProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "yearOfExp" INTEGER NOT NULL DEFAULT 0,
    "ratingAgv" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "bufferMinutes" INTEGER NOT NULL DEFAULT 15,
    "workingHours" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NailTechProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NailTechProfile_userId_key" ON "public"."NailTechProfile"("userId");

-- CreateIndex
CREATE INDEX "NailTechProfile_userId_idx" ON "public"."NailTechProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."NailTechProfile" ADD CONSTRAINT "NailTechProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `ratingAgv` on the `NailTechProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."NailTechProfile" DROP COLUMN "ratingAgv",
ADD COLUMN     "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

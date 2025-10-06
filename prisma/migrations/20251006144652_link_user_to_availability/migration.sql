-- DropForeignKey
ALTER TABLE "public"."Availability" DROP CONSTRAINT "Availability_techId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Availability" ADD CONSTRAINT "Availability_techId_fkey" FOREIGN KEY ("techId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

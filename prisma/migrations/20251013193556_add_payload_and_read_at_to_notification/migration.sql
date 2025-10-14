-- AlterTable
ALTER TABLE "public"."Notification" ADD COLUMN     "payload" JSONB,
ADD COLUMN     "readAt" TIMESTAMP(3);

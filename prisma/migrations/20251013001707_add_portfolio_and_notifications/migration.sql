-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('PORTFOLIO_UPLOAD', 'APPOINTMENT_CREATED', 'APPOINTMENT_CONFIRMED', 'APPOINTMENT_DENIED', 'GENERAL');

-- CreateTable
CREATE TABLE "public"."PortfolioImage" (
    "id" TEXT NOT NULL,
    "techId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioImage_techId_idx" ON "public"."PortfolioImage"("techId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "public"."Notification"("userId");

-- AddForeignKey
ALTER TABLE "public"."PortfolioImage" ADD CONSTRAINT "PortfolioImage_techId_fkey" FOREIGN KEY ("techId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

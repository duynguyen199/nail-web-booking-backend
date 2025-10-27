-- CreateTable
CREATE TABLE "public"."Checkin" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checkin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkin_appointmentId_key" ON "public"."Checkin"("appointmentId");

-- AddForeignKey
ALTER TABLE "public"."Checkin" ADD CONSTRAINT "Checkin_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

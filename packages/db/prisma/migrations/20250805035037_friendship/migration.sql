-- CreateEnum
CREATE TYPE "public"."FriendShipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');

-- CreateTable
CREATE TABLE "public"."FriendShip" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "addresseId" TEXT NOT NULL,
    "status" "public"."FriendShipStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "FriendShip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendShip_requesterId_addresseId_key" ON "public"."FriendShip"("requesterId", "addresseId");

-- AddForeignKey
ALTER TABLE "public"."FriendShip" ADD CONSTRAINT "FriendShip_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FriendShip" ADD CONSTRAINT "FriendShip_addresseId_fkey" FOREIGN KEY ("addresseId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

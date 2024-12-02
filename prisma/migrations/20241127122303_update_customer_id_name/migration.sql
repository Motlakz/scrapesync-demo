/*
  Warnings:

  - You are about to drop the column `stykiteCustomerId` on the `UserPurchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPurchase" DROP COLUMN "stykiteCustomerId",
ADD COLUMN     "fungiesCustomerId" TEXT;

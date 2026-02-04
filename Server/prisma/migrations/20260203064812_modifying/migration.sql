/*
  Warnings:

  - You are about to drop the column `aboutImage` on the `AboutUs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutUs" DROP COLUMN "aboutImage",
ADD COLUMN     "aboutImages" TEXT[];

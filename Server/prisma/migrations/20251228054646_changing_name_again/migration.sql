/*
  Warnings:

  - You are about to drop the column `fbLink` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `linkedInlink` on the `SiteSetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteSetting" DROP COLUMN "fbLink",
DROP COLUMN "linkedInlink",
ADD COLUMN     "fblink" TEXT,
ADD COLUMN     "linkedlink" TEXT;

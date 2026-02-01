/*
  Warnings:

  - Made the column `phonenumber` on table `SiteSetting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SiteSetting" ADD COLUMN     "address" TEXT,
ADD COLUMN     "mapurl" TEXT,
ADD COLUMN     "phonenumber2" TEXT,
ALTER COLUMN "phonenumber" SET NOT NULL;

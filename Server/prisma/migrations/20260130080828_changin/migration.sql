/*
  Warnings:

  - You are about to drop the column `slogan` on the `Slider` table. All the data in the column will be lost.
  - Made the column `title` on table `Slider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Slider" DROP COLUMN "slogan",
ALTER COLUMN "title" SET NOT NULL;

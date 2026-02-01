/*
  Warnings:

  - Added the required column `page` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slider" ADD COLUMN     "page" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[page]` on the table `BannerVideo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BannerVideo_page_key" ON "BannerVideo"("page");

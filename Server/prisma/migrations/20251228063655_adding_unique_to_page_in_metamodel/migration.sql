/*
  Warnings:

  - A unique constraint covering the columns `[page]` on the table `Meta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meta_page_key" ON "Meta"("page");

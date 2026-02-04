-- CreateTable
CREATE TABLE "PageContentAboveFooter" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageContentAboveFooter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageContentAboveFooter_page_key" ON "PageContentAboveFooter"("page");

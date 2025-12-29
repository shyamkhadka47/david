-- CreateTable
CREATE TABLE "BannerVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoFile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannerVideo_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `businessLogo` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `linkedInLink` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescriptionAboutBusiness` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `twitterLink` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeLink` on the `SiteSetting` table. All the data in the column will be lost.
  - Added the required column `businesslogo` to the `SiteSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessname` to the `SiteSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortdescriptionaboutbusiness` to the `SiteSetting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteSetting" DROP COLUMN "businessLogo",
DROP COLUMN "businessName",
DROP COLUMN "linkedInLink",
DROP COLUMN "phoneNumber",
DROP COLUMN "shortDescriptionAboutBusiness",
DROP COLUMN "twitterLink",
DROP COLUMN "youtubeLink",
ADD COLUMN     "businesslogo" TEXT NOT NULL,
ADD COLUMN     "businessname" TEXT NOT NULL,
ADD COLUMN     "linkedInlink" TEXT,
ADD COLUMN     "phonenumber" TEXT,
ADD COLUMN     "shortdescriptionaboutbusiness" TEXT NOT NULL,
ADD COLUMN     "twitterlink" TEXT,
ADD COLUMN     "youtubelink" TEXT;

/*
  Warnings:

  - Made the column `format` on table `Anime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `Anime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date` on table `Anime` required. This step will fail if there are existing NULL values in that column.
  - Made the column `episodios` on table `Anime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Anime" ALTER COLUMN "format" SET NOT NULL,
ALTER COLUMN "start_date" SET NOT NULL,
ALTER COLUMN "end_date" SET NOT NULL,
ALTER COLUMN "episodios" SET NOT NULL;

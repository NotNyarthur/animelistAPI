-- DropForeignKey
ALTER TABLE "AnimeStudio" DROP CONSTRAINT "AnimeStudio_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeStudio" DROP CONSTRAINT "AnimeStudio_studioId_fkey";

-- AddForeignKey
ALTER TABLE "AnimeStudio" ADD CONSTRAINT "AnimeStudio_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeStudio" ADD CONSTRAINT "AnimeStudio_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

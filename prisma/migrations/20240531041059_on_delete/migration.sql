-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_genreId_fkey";

-- AddForeignKey
ALTER TABLE "AnimeGenre" ADD CONSTRAINT "AnimeGenre_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeGenre" ADD CONSTRAINT "AnimeGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

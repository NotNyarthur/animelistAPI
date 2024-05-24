import { z } from "zod";

export const createGenreSchema = z.object({
  name: z.string().trim(),
});

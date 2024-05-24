import { z } from "zod";

export const createStudioSchema = z.object({
  name: z.string().trim(),
});

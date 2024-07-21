import { z } from 'zod';

export const File = z.object({
  path: z.string(),
  lastModifiedDate: z.date().optional(),
  createdDate: z.date().optional()
});

export type File = z.infer<typeof File>;

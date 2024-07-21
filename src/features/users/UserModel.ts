import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const UserEntry = z.object({
  firstName: z.string().max(50),
  lastName: z.string(),
  roles: z.array(z.string())
});

export const User = UserEntry.merge(
  z.object({
    id: z.string().uuid(),
    createdAt: z.string().transform((val) => new Date(val)),
    modifiedAt: z.string().transform((val) => new Date(val))
  })
);

export type UserEntry = z.infer<typeof UserEntry>;
export type User = z.infer<typeof User>;

export const UserEntrySchema = zodToJsonSchema(UserEntry);
export const UserSchema = zodToJsonSchema(User);

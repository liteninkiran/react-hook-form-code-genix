import { z } from 'zod';

import { patterns } from '../../constants';

export const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string()
    .min(1, { message: 'Email is required' })
    .refine((text) => patterns.email.test(text), {
      message: 'Email not valid',
    }),
});

export type Schema = z.infer<typeof schema>;

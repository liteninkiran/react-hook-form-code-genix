import { z } from 'zod';

import { patterns } from '../../constants';

const messages = {
  name: {
    min: { message: 'Required' },
  },
  email: {
    min: { message: 'Email is required' },
    pattern: { message: 'Email not valid' },
  },
}

const basic = z.object({
  name: z.string().min(1, messages.name.min),
  email: z.string()
    .min(1, messages.email.min)
    .refine((text) => patterns.email.test(text), messages.email.pattern),
  states: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1),
  skills: z.array(z.string()).max(2),
  registrationDateAndTime: z.date(),
  formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
  salaryRange: z.array(z.number()).max(2),
});

const createMode = z.object({ variant: z.literal('create') });
const editMode = z.object({ variant: z.literal('edit'), id: z.string().min(1) });
const modes = z.discriminatedUnion('variant', [createMode, editMode]);
const student = z.object({ name: z.string().min(4) });
const students = z.array(student);
const isTeacher = z.object({ isTeacher: z.literal(true), students: students });
const isNotTeacher = z.object({ isTeacher: z.literal(false) });
const teacher = z.union([isNotTeacher, isTeacher]);

export const schema = z.intersection(basic, modes).and(teacher);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: 'create',
  email: '',
  name: '',
  states: [],
  languagesSpoken: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
};

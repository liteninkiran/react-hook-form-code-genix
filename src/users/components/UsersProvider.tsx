import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, Schema, schema } from '../types/schema';
import { Users } from './Users';
import { DevTool } from '@hookform/devtools';

export function UsersProvider() {
  const methods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

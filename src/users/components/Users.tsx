import { useForm } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { schema, Schema } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const Users = () => {
  const { register, formState: { errors } } = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  const nameProps = {
    ...register('name'),
    label: 'Name',
    error: !!errors.name,
    helperText: errors.name?.message,
  }
  const emailProps = {
    ...register('email'),
    label: 'Email',
    error: !!errors.email,
    helperText: errors.email?.message,
  }
  return (
    <Stack sx={{ gap: 2 }}>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
    </Stack>
  );
}

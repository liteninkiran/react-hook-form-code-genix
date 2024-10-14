import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { schema, Schema } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const Users = () => {
  const { register } = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  return (
    <>
      <TextField {...register('email')} />
    </>
  );
}

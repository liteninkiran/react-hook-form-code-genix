import { useFormContext } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { Schema } from '../types/schema';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';

export const Users = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();
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
      <RHFAutocomplete name='states' />
    </Stack>
  );
}

import { useFormContext } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { Schema } from '../types/schema';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { Option } from '../../types/option';

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
  };
  const emailProps = {
    ...register('email'),
    label: 'Email',
    error: !!errors.email,
    helperText: errors.email?.message,
  };
  const states: Option[] = [
    { id: '1', label: 'California' },
    { id: '2', label: 'Ohio' },
    { id: '3', label: 'Texas' },
  ];
  return (
    <Stack sx={{ gap: 2 }}>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
      <RHFAutocomplete<Schema> name="states" label="States" options={states} />
    </Stack>
  );
};

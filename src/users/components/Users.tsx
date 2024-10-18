import { useFormContext } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { Schema } from '../types/schema';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { useEffect } from 'react';
import { useStates } from '../services/queries';

export const Users = () => {
  const statesQuery = useStates();
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Schema>();
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [watch]);
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
  return (
    <Stack sx={{ gap: 2 }}>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={statesQuery.data}
      />
    </Stack>
  );
};

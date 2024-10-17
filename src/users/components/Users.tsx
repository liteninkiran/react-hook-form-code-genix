import { useForm } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteRenderInputParams as Params,
  Stack,
  TextField,
} from '@mui/material';
import { schema, Schema } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';

export const Users = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm<Schema>({
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
  const states = [
    { id: 1, label: 'California' },
    { id: 2, label: 'Ohio' },
    { id: 3, label: 'Texas' },
  ];
  const render = (params: Params) => (<TextField {...params} label='States' />);
  return (
    <Stack sx={{ gap: 2 }}>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
      <Autocomplete options={states} renderInput={render} />
      <RHFAutocomplete name={'state'} options={states} label='States' />
    </Stack>
  );
}

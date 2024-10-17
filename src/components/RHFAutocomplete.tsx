import { Controller } from 'react-hook-form';
import { Autocomplete, AutocompleteRenderInputParams as Params, TextField } from '@mui/material';

export const RHFAutocomplete = () => {
  const render = (params: Params) => (<TextField {...params} label='States' />);
	return (
		<Controller
			control={control}
			name={name}
			render={(params) => <Autocomplete options={params.states} renderInput={render} />}
		/>
	);
}

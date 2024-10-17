import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete } from '@mui/material';

type Props = {
	name: string;
}

export const RHFAutocomplete = ({ name }: Props) => {
	const { control } = useFormContext();
	return (
		<Controller
			control={control}
			name={name}
			render={(params) => <Autocomplete />}
		/>
	);
}

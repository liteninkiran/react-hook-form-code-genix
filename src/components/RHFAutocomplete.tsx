import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Autocomplete, Box, TextField, Checkbox } from '@mui/material';
import { Option } from '../types/option';
import { default as CheckBoxOutlineBlankIcon } from '@mui/icons-material/CheckBoxOutlineBlank';
import { default as CheckBoxIcon } from '@mui/icons-material/CheckBox';

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
};

export const RHFAutocomplete = <T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value?.map((id: string) =>
            options.find((item) => item.id === id)
          )}
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ''
          }
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component={'li'} {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
          disableCloseOnSelect
          multiple
        />
      )}
    />
  );
};

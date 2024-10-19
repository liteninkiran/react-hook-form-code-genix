import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import { defaultValues, Schema } from '../types/schema';
import { Fragment, useEffect } from 'react';
import {
  useStates,
  useLanguages,
  useGenders,
  useSkills,
  useUsers,
  useUser,
} from '../services/queries';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFCheckbox } from '../../components/RHFCheckbox';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFTextField } from '../../components/RHFTextField';

export const Users = () => {
  // Hooks
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();
  const { watch, control, unregister, reset, setValue } =
    useFormContext<Schema>();
  const id = useWatch({ control, name: 'id' });
  const isTeacher = useWatch({ control, name: 'isTeacher' });
  const userQuery = useUser(id);
  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students',
  });

  // Effect Callbacks
  const subWatch = () => {
    const sub = watch((value) => {});
    return () => sub.unsubscribe();
  };

  const clearStudents = () => {
    if (!isTeacher) {
      replace([]);
      unregister('students');
    }
  };

  const resetQuery = () => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  };

  // Effects
  useEffect(subWatch, [watch]);
  useEffect(clearStudents, [isTeacher, replace, unregister]);
  useEffect(resetQuery, [reset, userQuery.data]);

  // Event Handlers
  const handleReset = () => reset(defaultValues);
  const handleUserClick = (id: string) => setValue('id', id);

  return (
    <Container maxWidth="sm" component="form" sx={{ mt: 3 }}>
      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          {/* Name */}
          <RHFTextField<Schema> name="name" label="Name" />

          {/* Email */}
          <RHFTextField<Schema> name="email" label="Email" />

          {/* States */}
          <RHFAutocomplete<Schema>
            name="states"
            label="States"
            options={statesQuery.data}
          />

          {/* Languages */}
          <RHFToggleButtonGroup<Schema>
            name="languagesSpoken"
            options={languagesQuery.data}
          />

          {/* Gender */}
          <RHFRadioGroup<Schema>
            name="gender"
            label="Gender"
            options={gendersQuery.data}
          />

          {/* Skills */}
          <RHFCheckbox<Schema>
            name="skills"
            label="Skills"
            options={skillsQuery.data}
          />

          {/* Registration Date */}
          <RHFDateTimePicker<Schema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />

          {/* Employment Period */}
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />

          {/* Salaray */}
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />

          {/* Teacher */}
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

          {/* Add Student */}
          {isTeacher && (
            <Button onClick={() => append({ name: '' })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<Schema>
                name={`students.${index}.name`}
                label="Name"
              />
              <Button
                color="error"
                onClick={() => {
                  remove(index);
                }}
                type="button"
              >
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

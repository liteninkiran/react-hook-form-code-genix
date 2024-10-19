import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button, Container, Stack, Typography } from '@mui/material';
import { defaultValues, Schema } from '../types/schema';
import { Fragment, useEffect } from 'react';
import {
  useStates,
  useLanguages,
  useGenders,
  useSkills,
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
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const { watch, control, unregister, reset } = useFormContext<Schema>();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [watch]);

  const isTeacher = useWatch({ control, name: 'isTeacher' });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students',
  });

  const clearStudents = () => {
    if (!isTeacher) {
      replace([]);
      unregister('students');
    }
  };

  useEffect(clearStudents, [isTeacher, replace, unregister]);

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container maxWidth="sm" component="form">
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
    </Container>
  );
};

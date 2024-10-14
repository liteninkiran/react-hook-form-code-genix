import { useForm } from 'react-hook-form';

export const Users = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({ mode: 'all' });
  const onSubmit = () => {

    console.log('Submit');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', {
        required: {
          value: true,
          message: 'Email is required',
        },
        maxLength: {
          value: 10,
          message: 'Too many characters',
        },
      })} placeholder='Email' />
      <p>
        {errors.email?.message}
      </p>
    </form>
  );
}

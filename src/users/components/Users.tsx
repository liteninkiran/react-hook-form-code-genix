import { useForm } from 'react-hook-form';

export const Users = () => {
  const { register } = useForm<{ email: string }>();
  return (
    <input {...register('email')} placeholder='Email' />
  );
}

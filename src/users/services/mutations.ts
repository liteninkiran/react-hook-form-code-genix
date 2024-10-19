import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Schema } from '../types/schema';

const baseUrl = 'http://localhost:8080/users';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const mutationFn = async (data: Schema) => await axios.post(baseUrl, data);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    alert('User created!');
  }
  return useMutation({ mutationFn, onSuccess });
}

export function useEditUser() {
  const queryClient = useQueryClient();
  const mutationFn = async (data: Schema) => {
    if (data.variant === 'edit') {
      const url = `${baseUrl}/${data.id}`;
      await axios.put(url, data);
      alert('User edited successfully!');
    }
  }
  const onSuccess = async (_: void, variables: Schema) => {
    await queryClient.invalidateQueries({ queryKey: ['users'] });

    if (variables.variant === 'edit') {
      await queryClient.invalidateQueries({
        queryKey: ['user', { id: variables.id }],
      });
    }
  }
  return useMutation({ mutationFn, onSuccess });
}

import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Option } from '../../types/option';
import { Schema } from '../types/schema';
import { ApiGet } from '../types/apiTypes';

const baseUrl = 'http://localhost:8080';

export function useStates() {
  const key = 'states';
  const url = `${baseUrl}/${key}`;
  return useQuery({
    queryKey: [key],
    queryFn: () => axios.get<Option[]>(url).then((res) => res.data),
  });
}

export function useLanguages() {
  const key = 'languages';
  const url = `${baseUrl}/${key}`;
  return useQuery({
    queryKey: [key],
    queryFn: () => axios.get<Option[]>(url).then((res) => res.data),
  });
}

export function useGenders() {
  const key = 'genders';
  const url = `${baseUrl}/${key}`;
  return useQuery({
    queryKey: [key],
    queryFn: () => axios.get<Option[]>(url).then((res) => res.data),
  });
}

export function useSkills() {
  const key = 'skills';
  const url = `${baseUrl}/${key}`;
  return useQuery({
    queryKey: [key],
    queryFn: () => axios.get<Option[]>(url).then((res) => res.data),
  });
}

export function useUsers() {
  const url = `${baseUrl}/users`;
  const getUserOption = (user: ApiGet): Option => ({
    id: user.id.toString(),
    label: user.name,
  });
  const mapUser = (response: AxiosResponse<ApiGet[], any>) =>
    response.data.map(getUserOption);
  const getUsers = () => axios.get<ApiGet[]>(url).then(mapUser);
  const queryKey = ['users'];
  const queryFn = (): Promise<Option[]> => getUsers();
  return useQuery({ queryKey, queryFn });
}

export function useUser(id: string) {
  const queryKey = ['user', { id }];
  const queryFn = async (): Promise<Schema> => {
    const url = `${baseUrl}/users/${id}`;
    const { data } = await axios.get<ApiGet>(url);

    return {
      variant: 'edit',
      id: data.id.toString(),
      name: data.name,
      email: data.email,
      formerEmploymentPeriod: [
        new Date(data.formerEmploymentPeriod[0]),
        new Date(data.formerEmploymentPeriod[1]),
      ],
      gender: data.gender,
      languagesSpoken: data.languagesSpoken,
      registrationDateAndTime: new Date(data.registrationDateAndTime),
      salaryRange: [data.salaryRange[0], data.salaryRange[1]],
      skills: data.skills,
      states: data.states,
      students: data.students,
      isTeacher: data.isTeacher,
    };
  }
  return useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
  });
}

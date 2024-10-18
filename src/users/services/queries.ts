import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Option } from '../../types/option';

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

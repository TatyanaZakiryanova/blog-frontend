import { AxiosError } from 'axios';

export const handleAxiosError = (err: unknown): string => {
  const error = err as AxiosError;
  if (!error.response) {
    return 'Сервер не отвечает';
  }

  if (error.response.status === 404) {
    return 'Запрашиваемый ресурс не найден';
  }

  const message = (error.response?.data as { message?: string }).message || 'Ошибка сервера';
  return message;
};

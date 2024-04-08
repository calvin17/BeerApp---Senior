import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiParams } from '../types/apiCall';
import { API } from '../api/config';

interface ApiHookResult<T> {
  loading: boolean;
  error: AxiosError<any> | null; // Specify AxiosError type
  makeApiCall: (url: string, params?: ApiParams) => Promise<T>;
}

const useApi = <T>(): ApiHookResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<any> | null>(null); // Specify AxiosError type

  const makeApiCall = async (url: string, params?: ApiParams): Promise<T> => {
    console.log('Making API call to:', url);
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.get(`${API}${url}`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, makeApiCall };
};

export default useApi;

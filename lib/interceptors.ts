import type { AxiosInstance } from 'axios';

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        console.error('Network / Timeout Error:', error);
        return Promise.reject({ message: 'Network / Timeout Error' });
      }

      const { status } = error.response;

      switch (status) {
        case 401:
          console.warn('Unauthorized access');
          break;
        case 500:
          console.error('Internal Server Error');
          break;
      }

      return Promise.reject(error.response.data || error);
    },
  );
};

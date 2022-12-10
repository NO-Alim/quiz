import { apiSlice } from '../api/apiSlice';

export const resultApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResult: builder.query({
      query: ({ userId, moduleId }) =>
        `/result?userId=${userId}&module=${moduleId}`,
    }),
  }),
});

export const { useGetResultQuery } = resultApi;

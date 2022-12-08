import { apiSlice } from '../api/apiSlice';

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addModule: builder.mutation({
      query: ({ data }) => ({
        url: 'modules',
        method: 'POST',
        body: data,
      }),
    }),
    getModules: builder.query({
      query: (email) => `/modules?author=${email}`,
    }),
  }),
});

export const { useAddModuleMutation, useGetModulesQuery } = moduleApi;

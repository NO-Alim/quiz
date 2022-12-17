import { apiSlice } from '../api/apiSlice';

export const resultApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addResult: builder.mutation({
      query: ({ data }) => ({
        url: 'result',
        method: 'POSt',
        body: data,
      }),
      invalidatesTags: ['result'],
    }),
    getResult: builder.query({
      query: ({ userId, moduleId }) =>
        `/result?userId=${userId}&moduleId=${moduleId}`,
      providesTags: ['result'],
    }),
    getUserAllResult: builder.query({
      query: (userId) => `/result?userId=${userId}`,
      providesTags: ['result'],
    }),
  }),
});

export const {
  useGetResultQuery,
  useAddResultMutation,
  useGetUserAllResultQuery,
} = resultApi;

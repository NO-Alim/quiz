import { json } from 'react-router-dom';
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

      //-------only work when request whole result array come instead of a single result. ***QuestionsContainer.js > line: 46
      // async onQueryStarted(args, { queryFulfilled, dispatch }) {
      //   const data = await queryFulfilled;
      //   //userId, moduleId
      //   if (data?.data?.userId && data?.data?.moduleId) {
      //     dispatch(
      //       apiSlice.util.updateQueryData(
      //         'getResult',
      //         { userId: data.data.userId, moduleId: data.data.moduleId },
      //         (draft) => {
      //           draft.push(data.data);
      //         }
      //       )
      //     );
      //     //UserId
      //     dispatch(
      //       apiSlice.util.updateQueryData(
      //         'getUserAllResult',
      //         data.data.userId,
      //         (draft) => {
      //           //draft.push(data.data);
      //           console.log(data.data);
      //         }
      //       )
      //     );
      //   }
      // },
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

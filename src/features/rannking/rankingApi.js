import { json } from 'react-router-dom';
import { apiSlice } from '../api/apiSlice';

export const rankingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRanking: builder.mutation({
      query: ({ data }) => ({
        url: '/ranking',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['myRanking'],
    }),
    editRanking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/ranking/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['myRanking'],
    }),
    getRanking: builder.query({
      query: ({ limit, userId }) => {
        let url = `/ranking`;
        if (limit) {
          url = `/ranking?_sort=point&_order=desc&_limit=${limit}`;
        }
        if (userId) {
          url = `/ranking?userId=${userId}`;
        }
        return url;
      },
      providesTags: ['myRanking'],
    }),
    getMyRanking: builder.query({
      query: ({ userId }) => `/ranking?_sort=point&_order=desc`,
      transformResponse(apiResponse, meta, arg) {
        const index = apiResponse.findIndex(
          (item) => item.userId === arg.userId
        );
        const data = apiResponse.filter((item) => item.userId === arg.userId);
        return {
          myIndex: index,
          data: data,
        };
      },
      providesTags: ['myRanking'],
    }),
  }),
});

export const {
  useAddRankingMutation,
  useEditRankingMutation,
  useGetRankingQuery,
  useGetMyRankingQuery,
} = rankingApi;

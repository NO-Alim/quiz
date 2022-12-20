import { apiSlice } from '../api/apiSlice';

export const rankingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRanking: builder.mutation({
      query: ({ data }) => ({
        url: '/ranking',
        method: 'POST',
        body: data,
      }),
    }),
    editRanking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/ranking/${id}`,
        method: 'PATCH',
        body: data,
      }),
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
    }),
  }),
});

export const {
  useAddRankingMutation,
  useEditRankingMutation,
  useGetRankingQuery,
} = rankingApi;

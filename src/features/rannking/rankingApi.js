import { apiSlice } from '../api/apiSlice';

export const rankingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRanking: builder.mutation({
      query: ({ data }) => ({
        url: 'ranking',
        method: 'POST',
        body: data,
      }),
    }),
    editRanking: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/ranking?userId=${userId}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getRanking: builder.query({
      query: ({ limit, userId }) => {
        let url = `/ranking`;
        if (limit) {
          url = `/ranking?_limit=${limit}`;
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

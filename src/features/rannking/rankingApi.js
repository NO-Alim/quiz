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
      //cache update
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const data = await queryFulfilled;
        if (data?.data?.userId) {
          //getRanking
          dispatch(
            apiSlice.util.updateQueryData(
              'getRanking',
              { limit: '', userId: data.data.userId },
              (draft) => {
                draft.push(data.data);
              }
            )
          );
          //getMyRanking
          dispatch(
            apiSlice.util.updateQueryData(
              'getMyRanking',
              { userId: data.data.userId },
              (draft) => {
                console.log('hello');
              }
            )
          );
        }
      },
    }),
    editRanking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/ranking/${id}`,
        method: 'PATCH',
        body: data,
      }),
      //cache update
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const data = await queryFulfilled;

        if (data?.data?.id && data?.data?.point) {
          //getRanking
          dispatch(
            apiSlice.util.updateQueryData(
              'getRanking',
              { limit: '', userId: data.data.userId },
              (draft) => {
                console.log(json.toString(draft));
              }
            )
          );
          //getMyRanking
          dispatch(
            apiSlice.util.updateQueryData(
              'getMyRanking',
              { userId: data.data.userId },
              (draft) => {
                console.log(json.toString(draft));
              }
            )
          );
        }
      },
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
    }),
  }),
});

export const {
  useAddRankingMutation,
  useEditRankingMutation,
  useGetRankingQuery,
  useGetMyRankingQuery,
} = rankingApi;

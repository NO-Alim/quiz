import { apiSlice } from '../api/apiSlice';

export const answersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAnswer: builder.mutation({
      query: ({ data }) => ({
        url: 'answers',
        method: 'POSt',
        body: data,
      }),
    }),
    getAnswers: builder.query({
      query: (moduleId) => {
        let url = `/answers`;
        if (moduleId) {
          url = `/answers?moduleId=${moduleId}`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetAnswersQuery, useAddAnswerMutation } = answersApi;

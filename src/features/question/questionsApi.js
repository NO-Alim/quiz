import { apiSlice } from '../api/apiSlice';

export const questionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: ({ data }) => ({
        url: 'questions',
        method: 'POSt',
        body: data,
      }),
    }),
    getQuestions: builder.query({
      query: (moduleId) => {
        let url = `/questions`;
        if (moduleId) {
          url = `/questions?moduleId=${moduleId}`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetQuestionsQuery, useAddQuestionMutation } = questionsApi;

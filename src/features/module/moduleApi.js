import { apiSlice } from '../api/apiSlice';

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addModule: builder.mutation({
      query: ({ data }) => ({
        url: 'modules',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const data = await queryFulfilled;
        if (data?.data?.author) {
          dispatch(
            apiSlice.util.updateQueryData(
              'getModules',
              data.data.author,
              (draft) => {
                draft.push(data.data);
              }
            )
          );
        }
      },
    }),
    getModules: builder.query({
      query: (email) => {
        let url = `/modules`;
        if (email) {
          url = `/modules?author=${email}`;
        }
        return url;
      },
    }),
  }),
});

export const { useAddModuleMutation, useGetModulesQuery } = moduleApi;

import { api } from "../api/baseApi";

const termsAndConditionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: `/terms-and-conditions/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["termsAndCondition"],
    }),
    termsAndCondition: builder.query({
      query: () => {
        return {
          url: `/terms-and-conditions`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
  providesTags: ["termsAndCondition"],
});

export const {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionSlice;

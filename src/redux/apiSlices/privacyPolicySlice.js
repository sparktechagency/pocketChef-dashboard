import { api } from "../api/baseApi";

const privacyPolicySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePricyPolicy: builder.mutation({
      query: (data) => {
        return {
          url: `/privacy-and-policy/create`,
          method: "POST",
          body: data,
        };
      },
    }),
    privacyPolicy: builder.query({
      query: () => {
        return {
          url: `/privacy-and-policy/all`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useUpdatePricyPolicyMutation, usePrivacyPolicyQuery } =
  privacyPolicySlice;

import { api } from "../api/baseApi";

const aboutUsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateAboutUs: builder.mutation({
      query: (data) => {
        return {
          url: `/about/create`,
          method: "POST",
          body: data,
        };
      },
    }),
    aboutUs: builder.query({
      query: () => {
        return {
          url: "/about/all",
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useUpdateAboutUsMutation, useAboutUsQuery } = aboutUsSlice;

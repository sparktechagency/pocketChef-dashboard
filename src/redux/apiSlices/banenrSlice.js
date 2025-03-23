import { api } from "../api/baseApi";

const bannerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allBanner: builder.query({
      query: () => {
        return {
          url: `/carusel`,
          method: "GET",
        };
      },
      providesTags: ["Banner"],
    }),
    addBanner: builder.mutation({
      query: (data) => ({
        url: `/carusel`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const { useAllBannerQuery, useAddBannerMutation } = bannerSlice;

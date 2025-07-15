import { api } from "../api/baseApi";

const bannerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allBanner: builder.query({
      query: () => {
        return {
          url: `/carusel/all`,
          method: "GET",
        };
      },
      providesTags: ["Banner"],
    }),

    addBanner: builder.mutation({
      query: (body) => ({
        url: "/carusel",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Banner"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/carusel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useAllBannerQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
} = bannerSlice;

import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query({
      query: () => {
        return {
          url: `/notification/all-admin-notification`,
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),
    readNotification: builder.mutation({
      query: (id) => {
        return {
          url: `/notification/read/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useNotificationQuery, useReadNotificationMutation } =
  notificationSlice;

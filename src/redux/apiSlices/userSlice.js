import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/profile",
        };
      },
    }),
    users: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/auth/users",
        };
      },
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/auth/user/${id}`,
        };
      },
    }),
    vendors: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=VENDOR",
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),

    banUser: builder.mutation({
      query: (id) => ({
        method: "PATCH",
        url: `/auth/ban/${id}`,
      }),
      invalidatesTags: ["users"],
    }),

    // send message to user
    sendMessage: builder.mutation({
      query: (data) => {
        console.log("in redux", data);
        return {
          method: "POST",
          url: "/adminmessage/create",
          body: data,
        };
      },
    }),

    getMessageByUser: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/adminmessage/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useGetSingleUserQuery,
  useVendorsQuery,
  useUserByIdQuery,
  useBanUserMutation,
  useSendMessageMutation,
  useGetMessageByUserQuery,
} = userSlice;

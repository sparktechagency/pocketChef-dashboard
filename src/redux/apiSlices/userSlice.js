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
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useGetSingleUserQuery,
  useVendorsQuery,
  useUserByIdQuery,
} = userSlice;

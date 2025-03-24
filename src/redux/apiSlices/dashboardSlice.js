import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/total-data",
        };
      },
    }),
    newUserChart: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/total-new-user",
        };
      },
    }),
  }),
});

export const { useGeneralStatsQuery, useNewUserChartQuery } = dashboardSlice;

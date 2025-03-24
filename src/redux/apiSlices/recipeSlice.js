import { api } from "../api/baseApi";

const recipeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipes: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/recipe",
        };
      },
      providesTags: ["getAllRecipes"],
    }),

    createRecipe: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/recipe/create",
        body,
      }),
      invalidatesTags: ["getAllRecipes"],
    }),

    //requested recipes
    requestedRecipes: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/recipes",
        };
      },
      providesTags: ["requestedRecipes"],
    }),
    updateRequestStatus: builder.mutation({
      query: ({ body, id }) => ({
        method: "PATCH",
        url: `/recipes/${id}`,
        body,
      }),
      invalidatesTags: ["requestedRecipes"],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useCreateRecipeMutation,
  useRequestedRecipesQuery,
  useUpdateRequestStatusMutation,
} = recipeSlice;

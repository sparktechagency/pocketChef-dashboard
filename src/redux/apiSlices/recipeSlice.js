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
  }),
});

export const { useGetAllRecipesQuery, useCreateRecipeMutation } = recipeSlice;

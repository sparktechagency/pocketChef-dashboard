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

    deleteRecipe: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/recipe/${id}`,
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
    recipeRequestBySingleUser: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/recipes/user/${id}`,
        };
      },
      providesTags: ["recipeRequestBySingleUser"],
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
  useDeleteRecipeMutation,

  //requested recipes
  useRequestedRecipesQuery,
  useRecipeRequestBySingleUserQuery,
  useUpdateRequestStatusMutation,
} = recipeSlice;

import { api } from "../api/baseApi";

const ingredientsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/ingredients",
        };
      },
      providesTags: ["ingredients"],
    }),
    addIngredient: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/ingredients",
        body,
      }),
      invalidatesTags: ["ingredients"],
    }),
    updateIngredient: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/ingredients/${id}`,
        body: data,
      }),
      invalidatesTags: ["ingredients"],
    }),
    deleteIngredient: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/ingredients/${id}`,
      }),
      invalidatesTags: ["ingredients"],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useAddIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientsSlice;

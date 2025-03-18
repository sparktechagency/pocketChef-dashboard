import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/category",
        };
      },
      providesTags: ["categories"],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/create-service",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        method: "PATCH",
        url: `/category/${id}`,
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/category/${id}`,
      }),
      invalidatesTags: ["categories"],
    }),

    //sub categories
    subCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/subcategory",
        };
      },
      providesTags: ["subCategories"],
    }),
    addSubCategory: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/subcategory/create",
        body,
      }),
      invalidatesTags: ["subCategories"],
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/subcategory/${id}`,
        body: data,
      }),
      invalidatesTags: ["subCategories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/subcategory/${id}`,
      }),
      invalidatesTags: ["subCategories"],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  //sub categories
  useSubCategoriesQuery,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = categorySlice;

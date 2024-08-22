import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFetchBaseQuery } from "../getFetchBaseQuery";
import { AnyNode } from "postcss";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: getFetchBaseQuery,
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        createPost: builder.mutation<void, { data: any }>({
            query: (post) => ({
                url: "posts",
                method: "POST",
                body: post.data,
            }),
            invalidatesTags: ["Post"],
        }),
        allPost: builder.query<any, void>({
            query: () => ({
                url: "posts?populate=*",
                method: "GET",
            }),
            providesTags: ["Post"],
        }),
        updatePost: builder.mutation<void, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `posts/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Post"],
        }),
        getPost: builder.query<any, string>({
            query: (id) => ({
                url: `posts/${id}?populate=*`,
                method: "GET",
            }),
            providesTags: ["Post"],
        }),
        deletePost: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
        searchPosts: builder.query<any, string>({
            query: (searchTerm) => ({
                url: `posts?populate=*&filters[title][$contains]=${searchTerm}`,
                method: "GET",
            }),
            providesTags: ["Post"],
        }),
        uploadMedia: builder.mutation<
            {
                url: string;
           
            },
            FormData
        >({
            query: (formData) => ({
                url: "upload",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});

export const {
    useCreatePostMutation,
    useAllPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useUploadMediaMutation,
    useGetPostQuery,
    useSearchPostsQuery,
} = postsApi;

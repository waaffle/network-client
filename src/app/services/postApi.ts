import { Post } from "../types";
import { api } from "./api";

const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        createPost: build.mutation<Post, string>({
            query: (userData) => ({
                url: '/posts',
                method: 'POST',
                body: userData
            })
        }),
        getAllPosts: build.query<Post[], void>({
            query: () => ({
                url: '/posts',
                method: 'GET',
            })
        }),
        getPostById: build.query<Post, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            })
        }),
        deletePost: build.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        }),

    })
})

export const {
    useCreatePostMutation,
    useDeletePostMutation,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery
} = postApi;

export const { endpoints: {
    createPost,
    getPostById,
    getAllPosts,
    deletePost
} } = postApi;
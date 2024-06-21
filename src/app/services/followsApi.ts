import { api } from "./api";

export const followsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        follow: builder.mutation<void, { followingId: string }>({
            query: (followingId) => ({
                url: `/follow`,
                method: 'POST'
            })
        }),
        unfollow: builder.mutation<void, string>({ //void
            query: (followingId) => ({
                url: `/unfollow/${followingId}`,
                method: 'DELETE'
            })
        }),

    })
})

export const {
    useFollowMutation,
    useUnfollowMutation
} = followsApi;

export const {
    endpoints: {
        follow,
        unfollow
    }
} = followsApi;
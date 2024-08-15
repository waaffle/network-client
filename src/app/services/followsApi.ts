import { api } from "./api";

export const followsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        follow: builder.mutation<void, { followingId: string }>({
            query: (followingId) => ({
                url: `/follow`,
                method: 'POST',
                body: followingId
            })
        }),
        unFollow: builder.mutation<void, string>({
            query: (followingId) => ({
                url: `/unfollow/${followingId}`,
                method: 'DELETE'
            })
        }),

    })
})

export const {
    useFollowMutation,
    useUnFollowMutation
} = followsApi;

export const {
    endpoints: {
        follow,
        unFollow
    }
} = followsApi;
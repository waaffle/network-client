import { User } from "../types";
import { api } from "./api";

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<{ token: string }, { email: string, password: string }>({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData
            })
        }),
        register: build.mutation<{ name: string, email: string, password: string },
            { name: string, email: string, password: string }>({
                query: (userData) => ({
                    url: '/register',
                    method: 'POST',
                    body: userData
                })
            }),
        getUserById: build.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET',
            })
        }),
        current: build.query<User, void>({
            query: () => ({
                url: '/current',
                method: 'GET'
            })
        }),
        updateUser: build.mutation<User, { userData: FormData, id: string }>({
            query: ({ userData, id }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: userData
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useUpdateUserMutation
} = userApi;

export const {
    endpoints: { login, register, current, getUserById, updateUser }
} = userApi;
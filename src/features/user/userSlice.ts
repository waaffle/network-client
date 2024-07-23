import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../app/services/userApi";
import { User } from "../../app/types";
import { RootState } from "../../app/store";

interface UserState {
    current: User | null
    isAuthorized: boolean
    users: User[] | null
    user: User | null
    token?: string
}

const initialState: UserState = {
    current: null,
    isAuthorized: false,
    users: null,
    user: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: () => initialState,
        resetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
            state.isAuthorized = true;
            state.token = action.payload.token;
        })
            .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
                state.current = action.payload;
                state.isAuthorized = true;
            })
            .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
})

export const { logout, resetUser } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthorized = (state: RootState): boolean => {
    return state.user.isAuthorized
}
export const selectCurrent = (state: RootState): User | null => {
    return state.user.current
}
export const selectUser = (state: RootState): User | null => {
    return state.user.user
}
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../constants";
import { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers: Headers, { getState }) => {
        const token = (getState()  as RootState).auth.token || localStorage.getItem("token");

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers;
    }
})
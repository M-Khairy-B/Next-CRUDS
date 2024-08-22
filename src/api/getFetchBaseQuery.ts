import { fetchBaseQuery } from "@reduxjs/toolkit/query";
const baseUrl = "https://sincere-boot-6c83aa78e8.strapiapp.com/api/";
export const getFetchBaseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
});

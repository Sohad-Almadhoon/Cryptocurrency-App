import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const cryptoNewHeader =
{
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'f3f0ab4c51msh71f7d89e3930333p1cd3b8jsnc1dec7628dcb',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const createRequest = (url: string) =>( { url, headers: cryptoNewHeader });
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
export const cyptoNewsApi = createApi({
    reducerPath: "cyptoApiNews",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)})
    })
});
export const {useGetCryptosNewsQuery } = cyptoNewsApi;
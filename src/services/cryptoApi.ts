import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'f3f0ab4c51msh71f7d89e3930333p1cd3b8jsnc1dec7628dcb',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({ query: (count) => createRequest(`/coins?limit=${count}`) }),
        getCryptoDetails: builder.query({ query: (coinId) => createRequest(`/coin/${coinId}`) }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
    })
});


export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;






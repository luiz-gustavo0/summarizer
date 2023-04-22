import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Article } from './types'

const API_KEY = import.meta.env.VITE_RAPID_API_KEY
const API_HOST = import.meta.env.VITE_RAPID_API_HOST

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json')
      headers.set('X-RapidAPI-Key', API_KEY)
      headers.set('X-RapidAPI-Host', API_HOST)

      return headers
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query<Article, { articleUrl: string }>({
      query: ({ articleUrl }) =>
        `/summarize?url=${encodeURIComponent(articleUrl)}&length=3`
    })
  })
})

export const { useLazyGetSummaryQuery } = articleApi

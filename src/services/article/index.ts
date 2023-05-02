import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Summary } from './types'

const API_KEY = import.meta.env.VITE_RAPID_API_KEY
const API_HOST = 'article-extractor-and-summarizer.p.rapidapi.com'

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
    getSummary: builder.query<Summary, { articleUrl: string }>({
      query: ({ articleUrl }) =>
        `/summarize?url=${encodeURIComponent(articleUrl)}&length=3`
    })
  })
})

export const { useLazyGetSummaryQuery } = articleApi

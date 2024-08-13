import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RESULTS_URLS, baseURL } from "../../utils/axiosinst"
import { requestHeader } from "../../utils/requestHeader"

export const ResultsSlice = createApi({
    reducerPath: "results",
    tagTypes: ["Results"],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
      quizzesResults: builder.query({
        query: () => ({
          url: RESULTS_URLS.resultsList,
          headers: requestHeader
  
        }),
        providesTags: ['Results']
      }),
    }),
  })
  
  export const { useQuizzesResultsQuery } = ResultsSlice
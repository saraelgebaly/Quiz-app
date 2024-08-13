import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STUDENTS_URLS, baseURL } from "../../utils/axiosinst";
import { requestHeader } from "../../utils/requestHeader";


export const studentSlice = createApi({
  reducerPath: "student",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes :["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: STUDENTS_URLS.allStudents,
        method: "GET",
        headers: requestHeader
        
      }),
    }),
    getAllStudentsWithoutGroup: builder.query({
      query: () => ({
        url: STUDENTS_URLS.allStudentsWithoutGroups,
        method: "GET",
        headers:requestHeader
      }),
    }),
    studentDetails: builder.query({
      query: (id:string) => ({
        url: STUDENTS_URLS.StudentDetails(id),
        headers: requestHeader
      }),
    }), 

    getTopFiveStudents: builder.query({
      query: () => ({
        url: STUDENTS_URLS.topFiveStudents,
        headers:  requestHeader
        
      }),
  }),
  
})
})

export const { useGetStudentsQuery,useGetAllStudentsWithoutGroupQuery, useStudentDetailsQuery , useGetTopFiveStudentsQuery} = studentSlice
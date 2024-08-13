import { baseURL, QUESTIONS_URLS } from "../../utils/axiosinst";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { requestHeader } from "../../utils/requestHeader";
import { IQuestionResponse } from "../../Interfaces/QuestionInterface";
export interface IFormError {
  data: {
    message: string;
    timestamp: string;
  };
  status: number;
}

export const questionSlice = createApi({
  reducerPath: "questions",
  tagTypes: ["Questions"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    allQuestions: builder.query({
      query: () => ({
        url: QUESTIONS_URLS.createQuestion,
        headers: requestHeader,
      }),
      providesTags: ["Questions"],
    }),
    createQuestion: builder.mutation({
      query: (data) => {
        return {
          url: QUESTIONS_URLS.createQuestion,
          method: "POST",
          body: data,
          headers: requestHeader,
        };
      },
      invalidatesTags: ["Questions"],
      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message, { autoClose: 1500 });
        return error;
      },
    }),
    deleteQuestion: builder.mutation({
      query: (id) => {
        return {
          url: `question/${id}`,
          method: "Delete",
          headers: requestHeader,
        };
      },
      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message, { autoClose: 1500 });
        return error;
      },
      invalidatesTags: ["Questions"],
    }),
    editQuestion: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data;
        return {
          url: QUESTIONS_URLS.questionOperations(editItemId),
          method: "PUT",
          body: bodyData,
          headers: requestHeader,
        };
      },
      invalidatesTags: ["Questions"],
      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message, { autoClose: 1500 });
        return error;
      },
    }),
    questionDetails: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.questionOperations(id),
        headers: requestHeader,
      }),
    }),
    getQuestions: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.examQuestions(id),
        headers: requestHeader,
      }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useAllQuestionsQuery,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useQuestionDetailsQuery,
} = questionSlice;

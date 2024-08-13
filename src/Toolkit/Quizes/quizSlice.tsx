import { baseURL, QUIZZES_URLS } from "../../utils/axiosinst";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { requestHeader } from "../../utils/requestHeader";
import { IJoinQuizResponse, IQuizzesResponse, ISubmitQuizResponse } from "../../Interfaces/QuizInterface";

interface IFormError {
    data: {
      message: string,
      timestamp: string
    };
    status: number;
  }
 
export const quizSlice = createApi({
  reducerPath: "quizzes",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Quizzes"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: QUIZZES_URLS.createQuiz,
        method: "POST",
        body: data,
        headers: requestHeader
      }),
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    editQuiz: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data;
        return {
          url: QUIZZES_URLS.quizzesOperations(editItemId),
          method: "PUT",
          body: bodyData,
          headers: requestHeader
        };
      },
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    deleteQuiz: builder.mutation({
      query: (deleteItemId) => ({
        url: QUIZZES_URLS.quizzesOperations(deleteItemId),
        method: "DELETE",
        headers: requestHeader
      }),
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    joinQuiz: builder.mutation({
      query: (data) => ({
        url: QUIZZES_URLS.joinQuiz,
        method: "POST",
        body: data,
        headers: requestHeader
      }),
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IJoinQuizResponse) => {
        toast.success(response.message);
        return response as IJoinQuizResponse;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    submitQuiz: builder.mutation({
      query: (data) => {
        const { _id, ...bodyData } = data;
        return {
          url: QUIZZES_URLS.finishQuiz(_id),
          method: "POST",
          body: bodyData,
          headers:requestHeader
        };
      },
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: ISubmitQuizResponse) => {
        toast.success(response.message);
        return response as ISubmitQuizResponse;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),
    getFirstUpcomingQuizzes: builder.query({
      query: () => ({
        url: QUIZZES_URLS.upcomingQuizzes,
        headers: requestHeader
      }),
      providesTags: ['Quizzes']
    }),
    completedQuizzes: builder.query({
      query: () => ({
        url: QUIZZES_URLS.completedQuizzes,
        headers: requestHeader
      })
    }),
    quizzesDetails: builder.query({
      query: (_id) => ({
        url: QUIZZES_URLS.quizzesOperations(_id),
        headers: requestHeader
      })
    })
  })
});

export const {
  useSubmitQuizMutation,
  useJoinQuizMutation,
  useGetFirstUpcomingQuizzesQuery,
  useCompletedQuizzesQuery,
  useCreateQuizMutation,
  useQuizzesDetailsQuery,
  useDeleteQuizMutation,
  useEditQuizMutation
} = quizSlice;

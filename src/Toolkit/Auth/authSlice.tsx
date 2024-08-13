import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_URLS, baseURL } from "../../utils/axiosinst";
import { toast } from "react-toastify";
import CookieServices from "../../utils/Cookies";
import { IChangePassResponse, IFormError } from "../../Interfaces/AuthInterface";
import { requestHeader } from "../../utils/requestHeader";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: AUTH_URLS.register,
        method: "POST",
        body: user,
      }),
      transformResponse: (response: {
        data: {
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          status: string;
          _id: string;
          updatedAt: string;
          createdAt: string;
          __v: number;
        };
        message: string;
      }) => {
        toast.success(response.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || "An error occurred", {
          autoClose: 1500,
        });
        return error;
      },
    }),
    login: builder.mutation({
      query: (user) => ({
        url: AUTH_URLS.login,
        method: "POST",
        body: user,
      }),
      transformResponse: (response: {
        
        data: {
          accessToken: string;
          refreshToken: string;
          profile: {
            _id: string;
            first_name: string;
            last_name: string;
            email: string;
            status: string;
            role: string;
          };
        };
        message: string;

      }) => {
        const res = response.data
        CookieServices.set("accessToken", res.accessToken);
        CookieServices.set("userInfo", JSON.stringify(res.profile));
        

        toast.success(response.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || "An error occurred", {
          autoClose: 1500,
        });
        return error;
      },
    }),
    forgotPassword: builder.mutation({
      query: (user) => ({
        url: AUTH_URLS.forgotPass,
        method: "POST",
        body: user,
      }),
      transformResponse: (response: { message: string }) => {
        toast.success(response.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || "An error occurred", {
          autoClose: 1500,
        });
        return error;
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: AUTH_URLS.resetPass,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { message: string }) => {
        toast.success(response.message, { autoClose: 1500 });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message || "An error occurred", {
          autoClose: 1500,
        });
        return error;
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        delete data.confirmPassword;
        return {
          url: AUTH_URLS.changePass,
          method: "POST",
          body: data,
          headers: requestHeader
        }
      },
      transformResponse: (response: IChangePassResponse) => {
        toast.success(response.message,{autoClose:1500});
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message,{autoClose:1500});
        return error;
      }
    })
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authSlice;
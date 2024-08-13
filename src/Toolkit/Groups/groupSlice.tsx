import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GROUPS_URLS, baseURL } from "../../utils/axiosinst";
import { toast } from "react-toastify";
import { requestHeader } from "../../utils/requestHeader";

export const groupSlice = createApi({
  reducerPath: "group",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["Groups"],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({
        url: GROUPS_URLS.groupsList,
        headers: requestHeader,
      }),

      providesTags: ["Groups"],
    }),

    addGroup: builder.mutation({
      query: (data) => ({
        url: GROUPS_URLS.groupsList,
        method: "POST",
        body: data,
        headers: requestHeader,
      }),

      transformResponse: (response: { message: string }) => {
        toast.success(response.message, {
          autoClose: 1500,
        });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message, {
          autoClose: 1500,
        });
        return error;
      },
      invalidatesTags: ["Groups"],
    }),
    updateGroup: builder.mutation({
      query: (newData) => {
        const { groupId, data } = newData;

        return {
          url: GROUPS_URLS.UpdateOrDeleteGroup(groupId),
          method: "PUT",
          body: data,
          headers: requestHeader,
        };
      },
      transformResponse: (response: { message: string }) => {
        toast.success(response.message, {
          autoClose: 1500,
        });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message, {
          autoClose: 1500,
        });
        return error;
      },
      invalidatesTags: ["Groups"],
    }),
    deleteGroup: builder.mutation({
      query: (groupIdToDelete) => {
        return {
          url: GROUPS_URLS.UpdateOrDeleteGroup(groupIdToDelete),
          method: "Delete",
          headers: requestHeader,
        };
      },
      transformResponse: (response: { message: string }) => {
        toast.success(response.message, {
          autoClose: 1500,
        });
        return response;
      },
      transformErrorResponse: (error: {
        data: {
          message: string;
          timestamp: string;
        };
        status: number;
      }) => {
        toast.error(error?.data?.message, {
          autoClose: 1500,
        });
        return error;
      },
      invalidatesTags: ["Groups"],
    }),
    getGroupById: builder.query({
      query: (id) => ({
        url: `group/${id}`,
        headers: requestHeader,
      }),
      providesTags: ["Groups"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupByIdQuery,
} = groupSlice;

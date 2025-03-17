import { ICustomerReqDetails } from "@/interfaces/consultants/dashboard/request";
import {
  IActiveRequestDataResposne,
  IResolveFiles,
  IUserRequestHistoryResponse,
} from "@/interfaces/requests/requests";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const requestsApi = createApi({
  reducerPath: "requestApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchActiveRequests: build.query<
      IActiveRequestDataResposne,
      {
        page?: number;
        limit?: number;
      }
    >({
      query: ({ page, limit }) => {
        let query = "";
        if (limit) {
          query += `?limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }
        return { url: `/api/users/user/pending-request${query}` };
      },
    }),
    fetchUserRequestHistory: build.query<
      {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
        requests: IUserRequestHistoryResponse[];
      },
      {
        userId: string;
        limit?: number;
        page?: number;
      }
    >({
      query: ({ userId, limit, page }) => {
        let query = "";
        if (limit) {
          query += `?limit=${limit}`;
        }
        if (page) {
          query += `&page=${page}`;
        }
        return { url: `/api/users/requests/completed/${userId}${query}` };
      },
    }),
    fetchResolvedFiles: build.query<IResolveFiles, string>({
      query: (id) => `/api/consultants/resolve/${id}`,
    }),
    getCustomerRequestDetail: build.query<ICustomerReqDetails, string>({
      query: (id) => `/api/consultants/orderdetail/${id}`,
    }),
    getSingleConsultantAvailability: build.query<
      {
        availableHoursCount: {
          time: string;
          isAvailable: true;
        }[];
      },
      {
        date: string;
        id: string;
      }
    >({
      query: ({ date, id }) =>
        `/api/users/consultant/${id}/availability?date=${date}`,
    }),
    updateReqAndCreateAppointment: build.mutation<
      unknown,
      {
        body: {
          orderId: string;
          time: string;
          date: string;
        };
        cid: string;
      }
    >({
      query: ({ body, cid }) => ({
        url: `/api/users/requests/${cid}/createappointment`,
        body,
        method: "POST",
      }),
    }),
    replyServiceChatMessageAsUser: build.mutation<
      unknown,
      {
        orderId: string;
        uid: string;
        message: string;
      }
    >({
      query: (body) => ({
        url: "/api/users/servicechat/user",
        method: "POST",
        body,
      }),
    }),
    fetchServiceMessages: build.query<unknown, void>({
      query: () => `/api/users/servicechat/messages`
    })
  }),
});

export const {
  useFetchActiveRequestsQuery,
  useLazyFetchUserRequestHistoryQuery,
  useLazyFetchResolvedFilesQuery,
  useLazyGetCustomerRequestDetailQuery,
  useLazyGetSingleConsultantAvailabilityQuery,
  useUpdateReqAndCreateAppointmentMutation,
  useLazyFetchActiveRequestsQuery,
  useReplyServiceChatMessageAsUserMutation,
  useLazyFetchServiceMessagesQuery
} = requestsApi;

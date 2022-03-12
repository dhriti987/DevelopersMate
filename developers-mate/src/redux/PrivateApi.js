import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchData = createApi({
  reducerPath: "fetchData",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  endpoints: (builder) => ({
    tagTypes: ['Post'],
    getRequest:builder.mutation({
      query:(url)=>{
        return {
          url:`${url}`,
          method:"GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      }
    }),

    postRequest: builder.mutation({
      query: (val) => {
        const {data,url}=val;
        console.log(url)
        return {
          url: `${url}`,
          method: "POST",
          body: data,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    patchRequest:builder.mutation({
      query:(val)=>{
        const {data,url}=val;
        return {
          url:`${url}`,
          method:"PATCH",
          body:data,
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
            "Content-type": "application/json; charset=UTF-8",
          }
        }
      }
    }),
    
    deleteRequest:builder.mutation({
      query:(url)=>{
        return {
          url:`${url}`,
          method:"DELETE",
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
            "Content-type": "application/json; charset=UTF-8",
          }

        }
      }
    })

  }),
});
export const { useGetRequestMutation,usePostRequestMutation,usePatchRequestMutation,useDeleteRequestMutation } = fetchData;

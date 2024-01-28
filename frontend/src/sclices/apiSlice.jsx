import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

const apiSclice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({})
})
export default apiSclice


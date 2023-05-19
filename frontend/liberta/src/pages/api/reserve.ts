import { CreateReserveParams } from "interfaces";
import client from "./client";

export const createReserve = (params: CreateReserveParams) => {
    return client.post("/reserves", params)
}
export const approve = (id: number) => {
    return client.put(`/reserves/${id}/approve`)
}
export const reject = (id: number) => {
    return client.put(`/reserves/${id}/reject`)
}
export const cancel = (id: number) => {
    return client.put(`/reserves/${id}/cancel`)
}
export const complete = (id: number) => {
    return client.put(`/reserves/${id}/complete`)
}

export const getReserves = (id: number) => {
    return client.get(`/users/${id}/has_reserves`)
} 
export const getRequests = (id: number) => {
    return client.get(`/users/${id}/has_requests`)
}

export const getReserveStatus = (id: number,teacher_id: number) => {
    return client.get(`/users/${id}/is_request`,{
        params: {
            teacher_id: teacher_id
        }
    })
}

export const getReserve =(id: number) => {
    return client.get(`/reserves/${id}`)
}

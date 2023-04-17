import { CreateLikeParams } from "interfaces";
import client from "./client";


export const createLike = (params: CreateLikeParams) => {
    return client.post("/likes",params);
    }
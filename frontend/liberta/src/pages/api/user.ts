import Cookies from "js-cookie";
import client from "./client";

export const getUsers = () => {
    return client.get("/users");
    }

export const getUser = (id: string) => {
    return client.get(`/users/${id}`);
}
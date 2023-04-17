import Cookies from "js-cookie";
import client from "./client";

export const getUsers = () => {
    return client.get("/users");
    }

export const getUser = (id: string) => {
    return client.get(`/users/${id}`);
}

export const confirmLiked = (id: number, user_id: number) => {
    return client.get(`/users/${id}/liked`, {
      params: {
        user_id: user_id
      }
    });
  };

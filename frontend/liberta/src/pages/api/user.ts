import Cookies from "js-cookie";
import client from "./client";

export const getUsers = () => {
    return client.get("/users");
    }

export const getUser = (id: string) => {
    return client.get(`/users/${id}`);
}

export const confirmLiked = (id: number, user_id: number) => {
    return client.get(`/users/${id}/check_liked`, {
      params: {
        user_id: user_id
      }
    });
  };

//いいねをしたユーザーを取得
export const getLikedUsers = (id: string) => {
    return client.get(`/users/${id}/liked_users`);
}

//いいねをされたユーザーを取得
export const getLikingUsers = (id: string) => {
    return client.get(`/users/${id}/liking_users`);
}

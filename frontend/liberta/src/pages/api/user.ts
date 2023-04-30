import { SearchStudentsParams, SearchTeachersParams } from "interfaces";
import Cookies from "js-cookie";
import client from "./client";

//全ユーザーを取得
export const getUsers = () => {
    return client.get("/users");
    }
export const getStudents = () => {
    return client.get("/users/students");
    }
export const getTeachers = () => {
    return client.get("/users/teachers");
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

//生徒検索api

export const SearchStudents = (params: SearchStudentsParams) => {
    return client.get("/users/students_search", {
      params: params
    });
  }

//先生検索api

export const SearchTeachers = (params: SearchTeachersParams) => {
    return client.get("/users/teachers_search", {
      params: params
    });
  }
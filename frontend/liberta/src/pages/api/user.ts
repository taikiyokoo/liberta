import Cookies from "js-cookie";
import client from "./client";

export const getUsers = () => {
    return client.get("/users");
    }
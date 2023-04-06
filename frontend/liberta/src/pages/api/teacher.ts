import { TeacherProfileCreateParams } from "interfaces";
import Cookies from "js-cookie";
import client from "./client";

export const createTeacherProfile =(params: TeacherProfileCreateParams)=>{
    return client.post("/teacher_profile",params)
}
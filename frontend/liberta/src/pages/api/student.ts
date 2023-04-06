import { StudentProfileCreateParams } from "interfaces";
import Cookies from "js-cookie";
import client from "./client";

export const createStudentProfile =(params: StudentProfileCreateParams)=>{
    return client.post("/student_profile",params)

}
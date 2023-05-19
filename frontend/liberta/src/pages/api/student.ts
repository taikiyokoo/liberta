import { StudentProfileCreateParams } from "interfaces";
import client from "./client";

export const createStudentProfile =(params: StudentProfileCreateParams)=>{
    return client.post("/student_profiles",params)

}
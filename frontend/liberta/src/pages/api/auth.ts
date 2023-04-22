import { SignInParams,SignUpParams } from "interfaces";
import Cookies from "js-cookie";
import client from "./client";

// サインアップ
export const signUp = (params: SignUpParams) =>{
    return client.post("auth",params)
}

//サインイン

export const signIn= (params: SignInParams)=>{
    return client.post("auth/sign_in",params,)
}

//サインアウト

export const signOut = ()=>{
    return client.delete("auth/sign_out",{headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}

//認証済みのユーザーを取得

export const getCurrentUser = () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return;
    return client.get("/auth/sessions");
};
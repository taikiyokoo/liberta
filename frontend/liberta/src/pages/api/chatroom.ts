import { CreateChatroomParams } from "interfaces"
import client from "./client"

export const createChatroom = (params:CreateChatroomParams) => {
  return client.post("/chatrooms",params)
}

export const getMessages = (chatroomId:string) => {
  return client.get(`/chatrooms/${chatroomId}/messages`)
}

export const getChatroom =(chatroomId: string) =>{
  return client.get(`/chatrooms/${chatroomId}`)
}
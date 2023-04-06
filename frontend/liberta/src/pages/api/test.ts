import client from "./client"

// 動作確認用
export const execTest = () => {
  return client.get("/test")
}
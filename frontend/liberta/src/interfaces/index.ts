// サインアップ
export interface SignUpParams {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    user_type: string
  }
  
  // サインイン
  export interface SignInParams {
    email: string
    password: string
  }
  
  // ユーザー
  export interface User {
    id: number
    uid: string
    provider: string
    email: string
    name: string
    nickname?: string
    image?: string
    allowPasswordChange: boolean
    created_at: Date
    updated_at: Date
  }

  export interface TeacherProfileCreateParams {
    age: number
    gender: number
    university: string
    subjects: string[]
    user_id :number | undefined
  }

  export interface StudentProfileCreateParams{
    gender: number
    grade: number
    age: number
    subjects: string[]
    school: string
    user_id :number | undefined
  }

  export interface TeacherProfile {
    age: number
    gender: number
    university: string
    subjects: string[]
    introduction: string | undefined
    oneLiner: string | undefined
    hourlyPay: number
    user_id:  number 

  }

  export interface StudentProfile{
    gender: number
    grade: number
    age: number
    subjects: string[]
    school: string
    oneLiner: string | undefined
    introduction: string | undefined
    user_id: number 

  }
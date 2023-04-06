import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import CommonLayout from './CommonLayout';
import { getCurrentUser } from './api/auth';
import { User } from 'interfaces';

//認証用context
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})


function MyApp({ Component, pageProps }: AppProps) {

  //認証状態管理
  const [loading,setLoading] = useState<boolean>(true)
  const [isSignedIn,setIsSignedIn] =  useState<boolean>(false)
  const [currentUser,setCurrentUser] = useState<User | undefined>()


  const router = useRouter();

  //ページ遷移時にログイン状態確認、currentUser格納
  const handleGetCurrentUser = async()=>{
    try{
      const res  = await getCurrentUser()

      if (res?.data.isLogin === true){
        setCurrentUser(res?.data.data)
        setIsSignedIn(true)
        console.log(res?.data.data)
      }else if(res?.data.isLogin === false){
        console.log(res?.data.message)
        if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/teacher/SignIn")&&!(router.pathname ==="/teacher/SignUp")&&!(router.pathname ==="/teacher/Registration")&&!(router.pathname ==="/student/Registration"))router.push("/Top")
      }else{
        console.log("No current User")
        if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/teacher/SignIn")&&!(router.pathname ==="/teacher/SignUp")&&!(router.pathname ==="/teacher/Registration")&&!(router.pathname ==="/student/Registration"))router.push("/Top")
      }

    } catch (err){
      console.log(err)
      if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/teacher/SignIn")&&!(router.pathname ==="/teacher/SignUp")&&!(router.pathname ==="/teacher/Registration")&&!(router.pathname ==="/student/Registration"))router.push("/Top")
    }
    setLoading(false)
  }

  useEffect(()=>{
    handleGetCurrentUser()
  },[router.pathname])



  return (
      <AuthContext.Provider value={{loading,setLoading,isSignedIn,setIsSignedIn,currentUser,setCurrentUser}}>
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </AuthContext.Provider>
  );
}


export default MyApp;

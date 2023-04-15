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

//プロフィール編集モーダル用context
export const TeacherEditModalContext = createContext({} as {
  teacherEditOpen: boolean
  setTeacherEditOpen: React.Dispatch<React.SetStateAction<boolean>>
})

export const StudentEditModalContext = createContext({} as {
  studentEditOpen: boolean
  setStudentEditOpen: React.Dispatch<React.SetStateAction<boolean>>
})



export const SearchModalContext = createContext({} as {
  searchOpen: boolean
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
})



function MyApp({ Component, pageProps }: AppProps) {

  //認証状態管理
  const [loading,setLoading] = useState<boolean>(true)
  const [isSignedIn,setIsSignedIn] =  useState<boolean>(false)
  const [currentUser,setCurrentUser] = useState<User | undefined>()

  //プロフィール編集モーダル管理
  const [teacherEditOpen,setTeacherEditOpen] = useState<boolean>(false)
  const [studentEditOpen,setStudentEditOpen] = useState<boolean>(false)

  //検索モーダル管理
  const [searchOpen,setSearchOpen]= useState<boolean>(false)


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
        if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/teacher/SignIn")&&!(router.pathname ==="/teacher/SignUp"))router.push("/TopPage")
      }else{
        console.log("No current User")
        if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/teacher/SignIn")&&!(router.pathname ==="/teacher/SignUp"))router.push("/TopPage")
      }

    } catch (err){
      console.log(err)
      if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/teacher/SignIn")&&!(router.pathname ==="/teacher/SignUp"))router.push("/TopPage")
    }
    setLoading(false)
  }

  useEffect(()=>{
    handleGetCurrentUser()
  },[])

  const isTopPage = Component.displayName === "TopPage";


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AuthContext.Provider value={{loading,setLoading,isSignedIn,setIsSignedIn,currentUser,setCurrentUser}}>
        <TeacherEditModalContext.Provider value={{teacherEditOpen,setTeacherEditOpen}}>
          <StudentEditModalContext.Provider value={{studentEditOpen,setStudentEditOpen}}>
            <SearchModalContext.Provider value={{searchOpen,setSearchOpen}}>
              {isTopPage ? (
                  <Component {...pageProps} />
                ) : (
                  <CommonLayout>
                    <Component {...pageProps} />
                  </CommonLayout>
                )}
            </SearchModalContext.Provider>
          </StudentEditModalContext.Provider>
        </TeacherEditModalContext.Provider>
      </AuthContext.Provider>
    </>
  );
}


export default MyApp;

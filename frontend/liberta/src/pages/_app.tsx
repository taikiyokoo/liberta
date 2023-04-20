import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import CommonLayout from './CommonLayout';
import { getCurrentUser } from './api/auth';
import { User } from 'interfaces';
import { ThemeProvider } from '@emotion/react';
import theme from 'theme';
import Head from 'next/head';
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
export const UserEditModalContext = createContext({} as {
  userEditOpen: boolean
  setUserEditOpen: React.Dispatch<React.SetStateAction<boolean>>
})



//検索モーダル用context
export const SearchModalContext = createContext({} as {
  searchOpen: boolean
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
})

//ホームにいるかどうか
export const HomeContext = createContext({} as {
  isHome: boolean
  setIsHome: React.Dispatch<React.SetStateAction<boolean>>
})

function MyApp({ Component, pageProps }: AppProps) {

  //認証状態管理
  const [loading,setLoading] = useState<boolean>(true)
  const [isSignedIn,setIsSignedIn] =  useState<boolean>(false)
  const [currentUser,setCurrentUser] = useState<User | undefined>()

  //プロフィール編集モーダル管理
  const [userEditOpen,setUserEditOpen] = useState<boolean>(false)

  //検索モーダル管理
  const [searchOpen,setSearchOpen]= useState<boolean>(false)

  //ホームにいるかどうか
  const [isHome,setIsHome] = useState<boolean>(false)

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
        if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/User/SignIn")&&!(router.pathname ==="/User/SignUp"))router.push("/TopPage")
      }else{
        console.log("No current User")
        if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/User/SignIn")&&!(router.pathname ==="/User/SignUp"))router.push("/TopPage")
      }

    } catch (err){
      console.log(err)
      if(!(router.pathname ==="/student/SignIn")&&!(router.pathname ==="/student/SignUp")&&!(router.pathname ==="/User/SignIn")&&!(router.pathname ==="/User/SignUp"))router.push("/TopPage")
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
     <Head>
        <title>liberta</title>
      </Head>
        <AuthContext.Provider value={{loading,setLoading,isSignedIn,setIsSignedIn,currentUser,setCurrentUser}}>
          <HomeContext.Provider value={{isHome,setIsHome}}>
            <UserEditModalContext.Provider value={{userEditOpen,setUserEditOpen}}>
                <SearchModalContext.Provider value={{searchOpen,setSearchOpen}}>
                    <ThemeProvider theme={theme}>
                      {isTopPage ? (
                          <Component {...pageProps} />
                        ) : (
                          <CommonLayout>
                            <Component {...pageProps} />
                          </CommonLayout>
                        )}
                    </ThemeProvider>
                </SearchModalContext.Provider>
            </UserEditModalContext.Provider>
          </HomeContext.Provider>
        </AuthContext.Provider>
    </>
  );
}


export default MyApp;

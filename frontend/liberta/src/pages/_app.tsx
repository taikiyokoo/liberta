import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import CommonLayout from './CommonLayout';
import { getCurrentUser } from './api/auth';
import { User } from 'interfaces';
import { ThemeProvider } from '@emotion/react';
import theme from 'theme';
import Head from 'next/head';
import { GlobalStyles } from '@mui/material';
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

  const isAuthRoute = (path:string) =>
  ['/student/SignIn', '/student/SignUp', '/User/SignIn', '/User/SignUp'].includes(path);

  //ページ遷移時にログイン状態確認、currentUser格納
  const handleGetCurrentUser = async()=>{

    try{

      const res  = await getCurrentUser()
      
      if (res?.data.isLogin === true){
        setCurrentUser(res?.data.data)
        setIsSignedIn(true)
        console.log(res?.data.data)
      }else if(res?.data.isLogin === false){
        console.log("API側で認証されてない")
        if (!isAuthRoute(router.pathname)) router.push('/TopPage');
      }else{
        console.log("そもそもqookieにtokenがない")
        if (!isAuthRoute(router.pathname)) router.push('/TopPage');
      }

    } catch (err){
      console.error
      
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
      <GlobalStyles
        styles={{
          html: {
            margin: 0,
            padding: 0,
          },
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />
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

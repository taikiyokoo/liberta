import { makeStyles, Theme } from '@material-ui/core'
import { AccountCircle, Favorite, FormatListNumberedRtlSharp, Search } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Toolbar, Typography, alpha, styled  } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext} from 'react'
import { signOut } from './api/auth'
import ProfileEdit from './components/Dialog/student/ProfileEdit'
import SearchBar from './components/Search/SearchBar'
import { AuthContext, UserEditModalContext } from './_app'




const Header: React.FC = () => {



//認証用のコンテキストを使用
const { loading, isSignedIn,setIsSignedIn,currentUser} = useContext(AuthContext)

//プロフィール編集モーダルのコンテキストを使用
const {userEditOpen,setUserEditOpen} = useContext(UserEditModalContext)

//スタイルを適用
const router = useRouter()

const handleSignOut = async()=>{
    try {
        //サインアウトAPI呼び出し
        const res = await signOut()
  
        if(res.data.success === true){
            // サインアウト時に各cookieを削除
            Cookies.remove("_access_token")
            Cookies.remove("_client")
            Cookies.remove("_uid")
  
            setIsSignedIn(false)
           router.push("/TopPage")
  
            console.log("succeed in sign out")
        }else{
            console.log("failed in sign out")
        }
  
    }catch(err){
        console.log(err)
        console.log("failed in sign out")
    }
  }



    const AuthButtons = () =>{
        if(!loading){
            if(isSignedIn){
                return (
                    <>
                        {currentUser&&
                            <>
                                <Favorite
                                    color= "primary"
                                    sx={{marginRight: 5}}
                                    onClick={()=>{
                                        if(currentUser.userType ==="student"){
                                            router.push(`/student/${currentUser.id}/LikedUsers`)
                                        }else{
                                            router.push(`/teacher/${currentUser.id}/LikedUsers`)
                                        }
                                    }}
                                    />
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="account"
                                    sx={{marginRight: 2}}
                                    onClick={()=>{setUserEditOpen(true)}}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </>
                        }
                        <Button
                        color="success"
                        onClick={handleSignOut}
                        >
                            Logout
                        </Button>
                    </>
                )

            }else{
                return(
                    <>
                        <Link href= "/User/SignIn">
                            <Button
                                variant='text'
                                color="success"
                            >
                            先生の方はこちら
                            </Button>
                        </Link>
                        <Link href="/student/SignIn">        
                            <Button
                                variant='text'
                                color="success"
                            >
                            生徒の方はこちら
                            </Button>
                        </Link>     
                    </>
                )

            }

        }else{
            return <></>
        }
    }

    return (
        <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <Toolbar>
            <Box sx={{ flexGrow: 1,}}>
                <Typography
                variant="h6"
                component= "caption"
                sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                    transform: 'translateY(-2px)',
                    },
                }}
                onClick={()=> router.push("/")}
                color= "teal"
                >
                    Liberta
                </Typography>
            </Box>
          <Box sx={{ flexGrow: 1 }} />
          {isSignedIn&&<SearchBar />}
          <Box sx={{ flexGrow: 1.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AuthButtons />
          </Box>
        </Toolbar>
        <ProfileEdit />
      </AppBar>
      
    );
}

export default Header
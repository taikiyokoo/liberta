import { makeStyles, Theme } from '@material-ui/core'
import { AccountCircle, Chat, Favorite, FormatListNumberedRtlSharp, Search, Widgets } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Toolbar, Typography, alpha, styled, darken, useTheme, useMediaQuery } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext} from 'react'
import { signOut } from './api/auth'
import MobileMenu from './components/Dialog/MobileMenu'
import { ProfileEdit as StudentProfileEdit } from './components/Dialog/student/ProfileEdit'
import { ProfileEdit as TeacherProfileEdit } from './components/Dialog/teacher/ProfileEdit'
import SearchBar from './components/Search/SearchBar'
import { AuthContext, HomeContext, UserEditModalContext } from './_app'




const Header: React.FC = () => {



//認証用のコンテキストを使用
const { loading, isSignedIn,setIsSignedIn,currentUser} = useContext(AuthContext)

//プロフィール編集モーダルのコンテキストを使用
const {userEditOpen,setUserEditOpen} = useContext(UserEditModalContext)

//ホームにいるかどうか
const {isHome,setIsHome} = useContext(HomeContext)

const router = useRouter()

//レスポンシブ対応用
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//スマホメニュー用
const [menuOpen,setMenuOpen] = React.useState<boolean>(false)

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
                                {isHome&&
                                <>
                                <Chat
                                    color= "primary"
                                    sx={{
                                        marginRight: 5,
                                        cursor: "pointer",
                                        ":hover": {
                                            color: darken(theme.palette.primary.main, 0.2),
                                            transform: "scale(1.2)",
                                        },
                                    }}
                                    onClick={()=>{
                                        if(currentUser.userType ==="student"){
                                            router.push(`/student/${currentUser.id}/ChatList`)
                                        }else{
                                            router.push(`/teacher/${currentUser.id}/ChatList`)
                                        }
                                    }}
                                />
                                <Favorite
                                    color= "primary"
                                    sx={{
                                        marginRight: 5,
                                        cursor: "pointer",
                                        ":hover": {
                                            color: darken(theme.palette.primary.main, 0.2),
                                            transform: "scale(1.2)",
                                        },
                                    }}
                                    onClick={()=>{
                                        if(currentUser.userType ==="student"){
                                            router.push(`/student/${currentUser.id}/LikedUsers`)
                                        }else{
                                            router.push(`/teacher/${currentUser.id}/LikedUsers`)
                                        }
                                    }}
                                    />
                                    </>
                                    }
                                <IconButton
                                    edge="end"
                                    color= "primary"
                                    aria-label="account"
                                    sx={{
                                        marginRight: 2,
                                        cursor: "pointer",
                                        ":hover": {
                                            color: darken(theme.palette.primary.main, 0.2),
                                            transform: "scale(1.2)",
                                        },
                                    }}
                                    onClick={()=>{setUserEditOpen(true)}}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </>
                        }
                        <Button
                        color="primary"
                        onClick={handleSignOut}
                        >
                            Logout
                        </Button>
                    </>
                )

            }else{
                return(
                    <>
                            <Button
                                variant='text'
                                color="primary"
                                onClick={()=> router.push("/teacher/SignIn")}
                            >
                            先生の方はこちら
                            </Button>
                            <Button
                                variant='text'
                                color="primary"
                                onClick={()=> router.push("/student/SignIn")}
                            >
                            生徒の方はこちら
                            </Button>
                    </>
                )

            }

        }else{
            return <></>
        }
    }

    const AuthButtonsMobile = () =>{
        if(!loading){
            if(isSignedIn){
                return (
                    <>
                        <Widgets color="primary" onClick={() => setMenuOpen(true)} />
                    </>
                )
                }else{
                    return(
                        <>
                            <Button
                                variant='text'
                                color="primary"
                                onClick={()=> router.push("/teacher/SignIn")}
                            >
                                先生の方はこちら
                                </Button>
                                <Button
                                    variant='text'
                                    color="primary"
                                    onClick={()=> router.push("/student/SignIn")}
                                >
                                生徒の方はこちら
                            </Button>  
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
                variant="subtitle1"
                sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    fontSize: '1.2rem',
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
          {isHome&&<SearchBar />}
            {isMobile ? (
                <>
                 <Box sx={{ flexGrow: 2 }} />
                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AuthButtonsMobile />
                </Box>
                </>
            ) : (<>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AuthButtons /> 
                </Box>
                </>
            )}
        </Toolbar>
        {currentUser&& currentUser.userType === "student" && <StudentProfileEdit />}
        {currentUser&& currentUser.userType === "teacher" && <TeacherProfileEdit />}   
        <MobileMenu menuOpen ={menuOpen} setMenuOpen={setMenuOpen} />
      </AppBar>
      
    );
}

export default Header
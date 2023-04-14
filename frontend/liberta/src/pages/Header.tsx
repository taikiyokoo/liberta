import { makeStyles, Theme } from '@material-ui/core'
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext} from 'react'
import { signOut } from './api/auth'
import { AuthContext, UserEditModalContext } from './_app'

const useStyles = makeStyles((theme: Theme)=>({
    iconButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexgrow: 1,
        textDecoration: "none",
        color: "inherit"
    },
    linkBtn: {
        textTransform: "none"
    }
}))

const Header: React.FC = () => {

//認証用のコンテキストを使用
const { loading, isSignedIn,setIsSignedIn,currentUser} = useContext(AuthContext)

//プロフィール編集モーダルのコンテキストを使用
const {open,setOpen} = useContext(UserEditModalContext)

//スタイルを適用
const classes = useStyles()
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
           router.push("/Top")
  
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
                        <Avatar
                            onClick={()=> {
                                console.log("クリック")
                                setOpen(true)
                                }}
                        >
                            {currentUser.name}
                        </Avatar>}
                        <Button
                        color="inherit"
                        className ={classes.linkBtn}
                        onClick={handleSignOut}
                        >
                            Logout
                        </Button>
                    </>
                )

            }else{
                return(
                    <>
                        <Link href= "/teacher/SignIn">
                            <Button
                                color="inherit"
                                className ={classes.linkBtn}
                                sx={{color: "white"}}
                            >
                            先生の方はこちら
                            </Button>
                        </Link>
                        <Link href="/student/SignIn">        
                            <Button
                                color="inherit"
                                className ={classes.linkBtn}
                                sx={{color: "white"}}
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
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        sx={{flexGrow: 1 }}
                        onClick={()=>router.push("/Top")}
                    >
                        liberta
                    </Typography>
                    <AuthButtons />
                </Toolbar>
            </AppBar>
        </Box>
    
    </div>
    )
}

export default Header


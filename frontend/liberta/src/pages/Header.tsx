import { makeStyles, Theme } from '@material-ui/core'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext} from 'react'
import { signOut } from './api/auth'
import { AuthContext } from './_app'

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

const { loading, isSignedIn,setIsSignedIn} = useContext(AuthContext)
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
           router.push("/SignIn")
  
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
                        <Button
                            color="inherit"
                            className ={classes.linkBtn}
                        >
                        先生の方はこちら
                        </Button>               
                        <Button
                            color="inherit"
                            className ={classes.linkBtn}
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
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position = "static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        sx={{flexGrow: 1 }}
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


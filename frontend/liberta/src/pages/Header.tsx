import { makeStyles, Theme } from '@material-ui/core'
import { AccountCircle, FormatListNumberedRtlSharp, Search } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Toolbar, Typography, alpha, styled  } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext} from 'react'
import { signOut } from './api/auth'
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
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="account"
                                sx={{marginRight: 2}}
                                onClick={()=>{setUserEditOpen(true)}}
                            >
                                <AccountCircle />
                            </IconButton>
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
                            >
                            先生の方はこちら
                            </Button>
                        </Link>
                        <Link href="/student/SignIn">        
                            <Button
                                variant='text'
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

    const SearchButton = styled(Button)(({ theme }) => ({
        padding: theme.spacing(1, 2),
        borderRadius: '9999px',
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        boxShadow: '0 2px 4px rgba(32,33,36,0.14)',
        '&:hover': {
          backgroundColor: theme.palette.common.white,
          boxShadow: '0 4px 6px rgba(32,33,36,0.28)',
        },
        marginRight: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
      }));


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
          <Box sx={{ flexGrow: 0.5 }} />
          {isSignedIn&&<SearchBar />}
          <Box sx={{ flexGrow: 1.5 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AuthButtons />
          </Box>
        </Toolbar>
      </AppBar>
      
    );
}

export default Header
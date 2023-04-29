import { AccountCircle, Chat, Close, Favorite, Logout } from '@mui/icons-material';
import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { signOut } from 'pages/api/auth';
import { AuthContext, UserEditModalContext } from 'pages/_app';
import React, { useContext } from 'react'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface SearchComponentProps {
    menuOpen: boolean;
    setMenuOpen: (menuOpen: boolean) => void;
  }

  
const MobileMenu:React.FC<SearchComponentProps> = ({menuOpen,setMenuOpen}) => {

  const router = useRouter()
  const { setIsSignedIn} = useContext(AuthContext)
  const {userEditOpen,setUserEditOpen} = useContext(UserEditModalContext)

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

  const handleEditModal =() =>{
    setMenuOpen(false)
    setUserEditOpen(true)
  }

  return (
    <div>
      <Dialog
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            fullScreen
            TransitionComponent={Transition}
          >
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMenuOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
            <DialogContent>
              <List>
                {/* 以下に、スマホサイズ時に表示されるメニュー項目を追加します */}
                <ListItemButton  onClick={() => { /* ここに onClick 処理を実装 */ }}>
                  <ListItemIcon>
                    <Chat color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="メッセージ" />
                </ListItemButton>
                <ListItemButton  onClick={() => { /* ここに onClick 処理を実装 */ }}>
                  <ListItemIcon>
                    <Favorite color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="いいねされたユーザー" />
                </ListItemButton>
                <ListItemButton  onClick={() => {handleEditModal()}}>
                  <ListItemIcon>
                    <AccountCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="アカウント編集" />
                </ListItemButton>
                <ListItemButton  onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout color="primary"/>
                  </ListItemIcon>
                    <ListItemText color="primary" primary="ログアウト" />
                </ListItemButton>
              </List>
            </DialogContent>
          </Dialog>
        
      
    </div>
  )
}

export default MobileMenu

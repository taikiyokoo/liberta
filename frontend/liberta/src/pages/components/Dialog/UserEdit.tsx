import { CardContent } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Avatar, Card, CardHeader, Dialog } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { AuthContext, UserEditModalContext } from 'pages/_app'
import React, { useContext } from 'react'
import Slide from '@mui/material/Slide';


const UserEdit:React.FC = () => {

    const {currentUser} = useContext(AuthContext)
    const {userEditOpen,setUserEditOpen} = useContext(UserEditModalContext)

    const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });


  return (
      <Dialog
      open={userEditOpen}
      onClose={()=>{setUserEditOpen(false)}}
      aria-describedby="dialog-slide-description"
      >
        <Card>
          <CardHeader title="アカウント情報を変更する" avatar={<Avatar sx={{ bgcolor: red[500] }}>{currentUser?.name}</Avatar>} />
          <CardContent></CardContent>
        </Card>
      </Dialog>
  )
}
export default UserEdit

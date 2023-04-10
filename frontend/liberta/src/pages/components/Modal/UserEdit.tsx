import { red } from '@material-ui/core/colors'
import { Avatar, Card, CardHeader, Modal, Typography } from '@mui/material'
import { AuthContext, UserEditModalContext } from 'pages/_app'
import React, { useContext } from 'react'


const UserEdit:React.FC = () => {

    const {open,setOpen} = useContext(UserEditModalContext)
    const {currentUser} = useContext(AuthContext)

    const handleClose =()=>{
        setOpen(false)
    }

  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Card>
            <CardHeader title="アカウント情報を変更する" avatar={<Avatar sx={{ bgcolor: red[500] }}>{currentUser?.name}</Avatar>} />

            </Card>
        </Modal>
      
    </div>
  )
}

export default UserEdit

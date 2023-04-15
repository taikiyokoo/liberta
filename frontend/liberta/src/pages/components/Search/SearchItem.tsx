import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SearchModalContext } from 'pages/_app'
import React, { useContext } from 'react'
import { styled } from '@mui/system';

const CustomDialogContainer = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: '32px',
     
    },
  }));

const SearchItem:React.FC = () => {

    const {searchOpen,setSearchOpen} = useContext(SearchModalContext)
  return (
    <div>
        <CustomDialogContainer
        open={searchOpen}
        onClose={()=>{setSearchOpen(false)} }
        aria-labelledby="custom-dialog-title"
        aria-describedby="custom-dialog-description"
        >
            <DialogTitle id="custom-dialog-title">条件から検索する</DialogTitle>
            <DialogContent>
                <DialogContentText id="custom-dialog-description">
                    ここに検索条件を入れる
                </DialogContentText>
            </DialogContent>
        </CustomDialogContainer>
      
    </div>
  )
}

export default SearchItem

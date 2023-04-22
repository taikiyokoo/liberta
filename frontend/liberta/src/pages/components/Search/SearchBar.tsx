import React, { useContext, useState } from "react";
import {  Search } from '@mui/icons-material'
import { Button, Typography, styled, Box  } from '@mui/material'
import { AuthContext, SearchModalContext } from "pages/_app";

const SearchButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 5),
  borderRadius: '9999px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: '0 2px 4px rgba(32,33,36,0.2)',
  cursor: 'pointer',
  marginBottom: 10,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 4px 6px rgba(32,33,36,0.3)',
  },
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')`
  border-radius: 50%;
  background-color: teal;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;




const SearchBar:React.FC = () => {
  const {searchOpen,setSearchOpen} = useContext(SearchModalContext)
  const {currentUser, setCurrentUser} = useContext(AuthContext)
  
      
  return (
    <div>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <SearchButton
          variant="text"
          onClick={() => setSearchOpen(true)}
        >
          <Typography variant="subtitle2" sx={{ marginRight: 5 }}>
            条件から検索する
          </Typography>
          <SearchIconWrapper>
            <Search sx={{color: "white"}} />
          </SearchIconWrapper>
        </SearchButton>
        <Button
            variant="outlined"
            color="error"
            onClick={() => window.location.reload()}
            sx={{ fontSize: 0.9,borderRadius: 50 }}
          >
            全ての検索条件をリセット
        </Button>
      </Box>
  </div>
  )
}

export default SearchBar

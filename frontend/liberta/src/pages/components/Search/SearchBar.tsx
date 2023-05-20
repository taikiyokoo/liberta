import React, { useContext, useState } from "react";
import {  Search } from '@mui/icons-material'
import { Button, Typography, styled, Box, useTheme, useMediaQuery  } from '@mui/material'
import { AuthContext, SearchModalContext } from "pages/_app";

const SearchButton = styled(Button)(({ theme }) => ({
  maxWidth : "100%",
  padding: theme.spacing(1, 5),
  borderRadius: '9999px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: '0 2px 4px rgba(32,33,36,0.2)',
  cursor: 'pointer',
  marginTop: 20,
  marginBottom: 15,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 4px 6px rgba(32,33,36,0.3)',
  },
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '95%',
    padding: theme.spacing(1, 3),
   
  },
  
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

    //レスポンシブ対応用
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
      
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
          {isMobile?
            <>
            <Typography variant="subtitle2" sx={{ marginRight: 3,fontSize: "0.9em" }}>
              条件から検索
            </Typography>
            <SearchIconWrapper>
              <Search sx={{color: "white"}} />
            </SearchIconWrapper>
          </> : 
          <>
            <Typography variant="subtitle2" sx={{ marginRight: 5 }}>
              条件から検索する
            </Typography>
            <SearchIconWrapper>
              <Search sx={{color: "white"}} />
            </SearchIconWrapper>
          </>
          }
        </SearchButton>
      </Box>
  </div>
  )
}

export default SearchBar

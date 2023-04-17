import React, { useContext, useState } from "react";
import {  Search } from '@mui/icons-material'
import { Button, Typography, styled  } from '@mui/material'
import { AuthContext, SearchModalContext } from "pages/_app";
import { SearchItem as TeacherSearchItem }from "../Dialog/teacher/SearchItem";
import { SearchItem as StudentSearchItem }from "../Dialog/student/SearchItem";

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
    {searchOpen ? ( //詳細検索ボタンが押されているかどうか
      currentUser?.userType ==="teacher" ? <TeacherSearchItem /> : <StudentSearchItem /> //先生か生徒かで検索項目を変える

    ) : (

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
    )}
  </div>
  )
}

export default SearchBar

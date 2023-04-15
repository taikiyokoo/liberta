import React, { useContext, useState } from "react";
import {  Search } from '@mui/icons-material'
import { Button, Typography, styled  } from '@mui/material'
import { SearchModalContext } from "pages/_app";
import SearchItem from "../Dialog/SearchItem";

const SearchButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 5),
  borderRadius: '9999px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: '0 2px 4px rgba(32,33,36,0.2)',
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 4px 6px rgba(32,33,36,0.3)',
  },
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));




const SearchBar:React.FC = () => {
  const {searchOpen,setSearchOpen} = useContext(SearchModalContext)
  
      
  return (
    <div>
      {searchOpen ?
        <SearchItem />
        :
        <SearchButton variant="text" onClick={()=> setSearchOpen(true)}>
          <Typography variant="subtitle2" sx={{marginRight: 5}}>条件から検索する</Typography>
          <Search />
      </SearchButton>
      }
    </div>
  )
}

export default SearchBar

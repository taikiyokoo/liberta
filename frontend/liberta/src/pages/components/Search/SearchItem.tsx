import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  InputAdornment,
} from "@mui/material";
import { alpha, styled } from "@mui/system";
import { SearchRounded } from "@mui/icons-material";

const CustomTextField = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 8px; /* 入力欄の角を丸くします */
    background-color: #f0f0f0; /* 背景色を設定して丸い形が分かるようにします */
    padding: 4px; /* 入力欄とラベルの間にスペースを追加します */
  }

  .MuiInputBase-input {
    padding: 8px; /* 入力欄内のテキストと境界の間にスペースを追加します */
  }

  .MuiInputLabel-root {
   
    padding: 0 4px; /* ラベルの背景色が入力欄の背景色と重ならないようにします */
  }
`;




const SearchItem:React.FC = () => {
  
  
      
  return (
    <div>
      <Container sx={{display: "flex",justifyContent: "center",marginBottom: 10}} >
        <CustomTextField
          label="検索"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </div>
  )
}

export default SearchItem

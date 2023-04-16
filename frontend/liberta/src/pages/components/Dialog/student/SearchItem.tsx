import React, { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Slider,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import Slide from '@mui/material/Slide';
import { SearchModalContext } from 'pages/_app';

const SearchItem: React.FC = () => {

  const { searchOpen, setSearchOpen } = useContext(SearchModalContext);
  const handleClose = () => {
    setSearchOpen(false);
  };

  return (
    <div>
      <Dialog
        open={searchOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Slide}
        transitionDuration={{ enter: 500, exit: 500 }}
        keepMounted
      >
        <DialogContent sx={{padding:7}}>
          {/* 大学名 */}
          <Box marginBottom={2}>
            <FormControl fullWidth>
              <TextField label="大学名" />
            </FormControl>
          </Box>

          {/* 専攻 */}
          <Box marginBottom={2}>
            <FormControl sx={{ width: "40%"}}>
              <InputLabel>文理選択</InputLabel>
              <Select>
                <MenuItem value="理系">理系</MenuItem>
                <MenuItem value="文系">文系</MenuItem>
                <MenuItem value="">どちらでも</MenuItem>
              </Select>
            </FormControl>
         </Box>
          {/* 性別 */}
          <Box marginBottom={2}>
            <FormControl sx={{ width: "40%" }}>
              <InputLabel>性別</InputLabel>
              <Select>
                <MenuItem value="男性">男性</MenuItem>
                <MenuItem value="女性">女性</MenuItem>
                <MenuItem value="">どちらでも</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* 指導形態 */}
         <Box marginBottom={2}>
            <FormControl sx={{ width: "40%" }}>
              <InputLabel>指導形態</InputLabel>
              <Select>
                <MenuItem value="対面">対面</MenuItem>
                <MenuItem value="オンライン">オンライン</MenuItem>
                <MenuItem value="">どちらでも</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* 時給 */}
          <Box marginBottom={2}>
            <Typography variant="subtitle2" >
              希望時給
              <Slider
                defaultValue={[1000, 2000]}
                valueLabelDisplay="auto"
                min={1000}
                max={10000}
                marks={[
                  { value: 1000, label: '1000' },
                  { value: 10000, label: '10000円以上' },
                ]}
              />
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">
            キャンセル
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            検索
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { SearchItem };

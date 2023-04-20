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
  DialogTitle,
  styled,
  SelectChangeEvent,
  SliderProps,
} from '@mui/material';
import { Box } from '@mui/system';
import Slide from '@mui/material/Slide';
import { SearchModalContext } from 'pages/_app';
import { Search } from '@mui/icons-material';
import { SearchTeachers } from 'pages/api/user';
import { User } from 'interfaces';

//バーのスタイル


  //「条件から絞る」のスタイル
  const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//検索アイコンのスタイル
const SearchIconWrapper = styled('div')`
  border-radius: 50%;
  background-color: teal;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-left: 8px;
`;


interface SearchComponentProps {
  setUsers: (users: User[]) => void;
  setTeachers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
}


const SearchItem: React.FC<SearchComponentProps> = ({setUsers,setTeachers,setLoading}) => {

//検索モーダル管理
  const { searchOpen, setSearchOpen } = useContext(SearchModalContext);
  const handleClose = () => {
    setSearchOpen(false);
  };

//フォーム管理
  const [university, setUniversity] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [gender,setGender] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [hourlyPay, setHourlyPay] = useState<number[]>([1000, 2000]);

  const handleUniversityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniversity(event.target.value);
  };

  const handleMajorChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleStyleChange = (event: SelectChangeEvent) => {
    setStyle(event.target.value as string);
  };

  const handleSliderChange: SliderProps['onChange'] = (event, newValue) => {
    setHourlyPay(newValue as number[]);
  };

  const handleSearch=async()=>{
    setLoading(true)
    try{
      const res = await SearchTeachers({
        university:university,
        major:major,
        gender: gender,
        style: style,
        hourlyPay: hourlyPay
      })
      setUsers(res.data)
      setTeachers(res.data.filter((user:User)=>user.teacherProfile))
    }catch(error){
      console.log(error)
    }
    setLoading(false)
    handleClose()
  }


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
        <StyledDialogTitle variant="subtitle1">
            条件から絞る
        <SearchIconWrapper>
          <Search sx={{color: "white"}}/>
        </SearchIconWrapper>
      </StyledDialogTitle>
        <DialogContent sx={{padding:7}}>

          {/* university */}
          <Box marginBottom={2}>
            <FormControl fullWidth>
              <TextField label="大学名" onChange={handleUniversityChange} />
            </FormControl>
          </Box>

          {/* major */}
          <Box marginBottom={2}>
            <FormControl sx={{ width: "40%"}}>
              <InputLabel>文理選択</InputLabel>
              <Select onChange={handleMajorChange} value={major}>
                <MenuItem value="理系">理系</MenuItem>
                <MenuItem value="文系">文系</MenuItem>
                <MenuItem value="">どちらでも</MenuItem>
              </Select>
            </FormControl>
         </Box>
          {/* gender */}
          <Box marginBottom={2}>
            <FormControl sx={{ width: "40%" }}>
              <InputLabel>性別</InputLabel>
              <Select onChange={handleGenderChange} value={gender}>
                <MenuItem value="男性">男性</MenuItem>
                <MenuItem value="女性">女性</MenuItem>
                <MenuItem value="">どちらでも</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* style */}
         <Box marginBottom={2}>
            <FormControl sx={{ width: "40%" }}>
              <InputLabel>指導形態</InputLabel>
              <Select onChange={handleStyleChange} value={style}>
                <MenuItem value="対面">対面</MenuItem>
                <MenuItem value="オンライン">オンライン</MenuItem>
                <MenuItem value="">どちらでも</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* hourlyPay */}
          <Box marginBottom={2}>
            <Typography variant="subtitle2" >
              希望時給
                <Slider
                    defaultValue={[1000, 2000]}
                    onChange={handleSliderChange}
                    value={hourlyPay}
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
          <Button onClick={handleClose} color="error">
            キャンセル
          </Button>
          <Button
                onClick={handleSearch}
                variant="contained"
                sx={{
                    backgroundColor: 'teal',
                    boxShadow: 'none',
                    borderRadius: 30,
                    padding: 1.8,
                    '&:hover': {
                        backgroundColor: 'teal',
                        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.15)',
                    },
                }}
                >
                <Search sx={{ marginRight: 0.2 }} />
                    検索
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { SearchItem };

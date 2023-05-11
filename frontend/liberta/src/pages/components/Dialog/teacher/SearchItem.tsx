import React, { useRef, useState } from 'react';
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
  SelectChangeEvent,
  styled,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { SearchModalContext } from 'pages/_app'
import  { useContext } from 'react'
import Slide from '@mui/material/Slide';
import { Search } from '@mui/icons-material';
import { SearchStudents } from 'pages/api/user';
import { SearchStudentsParams, User } from 'interfaces';

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
  setLoading: (loading: boolean) => void;
}


const SearchItem:React.FC<SearchComponentProps> = ({setUsers,setLoading}) => {

  //検索モーダル開け閉め
    const {searchOpen,setSearchOpen} = useContext(SearchModalContext)
    const handleClose=()=>{
      setSearchOpen(false)
  }

    //検索状態管理
    const {searchState,setSearchState} = useContext(SearchModalContext)
    const {searchStudentTerm,setSearchStudentTerm} = useContext(SearchModalContext)


  //フォーム管理state
  const [grade,setGrade] = useState<string>("")
  const [major,setMajor] = useState<string>("")
  const [desiredSchool,setdesiredSchool] = useState<string>("")
  const [duration,setDuration] = useState<string>("")
  const [style,setStyle] = useState<string>("")
  const [frequency,setFrequency] = useState<string>("")


  //フォーム管理
  const handleGradeChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value as string);
  };

  const handleMajorChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };

  const handleDurationChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value as string);
  };

  const handleStyleChange = (event: SelectChangeEvent) => {
    setStyle(event.target.value as string);
  };

  const handleFrequencyChange = (event: SelectChangeEvent) => {
    setFrequency(event.target.value as string);
  };


  const handledesiredSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdesiredSchool(event.target.value);
  };

//検索処理
  const handleSearch = async() => {
      handleClose();
      setSearchStudentTerm({
        grade: grade,
        major: major,
        desiredSchool: desiredSchool,
        duration: duration,
        style: style,
        frequency: frequency,
      })
      setSearchState(true)
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
        <DialogContent>
        {/* grade */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
            <InputLabel>学年</InputLabel>
            <Select onChange={handleGradeChange} value={grade}>
                <MenuItem value="">なし</MenuItem>
                <MenuItem value="中学1年生">中学1年生</MenuItem>
                <MenuItem value="中学2年生">中学2年生</MenuItem>
                <MenuItem value="中学3年生">中学3年生</MenuItem>
                <MenuItem value="高校1年生">高校1年生</MenuItem>
                <MenuItem value="高校2年生">高校2年生</MenuItem>
                <MenuItem value="高校3年生">高校3年生</MenuItem>
            </Select>
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
        

        {/* desired_university */}
        <Box mb={2} mt={2}>
            <FormControl fullWidth>
                <TextField label="志望校" onChange={handledesiredSchoolChange} />
            </FormControl>
        </Box>

        {/* duration */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
            <InputLabel>希望期間</InputLabel>
            <Select onChange={handleDurationChange} value={duration}>
                <MenuItem value="">なし</MenuItem>
                <MenuItem value="テスト期間のみ">テスト期間のみ</MenuItem>
                <MenuItem value="1日">1日</MenuItem>
                <MenuItem value="１週間">1週間</MenuItem>
                <MenuItem value="１ヶ月">1か月</MenuItem>
                <MenuItem value="１〜３ヶ月">１〜３ヶ月</MenuItem>
                <MenuItem value="３〜６ヶ月">３〜６ヶ月</MenuItem>
                <MenuItem value="一年以上">一年以上</MenuItem>
            </Select>
            </FormControl>
        </Box>
            {/* frequency */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
                <InputLabel>希望頻度</InputLabel>
                <Select onChange={handleFrequencyChange} value={frequency}>
                    <MenuItem value="">なし</MenuItem>
                    <MenuItem value="週1回">週1回</MenuItem>
                    <MenuItem value="週２回">週2回</MenuItem>
                    <MenuItem value="週３回">週3回</MenuItem>
                    <MenuItem value="週４回">週4回</MenuItem>
                    <MenuItem value="週５回">週5回</MenuItem>
                    <MenuItem value="週６回">週6回</MenuItem>
                    <MenuItem value="週７回">週7回</MenuItem>
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
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="error">キャンセル</Button>
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
  )
}

export { SearchItem };
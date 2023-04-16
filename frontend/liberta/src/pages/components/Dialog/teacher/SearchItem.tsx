import React, { useState } from 'react';
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
} from '@mui/material';
import { Box } from '@mui/system';
import { SearchModalContext } from 'pages/_app'
import  { useContext } from 'react'
import Slide from '@mui/material/Slide';



const SearchItem:React.FC = () => {

    const {searchOpen,setSearchOpen} = useContext(SearchModalContext)
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    const handleClose=()=>{
        setSearchOpen(false)
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedSubjects(event.target.value as string[]);
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
        <DialogContent>
        {/* 学年 */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
            <InputLabel>学年</InputLabel>
            <Select>
                <MenuItem value="">なし</MenuItem>
                <MenuItem value="middle_school_1">中学1年生</MenuItem>
                <MenuItem value="middle_school_2">中学2年生</MenuItem>
                <MenuItem value="middle_school_3">中学3年生</MenuItem>
                <MenuItem value="high_school_1">高校1年生</MenuItem>
                <MenuItem value="high_school_2">高校2年生</MenuItem>
                <MenuItem value="high_school_3">高校3年生</MenuItem>
            </Select>
            </FormControl>
        </Box>

        {/* 希望教科 */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
            <InputLabel>希望教科（複数選択可能）</InputLabel>
            <Select
            multiple
            value={selectedSubjects}
            onChange={handleChange}
            renderValue={(selected) => (selected as string[]).join(', ')}
            >
                <MenuItem value="数学">数学</MenuItem>
                <MenuItem value="英語">英語</MenuItem>
                <MenuItem value="国語">国語</MenuItem>
                <MenuItem value="物理">物理</MenuItem>
                <MenuItem value="化学">化学</MenuItem>
                <MenuItem value="生物">生物</MenuItem>
                <MenuItem value="世界史">世界史</MenuItem>
                <MenuItem value="日本史">日本史</MenuItem>
                <MenuItem value="地理">地理</MenuItem>
            </Select>
            </FormControl>
        </Box>

        {/* 希望期間 */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
            <InputLabel>希望期間</InputLabel>
            <Select>
                <MenuItem value="">なし</MenuItem>
                <MenuItem value="test_period">テスト期間</MenuItem>
                <MenuItem value="few_hours">数時間</MenuItem>
                <MenuItem value="one_day">1日</MenuItem>
                <MenuItem value="one_week">1週間</MenuItem>
                <MenuItem value="one_month">1か月以上</MenuItem>
            </Select>
            </FormControl>
        </Box>
            {/* 希望頻度 */}
        <Box marginBottom={2}>
            <FormControl fullWidth>
                <InputLabel>希望頻度</InputLabel>
                <Select>
                    <MenuItem value="">なし</MenuItem>
                    <MenuItem value={1}>週1</MenuItem>
                    <MenuItem value={2}>週2</MenuItem>
                    <MenuItem value={3}>週3</MenuItem>
                    <MenuItem value={4}>週4</MenuItem>
                    <MenuItem value={5}>週5</MenuItem>
                    <MenuItem value={6}>週6</MenuItem>
                    <MenuItem value={7}>週7</MenuItem>
                </Select>
            </FormControl>
        </Box>

        {/* 偏差値 */}
        <Box marginBottom={2}>
            <Typography>
                偏差値 <Button onClick={() => {}}>解除</Button>
            </Typography>
            <Slider
            defaultValue={[20, 100]}
            valueLabelDisplay="auto"
            min={20}
            max={100}
            marks={[
                { value: 20, label: '20' },
                { value: 100, label: '100' },
            ]}
            />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">キャンセル</Button>
          <Button onClick={handleClose} color="primary" variant="contained">検索</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
}

export { SearchItem };
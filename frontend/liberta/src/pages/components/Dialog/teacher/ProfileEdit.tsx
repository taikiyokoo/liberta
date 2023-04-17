import {  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Slider,
  SelectChangeEvent,
  DialogActions,
  Button,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { AuthContext, UserEditModalContext } from 'pages/_app'
import React, { useContext, useState } from 'react'
import Slide from '@mui/material/Slide';
import { AccountCircle } from '@mui/icons-material';


const ProfileEdit:React.FC = () => {

    const {currentUser} = useContext(AuthContext)
    const {userEditOpen,setUserEditOpen} = useContext(UserEditModalContext)

    //教科の値を管理する
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const handleSubjectsChange = (event: SelectChangeEvent<string[]>) => {
      setSelectedSubjects(event.target.value as string[]);
    };

    //フォームの値を管理する
    const [name,setName] = useState<string>(currentUser?.name? currentUser.name : '')
    const [email,setEmail] = useState<string>(currentUser?.email? currentUser.email : '')

    const handleSubmit = () => {


    }


    const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });


  return (
    <Dialog 
    open={userEditOpen} 
    onClose={()=> setUserEditOpen(false)}
    maxWidth= "sm"
    fullWidth
    TransitionComponent={Slide}
    transitionDuration={{ enter: 500, exit: 500 }}
    >
     <DialogTitle variant="subtitle1">
      <Box display="flex" alignItems="center">
        アカウント編集
        <AccountCircle sx={{ marginLeft: 1 }} />
      </Box>
    </DialogTitle>
      <DialogContent>
        <Box marginBottom={2} marginTop={2}>
          <TextField fullWidth label="名前" value={name} />
        </Box>
        <Box marginBottom={2}>
          <TextField fullWidth label="メールアドレス" value={email} />
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>指導可能科目</InputLabel>
            <Select
              multiple
              value={selectedSubjects}
              onChange={handleSubjectsChange}
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
        <Box marginBottom={2}>
          <Typography>希望時給</Typography>
          <Slider
            defaultValue={500}
            valueLabelDisplay="auto"
            min={500}
            max={20000}
            marks={[
              { value: 500, label: '500' },
              { value: 20000, label: '20000' },
            ]}
          />
      </Box>
      <Box marginBottom={2}>
        <TextField
          fullWidth
          label="自己紹介文"
          multiline
          rows={4}
          variant="outlined"
        />
      </Box>
    </DialogContent>
    <DialogActions>
        <Button onClick={()=> setUserEditOpen(false)}>キャンセル</Button>
        <Button onClick={handleSubmit}>更新</Button>
      </DialogActions>
  </Dialog>
  )
}
export  {ProfileEdit}

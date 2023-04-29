import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  SelectChangeEvent,
  Slide,
  Box,
} from '@mui/material';
import { UserEditModalContext } from 'pages/_app';
import { TransitionProps } from '@mui/material/transitions';
import { AccountCircle } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ProfileEdit: React.FC = () => {

const {userEditOpen,setUserEditOpen} =  useContext(UserEditModalContext)
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [desiredSubjects, setDesiredSubjects] = useState<string[]>([]);
const [desiredDuration, setDesiredDuration] = useState('');
const [desiredFrequency, setDesiredFrequency] = useState(1);
const [introduction, setIntroduction] = useState('');

  const subjects = ['数学', '英語', '国語', '理科', '社会'];
  const durations = [
    'テスト期間',
    '数時間',
    '一日',
    '１週間',
    '２週間',
    '１か月以上',
  ];

  const handleSubjectsChange = (event:  SelectChangeEvent<string[]>) => {
    setDesiredSubjects(event.target.value as string[]);
  };

  const handleSubmit = () => {
    // ここでデータを送信・更新します

  };

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
          <AccountCircle sx={{ marginLeft: 1 }} color ="primary" />
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="名前"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="メールアドレス"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>希望科目</InputLabel>
          <Select
            multiple
            value={desiredSubjects}
            onChange={handleSubjectsChange}
            renderValue={(selected) => (
              <div>
                {(selected as string[]).map((subject) => (
                  <Chip key={subject} label={subject} />
                ))}
              </div>
            )}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>希望期間</InputLabel>
          <Select
            value={desiredDuration}
            onChange={(e) => setDesiredDuration(e.target.value as string)}
          >
            {durations.map((duration) => (
              <MenuItem key={duration} value={duration}>
                {duration}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>希望頻度（週）</InputLabel>
          <Select
            value={desiredFrequency}
            onChange={(e) => setDesiredFrequency(e.target.value as number)}
          >
            {[...Array(7)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="自己紹介文"
          fullWidth
          multiline
          rows={4}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=> setUserEditOpen(false)}>キャンセル</Button>
        <Button onClick={handleSubmit}>更新</Button>
      </DialogActions>
    </Dialog>
  );
};

export { ProfileEdit } ;

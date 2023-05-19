
import { makeStyles } from '@material-ui/styles';
import { ArrowBack, Close, ThumbUp } from '@mui/icons-material';
import { Box, Typography, Avatar, Chip, Button, Theme, styled, useTheme, useMediaQuery, Dialog, Slide, Badge, Card, CardHeader, CardContent, Divider, Paper } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { CreateLikeParams, CreateReserveParams, RequestConfirm, User } from 'interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { createLike } from 'pages/api/like';
import { confirmLiked, getUser } from 'pages/api/user';
import { AuthContext } from 'pages/_app';
import React, { useContext, useEffect, useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateTimePicker } from '@mui/x-date-pickers';
import theme from 'theme';
import { createReserve, getReserveStatus } from 'pages/api/reserve';
import { set } from 'react-hook-form';



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface TeacherDetailProps {
    user: User;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const LikeButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    border: '1px solid teal',
    color: 'teal',
    borderRadius: '8px',
    padding: '6px 16px',
    textTransform: 'uppercase',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    letterSpacing: '0.5px',
    marginTop: 30,
    '&:hover': {
      backgroundColor: 'teal',
      color: 'white',
      boxShadow: '0 6px 10px rgba(50, 50, 93, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s',
  }));


  const LikedButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'teal',
    color: 'white',
    marginTop: 30,
    '&:hover': {
      backgroundColor: 'teal',
      color: 'white',
    },
  }));



  const TeacherDetail: React.FC<TeacherDetailProps> = ({ user,open,setOpen }) => {

    const router = useRouter();

    const { currentUser } = useContext(AuthContext)

    const [like, setLike] = useState(false);

    const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    const [requested, setRequested] = useState(false);

    const [requestCheck,setRequestCheck] = useState<RequestConfirm>();

  //uesEffectでいいねの状態を確認する
    const handleConfirmLiked = async() => {
      if(currentUser){
        try{
          const res = await confirmLiked(currentUser.id,user.id)
          const isLiked = res.data
          setLike(isLiked)
        }catch(error){
          console.log(error)
        }
      }
    }

  //予約状態を確認する
    const handleConfirmReserve = async() => {
      if(currentUser){
        try{
          const res = await getReserveStatus(currentUser.id,user.id)
          const isReserved = res.data.isRequest
          setRequested(isReserved)
          if(isReserved){
            setRequestCheck({
              startTime: res.data.show.startTime,
              endTime: res.data.show.endTime,
              fee: res.data.show.fee
          })
          }
        }catch(error){
          console.log(error)
        }
      }
    }


    useEffect(() =>{
      if(!open) return;
      handleConfirmLiked()
      handleConfirmReserve()
    },[open])

    //いいねボタンを押した時の処理
    const handleLikeClick = async() => {

      if(currentUser && !like){
        const params:CreateLikeParams = {
          liked_id: user.id,
          liker_id: currentUser.id
        }
        setLike(true)
      try{
        const res = await createLike(params)

      }catch(error){
        console.log(error)
      }

      }else{
        console.log("失敗")
        return;
      }
    }

    //予約ボタンを押した時の処理
    const handleRequest = async() => {
      if(!currentUser || !startTime || !endTime) return;
      const fee = user.teacherProfile.hourlyPay * endTime.diff(startTime, 'hour')
      if(fee === 0) return;

      const params:CreateReserveParams = {
        teacher_id: user.id,
        student_id: currentUser.id,
        start_time: startTime.format(),
        end_time: endTime.format() ,
        fee: fee,
        status:  0
      }
      try{
        const res = await createReserve(params)
        setRequested(true)
        setRequestCheck({
          startTime: startTime.format(),
          endTime: endTime.format(),
          fee: fee
        })

      }catch(error){
        console.log(error)
      }
    }


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={()=> setOpen(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            TransitionComponent={Transition}
        >
        <Box sx={{ padding: '16px' }}>
            <Button color="primary" startIcon={ <Close />} sx={{marginBottom: 5}} onClick={() => setOpen(false)}>閉じる</Button>
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '16px',
                flexDirection: {
                xs: 'column', // xs では縦並び
                md: 'row', // sm 以上では横並び
                },
            }}
            >
            <Avatar
                src="/images/dog.jpg"
                sx={{
                width: 250,
                height: 250,
                marginRight: {
                    xs: 0, // xs の場合、marginRight を 0 に設定
                    md: 50, // sm 以上の場合、marginRight を 50 に設定
                },
                }}
            />
            <Box sx={{mt: {xs: 5,md: 0}}}>
                <Typography variant="h4" gutterBottom>{user.name}</Typography>
                <Typography variant="subtitle1">年齢: {user.teacherProfile.age}</Typography>
                <Typography variant="subtitle1">大学名: {user.teacherProfile.university}</Typography>
                <Typography variant="subtitle1">学部名: 理学部</Typography>
                <Typography variant="subtitle1">専攻: 理系</Typography>

                {like ? (
                <LikedButton
                startIcon={<ThumbUp />}
                onClick ={handleLikeClick}
                >
                    いいね済み
                </LikedButton>
                ) : (
                <LikeButton
                    startIcon={<ThumbUp />}
                    onClick ={handleLikeClick}
                >
                    いいね！
                </LikeButton>
                )}
            </Box>
        </Box>
          <Box sx={{ marginTop: '24px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
            <Typography variant="h5" gutterBottom>指導可能科目</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {user.teacherProfile.subjects.map((subject) => (
                <Chip label={subject}  key={subject}/>
                ))}
            </Box>
            </Box>
            <Box sx={{ marginTop: '24px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
            <Typography variant="h5" gutterBottom>指導形態</Typography>
            <Typography>オンライン</Typography>
            </Box>
            <Box sx={{ marginTop: '24px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
              <Typography variant="h5" gutterBottom>自己紹介</Typography>
              <Typography>{user.teacherProfile.introduction}</Typography>
            </Box>
            <Box sx={{ marginTop: '24px',marginBottom: 10 }}>
              <Typography variant="h5" gutterBottom>指導予約 <Chip label={`${user.teacherProfile.hourlyPay} 円 / 時間`} /></Typography>
              {!requested?<Box
                display="flex" 
                justifyContent="center"
                alignItems="center"
                sx={{
                  flexDirection: {
                  xs: 'column', // xs では縦並び
                  md: 'row', // sm 以上では横並び
                  }}}
                  mt={10}
                >
              <Box 
              component={Paper} 
              p={5} 
              mt={{xs:5,md: 0}} 
              sx={{borderRadius: 5,
              color: theme.palette.text.secondary, 
              boxShadow: '1px 3px 1px rgba(0,0,0,0.1), 1px 2px 2px rgba(0,0,0,0.06), 0 1px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.5s cubic-bezier(.25,.8,.25,1)',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
              }
              }}>
                <Typography  mb={1} textAlign="center" sx={{fontSize: '1.15rem'}}>指導可能日</Typography>
                <Divider />
                <Typography variant="subtitle1" mt={2}>日曜日： 17:00〜20:00</Typography>
                <Typography variant='subtitle1'>月曜日： 不可</Typography>
                <Typography variant='subtitle1'>火曜日： 17:00〜20:00</Typography>
                <Typography variant='subtitle1'>水曜日： 17:00〜20:00</Typography>
                <Typography variant='subtitle1'>木曜日： 17:00〜20:00</Typography>
                <Typography variant='subtitle1'>金曜日： 17:00〜20:00</Typography>
                <Typography variant='subtitle1'>土曜日： 不可</Typography>
              </Box>
                <Box 
                  component={Paper} 
                  p={5} 
                  sx={{
                    marginLeft: {xs: 0,md:15},
                    mt: {xs: 8,md: 0},
                    borderRadius: 5,
                    color: theme.palette.text.secondary, 
                    boxShadow: '1px 3px 1px rgba(0,0,0,0.1), 1px 2px 2px rgba(0,0,0,0.06), 0 1px 5px rgba(0,0,0,0.05)',
                    transition: 'all 0.5s cubic-bezier(.25,.8,.25,1)',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
                    }
                  }}>
                <Typography  mb={1} textAlign="center" sx={{fontSize: '1.15rem'}}>日時入力</Typography>
                <Divider />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box mt={4}>
                        <DateTimePicker
                          label="開始時間"
                          value={startTime}
                          onChange={(newValue) => setStartTime(newValue)}
                        />
                    </Box>
                    <Box mt={5}>
                      <DateTimePicker
                        label="終了時間"
                        value={startTime}
                        onChange={(newValue) => setEndTime(newValue)}
                      />
                    </Box>
                  </LocalizationProvider>
                </Box>
                <Box 
                  component={Paper}
                  py={3} 
                  px={{xs:6,md: 8}} 
                  sx={{marginLeft: {xs: 0,md:15},
                  mt: {xs: 8,md: 0},
                  borderRadius: 5,
                  color: theme.palette.text.secondary, 
                  boxShadow: '1px 3px 1px rgba(0,0,0,0.1), 1px 2px 2px rgba(0,0,0,0.06), 0 1px 5px rgba(0,0,0,0.05)',
                  transition: 'all 0.5s cubic-bezier(.25,.8,.25,1)',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
                  }
                }}>
                  <Typography  mb={1} textAlign="center" sx={{fontSize: '1.15rem'}}>予約内容確認</Typography>
                    <Divider />
                        <Typography variant="subtitle1" mt={3} mb={1} >開始時間</Typography>
                        <Typography variant='h6' mb={3}> {dayjs(startTime).format('YYYY年MM月DD日 HH:mm')}</Typography>
                        <Divider />
                      <Typography variant="subtitle1" mt={3} mb={1} >終了時間</Typography>
                      <Typography variant='h6' mb={3}> {dayjs(endTime).format('YYYY年MM月DD日 HH:mm')}</Typography>
                      <Divider />
                      <Typography variant="subtitle1" mt={3} mb={1} >料金</Typography>
                      <Typography variant='subtitle2' display="inline">{endTime &&`${user.teacherProfile.hourlyPay} 円 × ${endTime.diff(startTime, 'hour')} 時間 =`} </Typography><Typography  display="inline" ml={3} variant="h6">{endTime&&user.teacherProfile.hourlyPay * endTime.diff(startTime, 'hour')}円</Typography>
                      <Divider sx={{mt:3}} />
                      <Button variant="contained"  color="primary" sx={{mt: 5,borderRadius: '9999px',padding: 2,fontSize: '1.1rem' }} fullWidth onClick={handleRequest}>
                        予約申請をする
                      </Button>
                </Box>
              </Box> : 
              <>
                <Box 
                  component={Paper} 
                  py={3} 
                  textAlign="center"
                  px={{xs:6,md: 8}} 
                  sx={{mt: {xs: 8,md: 10},
                    borderRadius: 5,
                    color: theme.palette.text.secondary, 
                    boxShadow: '1px 3px 1px rgba(0,0,0,0.1), 1px 2px 2px rgba(0,0,0,0.06), 0 1px 5px rgba(0,0,0,0.05)',
                    transition: 'all 0.5s cubic-bezier(.25,.8,.25,1)',
                    maxWidth: 600,mx: "auto",
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
                    }
                  }} 
                >
                  <Typography  mb={1} textAlign="center" sx={{fontSize: '1.15rem'}}>予約内容確認</Typography>
                  <Divider />
                  <Typography variant="subtitle1" mt={3} mb={1} >開始時間</Typography>
                  <Typography variant='h6' mb={3}>
                    {dayjs(requestCheck?.startTime).format('YYYY年MM月DD日 HH:mm')}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1" mt={3} mb={1} >終了時間</Typography>
                  <Typography variant='h6' mb={3}>
                    {dayjs(requestCheck?.endTime).format('YYYY年MM月DD日 HH:mm')}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1" mt={3} mb={1} >料金</Typography>
                  <Typography variant='subtitle2' display="inline"></Typography><Typography  display="inline" ml={3} variant="h6">{requestCheck?.fee}円</Typography>
                  <Divider sx={{mt:3}} />
                  <Button variant="contained"  color="primary" sx={{mt: 5,borderRadius: '9999px',padding: 2,fontSize: '1.1rem' }} fullWidth>
                    上記の内容で予約申請中
                  </Button>
                </Box>
              </>}
            </Box>
          </Box>
        </Dialog>
    );


  }

  export default TeacherDetail;
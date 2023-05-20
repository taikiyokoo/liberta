import { Box, makeStyles, styled } from '@material-ui/core'
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, LinearProgress, Typography, useMediaQuery, useTheme } from '@mui/material'
import { User } from 'interfaces'
import { useRouter } from 'next/router'
import Detail from 'pages/components/Dialog/teacher/Detail'
import React from 'react'

const useStyles =makeStyles((theme) => ({
  card :{
    width:300,
    height:550,
    padding:30,
    borderRadius: '20px !important',
    transition: 'box-shadow 0.3s,transform 0.3s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 30px 50px -15px rgba(0,0,0,0.3), 0px 0px 0px 3px rgba(0,0,0,0.05)',
      transform: 'translateY(-5px) scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
      width:260,
      height:500,
      padding:25,
      '&:hover': {
        transform: "none"
      },
    },
  },
  slideChips: {
    display: 'flex',
    overflowX: 'hidden',
    position: 'relative',
    height: 100,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(to right, ${theme.palette.background.paper}00, ${theme.palette.background.paper} 30%, ${theme.palette.background.paper} 70%, ${theme.palette.background.paper}00)`,
      pointerEvents: 'none',
    },
  },
  chipGroup: {
    display: 'flex',
    animation: `$slide 10s linear infinite`,
  },
  progress: {
    height: 6,
    width: 250,
    borderRadius: 3,
  },
  '@keyframes slide': {
    from: {
      transform: 'translateX(0)',
    },
    to: {
      transform: 'translateX(-100%)',
    },
  },
  }));
  
  //チップの大きさを変更する
  const CustomChip = styled(Chip)({
    width: '10',
    height: '5',
  });


const TeacherCard: React.FC<{user:User}>= ({user}) => {
  
const classes = useStyles()
const router = useRouter()
 //レスポンシブ対応用
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

const chips = (
  <>
    {user.teacherProfile.subjects.map((subject) => {
      return <Chip label={subject} color="primary" variant="outlined" sx={{ marginRight: 1 }} key={subject}/>;
    })}
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.gender} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.style} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.major} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.university} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={`時給${user.teacherProfile.hourlyPay}円`} />
  </>
);

const [open,setOpen] = React.useState(false)


  return (
    <div>
      <Card className ={classes.card} onClick={()=> setOpen(true)} >
        <Box>
        <CardHeader
        titleTypographyProps={{ style: { marginBottom: 4} }}
        avatar={
          <Avatar src="/images/dog.jpg" aria-label="recipe" />
        }
        title={
        <>
          <Typography variant="subtitle1" sx={{display: 'inline-block',marginRight: 1}}>{user.name}</Typography>
          {<>
          {user.teacherProfile.major ==="理系"&&<CustomChip sx={{marginLeft: 1}} label={user.teacherProfile.major} color="primary" variant="outlined"></CustomChip>}
          {user.teacherProfile.major ==="文系"&&<CustomChip sx={{marginLeft: 1}} label={user.teacherProfile.major} color="secondary" variant="outlined"></CustomChip>}
          </>
          }
        </>
        }
        subheader={user.teacherProfile?.university}
      />
          {isMobile?
              <CardContent sx={{height: 250}}>
                <Typography variant="subtitle2" sx={{fontSize: '0.9em'}}>{user.teacherProfile.introduction}</Typography>
              </CardContent>
              : 
              <CardContent sx={{height: 300}}>
                <Typography variant="subtitle2" sx={{fontSize: '0.9em'}}>{user.teacherProfile.introduction}</Typography>
              </CardContent>
            }
          <Box>
            <Typography variant="subtitle2" gutterBottom color="textSecondary">
                希望時給: {user.teacherProfile.hourlyPay} 円
            </Typography>
            <LinearProgress
                className={classes.progress}
                variant="determinate"
                value={(user.teacherProfile.hourlyPay / 10000) * 100}
              />
          </Box>
          <CardActions className={classes.slideChips}>
          <Box className={classes.chipGroup}>{chips}</Box>
          <Box className={classes.chipGroup}>{chips}</Box>
        </CardActions>
        </Box>
      </Card>
      <Detail open={open} setOpen={setOpen} user={user}/>
    </div>
  )
}

export default TeacherCard

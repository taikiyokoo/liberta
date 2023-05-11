import { Box,makeStyles, useTheme } from '@material-ui/core'
import { Avatar,Card, CardActions, CardContent, CardHeader, Chip,styled, Typography, useMediaQuery } from '@mui/material'
import { User } from 'interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Detail from 'pages/components/Dialog/student/Detail'
import React from 'react'

const useStyles =makeStyles((theme) => ({
link: {
  textDecoration: 'none',
},
card :{
  width:300,
  height:500,
  padding:30,
  transition: 'box-shadow 0.3s,transform 0.3s',
  cursor: 'pointer',
  borderRadius: '20px !important',
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



const StudentCard: React.FC<{user:User}>= ({user}) => {

  //レスポンシブ対応用
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
const router = useRouter()
const classes = useStyles()

const chips = (
  <>
    {user.studentProfile.subjects.map((subject) => {
      return <Chip label={subject} color="primary" variant="outlined" sx={{ marginRight: 1 }} />;
    })}
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.studentProfile.frequency} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.studentProfile.duration} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.studentProfile.grade} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.studentProfile.style} />
  </>
);

const [open, setOpen] = React.useState(false);

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
                {user.studentProfile.major ==="理系"&&<CustomChip sx={{marginLeft: 1}} label={user.studentProfile.major} color="primary" variant="outlined"></CustomChip>}
                {user.studentProfile.major ==="文系"&&<CustomChip sx={{marginLeft: 1}} label={user.studentProfile.major} color="secondary" variant="outlined" ></CustomChip>}
                </>
                }
              </>
              }
            subheader={user.studentProfile?.school}
          />
              <CardContent sx={{height: 300}}>
                <Typography variant="caption">{user.studentProfile.introduction}</Typography>
              </CardContent>
              <CardActions className={classes.slideChips}>
              <Box className={classes.chipGroup}>{chips}</Box>
              <Box className={classes.chipGroup}>{chips}</Box>
            </CardActions>
            </Box>
          </Card>
          <Detail user={user} open={open} setOpen={setOpen}/>
    </div>
  )
}

export default StudentCard

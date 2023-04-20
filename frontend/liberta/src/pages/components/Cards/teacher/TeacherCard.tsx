import { Box, makeStyles, styled } from '@material-ui/core'
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import { User } from 'interfaces'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles =makeStyles((theme) => ({
  card :{
    width:300,
    height:450,
    padding:20,
    transition: 'box-shadow 0.3s,transform 0.3s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 30px 50px -15px rgba(0,0,0,0.3), 0px 0px 0px 3px rgba(0,0,0,0.05)',
      transform: 'translateY(-5px) scale(1.05)',
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
    width: '55px',
    height: '25px',
    fontSize: '5px',
  });


const TeacherCard: React.FC<{user:User}>= ({user}) => {
  
const classes = useStyles()
const router = useRouter()

const chips = (
  <>
    {user.teacherProfile.subjects.map((subject) => {
      return <Chip label={subject} color="primary" variant="outlined" sx={{ marginRight: 1 }} />;
    })}
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.gender} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.style} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.major} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={user.teacherProfile.university} />
    <Chip color="primary" variant="outlined" sx={{ marginRight: 1 }}  label={`時給${user.teacherProfile.hourlyPay}円`} />
  </>
);


  return (
    <div>
      <Card className ={classes.card} onClick={()=> router.push(`/teacher/${user.id}`)} >
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
          {user.teacherProfile.major ==="理系"&&<Chip sx={{marginLeft: 1}} label={user.teacherProfile.major} color="primary" variant="outlined"></Chip>}
          {user.teacherProfile.major ==="文系"&&<Chip sx={{marginLeft: 1}} label={user.teacherProfile.major} color="secondary" variant="outlined"></Chip>}
          </>
          }
        </>
        }
        subheader={user.teacherProfile?.university}
      />
          <CardContent sx={{height: 280}}>
            <Typography variant="caption">{user.teacherProfile.introduction}</Typography>
          </CardContent>
          <CardActions className={classes.slideChips}>
          <Box className={classes.chipGroup}>{chips}</Box>
          <Box className={classes.chipGroup}>{chips}</Box>
        </CardActions>
        </Box>
      </Card>
    </div>
  )
}

export default TeacherCard

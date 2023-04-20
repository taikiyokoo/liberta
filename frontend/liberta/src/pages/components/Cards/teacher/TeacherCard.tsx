import { Box, makeStyles } from '@material-ui/core'
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Grid, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { User } from 'interfaces'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles({
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
})


const TeacherCard: React.FC<{user:User}>= ({user}) => {
  
const classes = useStyles()
const router = useRouter()

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
          <CardActions sx={{justifyContent: 'center'}}>
            {user.teacherProfile?.subjects.map((subject)=>{
              return (
                    <Chip label={subject} variant="outlined" color="success" sx={{marginRight: 1}} />
              )
            }) }
            <Chip label={user.teacherProfile.style}/>
            <Chip label={`${user.teacherProfile.hourlyPay}円`} />
        </CardActions>
        </Box>
      </Card>
    </div>
  )
}

export default TeacherCard

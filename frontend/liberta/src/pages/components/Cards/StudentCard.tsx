import { Box,makeStyles } from '@material-ui/core'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, LinearProgress, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { User } from 'interfaces'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles({
card :{
  width:250,
  height:250,
  padding:10,
  transition: 'box-shadow 0.3s,transform 0.3s',
  '&:hover': {
    boxShadow: '0px 30px 50px -15px rgba(0,0,0,0.3), 0px 0px 0px 3px rgba(0,0,0,0.05)',
    transform: 'translateY(-5px) scale(1.05)',
  },
},
})


const StudentCard: React.FC<{user:User}>= ({user}) => {
  
const router = useRouter()
const classes = useStyles()

  return (
    <div>
      <Card className ={classes.card} onClick={()=> router.push(`/student/${user.id}`)} >
        <Box>
        <CardHeader
        avatar={
          <Avatar src="/images/dog.jpg" aria-label="recipe" />
        }
        title={user.name}
        subheader={user.studentProfile?.school}
      />
          <CardContent>
            <Typography variant="subtitle1">{user.studentProfile.school}</Typography>
            <Typography variant="subtitle2">{user.studentProfile.grade}</Typography>
          </CardContent>
        {user.studentProfile?.subjects.map((subject)=>{
          return (
                    <Chip label={subject} color="info" />
          )
        })
      }
        </Box>
      </Card>
    </div>
  )
}

export default StudentCard

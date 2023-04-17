import { Box, makeStyles } from '@material-ui/core'
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Grid, IconButton, Typography } from '@mui/material'
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
        avatar={
          <Avatar src="/images/dog.jpg" aria-label="recipe" />
        }
        title={user.name}
        subheader={user.teacherProfile?.university}
      />
          <CardContent>
            <Typography variant="subtitle1">{user.teacherProfile.introduction}</Typography>
          </CardContent>
        {user.teacherProfile?.subjects.map((subject)=>{
          return (
                <Chip label={subject} variant="outlined" color="success" sx={{marginRight: 1}} />
          )
        }) }
        </Box>
      </Card>
    </div>
  )
}

export default TeacherCard

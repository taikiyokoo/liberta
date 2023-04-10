import { Box,makeStyles } from '@material-ui/core'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, LinearProgress, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { User } from 'interfaces'
import React from 'react'

const useStyles = makeStyles({
card :{
  width:200,
  height:300,
  padding:10,
  transition: 'box-shadow 0.3s,transform 0.3s',
  '&:hover': {
    boxShadow: '0px 30px 50px -15px rgba(0,0,0,0.3), 0px 0px 0px 3px rgba(0,0,0,0.05)',
    transform: 'translateY(-5px) scale(1.05)',
  },
},
})


const StudentCard: React.FC<{user:User}>= ({user}) => {
  
const classes = useStyles()

  return (
    <div>
      <Card className ={classes.card} >
        <Box>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name}
          </Avatar>
        }
        title={user.name}
        subheader={user.teacherProfile.university}
      />
          <CardContent>
            <Typography variant="subtitle1">{user.studentProfile.school}</Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Box>
      </Card>
    </div>
  )
}

export default StudentCard

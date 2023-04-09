import { Grid } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/StudentCard'
import TeacherCard from 'pages/components/Cards/TeacherCard'
import UserCard from 'pages/components/UserCard'
import { AuthContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home = () => {

  const [teachers,setTeachers] = useState<User[]>([])
  const {loading,setLoading} =useContext(AuthContext)

  const handleGetUsers = async () => {

    try{
      const res = await getUsers()
      const users:User[] = res.data
      users.forEach((user: User)=>{
        if(user.teacherProfile){
          setTeachers([...teachers, user])
        }
      })

    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {handleGetUsers()}, [])
  return (
    <div>
          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
            {teachers.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <StudentCard  user={user}/>
                </Grid>
              )
            })}
          </Grid>
    </div>
  )
}

export default Home

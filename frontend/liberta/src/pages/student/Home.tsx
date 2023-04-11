import { Container, Dialog, Grid, Modal } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/TeacherCard'
import UserEdit from 'pages/components/Dialog/UserEdit'
import { AuthContext, UserEditModalContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [teachers,setTeachers] = useState<User[]>([])
  const {loading,setLoading} =useContext(AuthContext)



  const handleGetUsers = async () => {

    try{
      const res = await getUsers()
      const users:User[] = res.data
      users.forEach((user: User)=>{
        if(user.teacherProfile){
          setTeachers((prevTeachers) => [...prevTeachers, user]);
        }
      })
    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {handleGetUsers()}, [])
  if(loading) return (<div>Loading...</div>)

  return (
    <div>
          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" >
            {teachers.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <TeacherCard  user={user} />
                </Grid>
              )
            })}
          </Grid>
      <UserEdit />
    </div>
  )
}

export default Home

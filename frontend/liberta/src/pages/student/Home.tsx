import { Chip, Container, Dialog, Grid, Modal } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/TeacherCard'
import UserEdit from 'pages/components/Dialog/UserEdit'
import SearchItem from 'pages/components/Search/SearchItem'
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
      <SearchItem />
      <Grid container spacing={5} justifyContent="center" sx={{mb:7}}>
        <Grid item>
          <Chip label="数学"/>
        </Grid>
        <Grid item>
          <Chip label="英語"/>
        </Grid>
        <Grid item>
          <Chip label="物理"/>
        </Grid>
        <Grid item>
          <Chip label="化学"/>
        </Grid>
        <Grid item>
          <Chip label="生物"/>
        </Grid>
        <Grid item>
          <Chip label="地学"/>
        </Grid>
        <Grid item>
          <Chip label="日本史"/>
        </Grid>
        <Grid item>
          <Chip label="世界史"/>
        </Grid>
        <Grid item>
          <Chip label="地理"/>
        </Grid>
      </Grid>

          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {teachers.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <TeacherCard key={user.id}  user={user} />
                </Grid>
              )
            })}
          </Grid>
      <UserEdit />
    </div>
  )
}

export default Home

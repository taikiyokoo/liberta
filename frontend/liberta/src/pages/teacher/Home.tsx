import { Chip, Grid } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/StudentCard'
import UserEdit from 'pages/components/Dialog/UserEdit'
import SearchItem from 'pages/components/Search/SearchItem'
import { AuthContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [students, setStudents] = useState<User[]>([])
  
  const {loading,setLoading} =useContext(AuthContext)

  const handleGetStudents = async () => {

    try{
      const res = await getUsers()
      const users:User[] = res.data
      console.log(users)
      users.forEach((user: User)=>{
        if(user.studentProfile){
          setStudents((prevStudents) => [...prevStudents, user]);
        }
      })
    }catch(err){
      console.log(err)
    }
    setLoading(false)
    console.log(students)
  }

  useEffect(() => {handleGetStudents()}, [])

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
            {students.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <StudentCard key={user.id} user={user}/>
                </Grid>
              )
            })}
          </Grid>
          <UserEdit />
    </div>
  )
}

export default Home

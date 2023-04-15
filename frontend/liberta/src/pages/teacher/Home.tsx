import { Chip, Grid } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/StudentCard'
import UserEdit from 'pages/components/Dialog/UserEdit'
import SearchItem from 'pages/components/Search/SearchBar'
import { AuthContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [students, setStudents] = useState<User[]>([])
  
  const {loading,setLoading} =useContext(AuthContext)

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

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
        <Grid container spacing={5} justifyContent="center" sx={{mb:7}}>
          {subjects.map((subject:string)=>{
            return(
              <Grid item key={subject}>
                <Chip label={subject}/>
              </Grid>
            )
          })}
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

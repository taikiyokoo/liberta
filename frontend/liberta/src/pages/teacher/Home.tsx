import { Grid } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/StudentCard'
import UserEdit from 'pages/components/Dialog/UserEdit'
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
          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
            {students.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <StudentCard  user={user}/>
                </Grid>
              )
            })}
          </Grid>
          <UserEdit />
    </div>
  )
}

export default Home

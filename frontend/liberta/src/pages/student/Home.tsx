import { Chip, Container, Dialog, Grid, Modal } from '@mui/material'
import { User } from 'interfaces'
import { GetServerSideProps } from 'next'
import { getUsers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/TeacherCard'
import UserEdit from 'pages/components/Dialog/UserEdit'
import { AuthContext, UserEditModalContext } from 'pages/_app'
import React, { ReactEventHandler, useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [teachers,setTeachers] = useState<User[]>([])
  const {loading,setLoading} =useContext(AuthContext)
  const [subjectSearch,setSubjectSearch] =useState<boolean>(false)
  const [selectedSubject,setSubject] = useState<string>("")

  //教科検索
  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  const handleSubjectSearch = (subject:string) => {
    setSubject(subject)
    setSubjectSearch(true)
  }


  const handleGetUsers = async () => {

      try{
        const res = await getUsers()
        const users:User[] = res.data
        const filteredUsers:User[] =[]

        if(subjectSearch){
          users.forEach((user: User)=>{
            if(user.teacherProfile){
                user.teacherProfile?.subjects.includes(selectedSubject)&&filteredUsers.push(user)
              }
            })
        }else{
          users.forEach((user: User)=>{
            if(user.teacherProfile){
            filteredUsers.push(user)
            }
          })
        }
        setTeachers(filteredUsers)
      }catch(err){
        console.log(err)
      }
    setLoading(false)
    console.log(teachers)
  }

  useEffect(() => {handleGetUsers()}, [subjectSearch,selectedSubject])


  if(loading) return (<div>Loading...</div>)

  return (
    <div>
      <Grid container spacing={5} justifyContent="center" sx={{mb:7}}>
        {subjects.map((subject:string)=>{
          return(
            <Grid item key={subject}>
              {selectedSubject===subject ? <Chip label={subject} color="success" onClick= {()=>handleSubjectSearch(subject)}/> : <Chip label={subject} variant="outlined" onClick= {()=>handleSubjectSearch(subject)}/>}
            </Grid>
          )
        })}
      </Grid>

          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {teachers.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <TeacherCard user={user} />
                </Grid>
              )
            })}
          </Grid>
      <UserEdit />
    </div>
  )
}

export default Home

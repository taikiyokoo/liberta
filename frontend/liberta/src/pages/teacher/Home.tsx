import { Chip, Grid } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/student/StudentCard'
import ProfileEdit from 'pages/components/Dialog/teacher/ProfileEdit'
import { AuthContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [students, setStudents] = useState<User[]>([])
  
  const {loading,setLoading} =useContext(AuthContext)

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate

    //フロントで教科で絞る
    const handleSubjectSearch = (subject:string) => {
      if(selectedSubjects.includes(subject)){
        const newSelectedSubjects = selectedSubjects.filter((selectedSubject)=>selectedSubject !== subject)
        if(newSelectedSubjects.length === 0){
          setStudents(users.filter((user:User)=>user.studentProfile))
          setSubject(newSelectedSubjects)
          return
        }
        let filteredUsers:User[] = []
        filteredUsers = users.filter((user:User)=>user.studentProfile)
        filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.some((newSelectedSubject)=>user.studentProfile?.subjects.includes(newSelectedSubject)))
        setSubject(newSelectedSubjects)
        setStudents(filteredUsers)
        return
      }
      let filteredUsers:User[] = []
      const newSelectedSubjects = selectedSubjects
      newSelectedSubjects.push(subject)
      filteredUsers = users.filter((user:User)=>user.studentProfile)
      filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.some((newSelectedSubject)=>user.studentProfile?.subjects.includes(newSelectedSubject)))
      setStudents(filteredUsers)
      setSubject(newSelectedSubjects)
    }

  const handleGetStudents = async () => {

    try{
        const res = await getUsers()
        const users:User[] = res.data
        setUsers(users)
        setStudents(users.filter((user:User)=>user.studentProfile))
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
                {selectedSubjects.includes(subject) ? <Chip label={subject} color="success" onClick= {()=>handleSubjectSearch(subject)}/> : <Chip label={subject} variant="outlined" onClick= {()=>handleSubjectSearch(subject)}/>}
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
          <ProfileEdit />
    </div>
  )
}

export default Home

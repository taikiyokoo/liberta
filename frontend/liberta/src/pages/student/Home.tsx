import { Chip, Container, Dialog, Grid, Modal, Skeleton } from '@mui/material'
import { User } from 'interfaces'
import { GetServerSideProps } from 'next'
import { getUsers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/teacher/TeacherCard'
import { SearchItem } from 'pages/components/Dialog/student/SearchItem'
import { AuthContext, HomeContext} from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [teachers,setTeachers] = useState<User[]>([])
  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate

  const {isHome,setIsHome} = useContext(HomeContext)

  const [loading,setLoading] = useState(true) //home用のloadingState skeltonを表示

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  //フロントで教科で絞る
  const handleSubjectSearch = (subject:string) => {
    if(selectedSubjects.includes(subject)){
      const newSelectedSubjects = selectedSubjects.filter((selectedSubject)=>selectedSubject !== subject)
      let filteredUsers:User[] = []
      filteredUsers = users.filter((user:User)=>user.teacherProfile)
      filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.teacherProfile?.subjects.includes(newSelectedSubject)))
      setSubject(newSelectedSubjects)
      setTeachers(filteredUsers)
      return
    }
    let filteredUsers:User[] = []
    const newSelectedSubjects = selectedSubjects
    newSelectedSubjects.push(subject)
    filteredUsers = users.filter((user:User)=>user.teacherProfile)
    filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.teacherProfile?.subjects.includes(newSelectedSubject)))
    setTeachers(filteredUsers)
    setSubject(newSelectedSubjects)
  }


  //マウント時に実行、全てのユーザーを取得して教師のみ格納
  const handleGetUsers = async () => {
      try{
        const res = await getUsers()
        const users:User[] = res.data
        setUsers(users)
        setTeachers(users.filter((user:User)=>user.teacherProfile))
      }catch(err){
        console.log(err)
      }
    setLoading(false)
  }

  useEffect(() => {handleGetUsers()}, [])

   //ホームにいることをcontextに通知
   useEffect(() => {
    setIsHome(true)
    return () => {
      setIsHome(false)
    }
  }, [])

  if(loading){
    const skeletonCount = 50;
    return (
      <div>
        <Skeleton  animation="wave" variant="text" sx={{ fontSize: 100,mb: 10 }} />
        <Grid container spacing={4}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Grid item key={index}>
              <Skeleton animation="wave" variant="rounded" width={250} height={300} />
            </Grid>
          ))}
        </Grid>
      </div>
  )
   }

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

          <Grid container sx={{width: "100%"}}  justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {teachers.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <TeacherCard user={user} />
                </Grid>
              )
            })}
          </Grid>
          <SearchItem />
    </div>
  )
}

export default Home

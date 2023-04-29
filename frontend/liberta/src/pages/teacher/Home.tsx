import { Box, Button, Chip, Grid, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/student/StudentCard'
import { SearchItem } from 'pages/components/Dialog/teacher/SearchItem'
import { HomeContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [loading,setLoading] =useState(true) //ホーム用のloadingState skeltonを表示

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [students, setStudents] = useState<User[]>([]) //生徒のみの情報

  const {isHome,setIsHome} = useContext(HomeContext) //ホームにいるかどうか

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate

  const [selectedTab, setSelectedTab] = useState(0); //タブ用のstate

//検索モーダルと共有するstate
  const [searchState,setSearchState] = useState<boolean>(false)
  const [grade,setGrade] = useState<string>("")
  const [major,setMajor] = useState<string>("")
  const [desiredSchool,setdesiredSchool] = useState<string>("")
  const [duration,setDuration] = useState<string>("")
  const [style,setStyle] = useState<string>("")
  const [frequency,setFrequency] = useState<string>("")
//ここまで

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
        filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.studentProfile?.subjects.includes(newSelectedSubject)))
        setSubject(newSelectedSubjects)
        setStudents(filteredUsers)
        return
      }
      let filteredUsers:User[] = []
      const newSelectedSubjects = selectedSubjects
      newSelectedSubjects.push(subject)
      filteredUsers = users.filter((user:User)=>user.studentProfile)
      filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.studentProfile?.subjects.includes(newSelectedSubject)))
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

  }

  useEffect(() => {handleGetStudents()}, [])

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{mb: 5}}
        width="100%"
        minWidth="80vw"
      >
          {searchState&&<Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2" color="teal">
              現在の検索条件:
            </Typography>
          </Grid>
          {grade&&<Grid item>
            <Chip label={grade} color="primary" variant='outlined'/>
          </Grid>}
          {major&&<Grid item>
            <Chip label={major} color="primary" variant='outlined'/>
          </Grid>}
          {desiredSchool&&<Grid item>
            <Chip label={desiredSchool} color="primary" variant='outlined'/>
          </Grid>}
          {style&&<Grid item>
            <Chip label={style} color="primary" variant='outlined'/>
          </Grid>}
          {duration&&<Grid item>
            <Chip label={duration} color="primary" variant='outlined'/>
          </Grid>}
          {frequency&&<Grid item>
            <Chip label={frequency} color="primary" variant='outlined'/>
          </Grid>}
        </Grid>}
      </Box>
        <Grid container spacing={5} justifyContent="center" sx={{ mb: 7 }}>
        {subjects.map((subject) => {
          return (
            <Grid item key={subject}>
              {selectedSubjects.includes(subject) ? (
                <Chip
                  label={subject}
                  color='primary'
                  onClick={() => handleSubjectSearch(subject)}
                />
              ) : (
                <Chip
                  label={subject}
                  variant="outlined"
                  onClick={() => handleSubjectSearch(subject)}
                  color='primary'
                />
              )}
          </Grid>
          );
        })}
      </Grid>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={5}
      >
        <Button color= "primary" variant="text" sx={{ mr: 3 ,borderRadius: 50 }}  >
          {students.length}人の生徒が見つかりました！
        </Button>
      </Box>
      <Grid container sx={{width: "100%"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }} mt={5}>
        {students.map((user: User)=>{
          return(
            <Grid item key={user.id}>
              <StudentCard key={user.id} user={user}/>
            </Grid>
          )
        })}
      </Grid>
      <SearchItem
      setUsers={setUsers}
      setStudents={setStudents}
      setLoading={setLoading} 
      grade={grade} 
      setGrade={setGrade} 
      major={major} 
      setMajor={setMajor}
      desiredSchool={desiredSchool} 
      setdesiredSchool={setdesiredSchool}
      duration={duration} 
      setDuration={setDuration}
      style={style} 
      setStyle={setStyle}
      frequency={frequency}
      setFrequency={setFrequency}
      searchState={searchState}
      setSearchState={setSearchState}
      />
    </div>
  )
}

export default Home

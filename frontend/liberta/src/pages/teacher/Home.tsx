import { Chip, Grid, Tab, Tabs, Typography } from '@mui/material'
import { User } from 'interfaces'
import { getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/student/StudentCard'
import { AuthContext, HomeContext } from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [students, setStudents] = useState<User[]>([])
  
  const {loading,setLoading} =useContext(AuthContext) //認証用context
  
  const {isHome,setIsHome} = useContext(HomeContext) //ホームにいるかどうか

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate

  const [selectedTab, setSelectedTab] = useState(0); //タブ用のstate

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };


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

  if(loading) return (<div>Loading...</div>)

  return (
    <div>
       <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{marginBottom: 8}}
        >
          <Tab label="希望科目で絞る" sx={{marginRight: 10}} />
          <Tab label="その他条件で絞る" />
        </Tabs>
      {selectedTab ===0 &&<Grid container spacing={5} justifyContent="center" sx={{ mb: 7 }}>
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
      </Grid>}
      {selectedTab ===1 &&<Grid container spacing={5} justifyContent="center" sx={{ mb: 7 }}>
        <Grid item>
          <Chip label="理系" variant="outlined" color='primary'/>
        </Grid>
        <Grid item>
          <Chip label="文系" variant="outlined" color='primary'/>
        </Grid>
        <Grid item>
          <Chip label="テスト期間のみ " variant="outlined" color='primary'/>
        </Grid>
        <Grid item>
          <Chip label="週１" variant="outlined" color='primary'/>
        </Grid>
        <Grid item>
          <Chip label="オンライン" variant="outlined" color='primary'/>
        </Grid>
        <Grid item>
          <Chip label="対面" variant="outlined" color='primary'/>
        </Grid>
        <Grid item>
          <Chip label="1年以上" variant="outlined" color='primary'/>
        </Grid>
      </Grid> }

          <Grid container sx={{width: "100%"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
            {students.map((user: User)=>{
              return(
                <Grid item key={user.id} >
                  <StudentCard key={user.id} user={user}/>
                </Grid>
              )
            })}
          </Grid>
    </div>
  )
}

export default Home

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button, Chip, Collapse, Container, Dialog, Grid, Modal, Skeleton, Slider, SliderProps, Typography } from '@mui/material'
import { User } from 'interfaces'
import { GetServerSideProps } from 'next'
import { getUsers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/teacher/TeacherCard'
import { SearchItem } from 'pages/components/Dialog/student/SearchItem'
import {HomeContext} from 'pages/_app'
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [teachers,setTeachers] = useState<User[]>([]) //教師の情報
  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate
  const [collapseOpen,setCollapseOpen] = useState<boolean>(false) //フロント検索collapseを開くかどうかのstate

  const {isHome,setIsHome} = useContext(HomeContext)

  const [loading,setLoading] = useState(true) //home用のloadingState skeltonを表示

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"] //検索チップ用の教科

  const [slideValue ,setSlideValue] = useState<number[]>([]) //時給スライダーの値

  //フロントで教科で絞る
  const handleSubjectSearch = (subject:string) => {
    if(selectedSubjects.includes(subject)){ //すでにその科目が選択されていた場合
      const newSelectedSubjects = selectedSubjects.filter((selectedSubject)=>selectedSubject !== subject)
      let filteredUsers:User[] = []
      filteredUsers = users.filter((user:User)=>user.teacherProfile)
      filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.teacherProfile?.subjects.includes(newSelectedSubject)))
      if(slideValue.length > 0){ //時給スライダーで指定していた場合
        filteredUsers = filteredUsers.filter((user:User)=>{
          return user.teacherProfile?.hourlyPay >= slideValue[0] && user.teacherProfile.hourlyPay <= slideValue[1]
        })
      }
      setSubject(newSelectedSubjects)
      setTeachers(filteredUsers)
      return
    }
    let filteredUsers:User[] = []
    const newSelectedSubjects = selectedSubjects
    newSelectedSubjects.push(subject)
    filteredUsers = users.filter((user:User)=>user.teacherProfile)
    filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.teacherProfile?.subjects.includes(newSelectedSubject)))
    if(slideValue.length > 0){ //時給スライダーで指定していた場合
      filteredUsers = filteredUsers.filter((user:User)=>{
        return user.teacherProfile?.hourlyPay >= slideValue[0] && user.teacherProfile.hourlyPay <= slideValue[1]
      })
    }
    setTeachers(filteredUsers)
    setSubject(newSelectedSubjects)
  }

//フロントで時給で絞る処理
  const handleSliderChange: SliderProps['onChange'] = async(event, newValue) => {
      const value= newValue as number[]
      let newUsers = users.filter((user:User)=>{
        return user.teacherProfile?.hourlyPay >= value[0] && user.teacherProfile.hourlyPay <= value[1]
      })
      if(selectedSubjects.length > 0){
        newUsers = newUsers.filter((user:User)=>selectedSubjects.every((selectedSubject)=>user.teacherProfile?.subjects.includes(selectedSubject)))
      }
      setTeachers(newUsers)
      setSlideValue(value)
  }


  //検索collapseを開くか閉じるかの処理
  const handleCollapseToggle = () => {
    setCollapseOpen(!collapseOpen);
  };


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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{mb: 5}}
      >
        <Typography variant="subtitle2" color= "teal" sx={{ mr: 3 }}  >
          {teachers.length}人の先生が見つかりました
        </Typography>  
        <Button
          variant="outlined"
          color= "primary"
          onClick={handleCollapseToggle}
          endIcon={collapseOpen ? <ExpandLess /> : <ExpandMore />}
          >
          簡単絞り込み
        </Button>
      </Box>
      <Collapse in={collapseOpen}>
      <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          marginBottom={5}
          width={300}
          mx="auto" 
        >
          <Typography
            variant="subtitle2"
            sx={{
        
            }}
          >
            希望時給を範囲で指定
          </Typography>
          <Slider
            defaultValue={[1000, 10000]}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            min={1000}
            max={10000}
            marks={[
              { value: 1000, label: "1000円" },
              { value: 10000, label: "10000円以上" },
            ]}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          marginBottom={5}
          mx="auto" 
        >
          <Typography 
          sx ={{mb: 2}}
          variant="subtitle2"
          >
            指導可能教科
          </Typography>
          <Grid container spacing={5} justifyContent="center" sx={{mb:4}}>
            {subjects.map((subject:string)=>{
              return(
              <Grid item key={subject}>
                {selectedSubjects.includes(subject) ? <Chip label={subject} color="primary" onClick= {()=>handleSubjectSearch(subject)}/> : <Chip label={subject} variant="outlined" onClick= {()=>handleSubjectSearch(subject)}/>}
              </Grid>
              )
            })}
          </Grid>
        </Box>
      </Collapse>

        <Grid container sx={{width: "100%"}}  justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {teachers.map((user: User)=>{
            return(
              <Grid item key={user.id} >
                <TeacherCard user={user} />
              </Grid>
            )
          })}
        </Grid>
        <SearchItem setUsers={setUsers} setTeachers={setTeachers} setLoading={setLoading}/>
    </div>
  )
}

export default Home

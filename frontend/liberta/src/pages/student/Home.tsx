import { ExpandLess, ExpandMore, Group, PersonOff, Refresh } from '@mui/icons-material'
import { Box, Button, Chip, Collapse, Container, Dialog, Grid, Modal, Skeleton, Slider, SliderProps, Typography, useMediaQuery, useTheme } from '@mui/material'
import { User } from 'interfaces'
import { GetServerSideProps } from 'next'
import { getUsers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/teacher/TeacherCard'
import { SearchItem } from 'pages/components/Dialog/student/SearchItem'
import {HomeContext} from 'pages/_app'
import { grey } from '@mui/material/colors';
import React, { useContext, useEffect, useState } from 'react'

const Home:React.FC = () => {

  //レスポンシブ対応用
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [teachers,setTeachers] = useState<User[]>([]) //教師の情報
  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate
  const [collapseOpen,setCollapseOpen] = useState<boolean>(false) //フロント検索collapseを開くかどうかのstate

  const {isHome,setIsHome} = useContext(HomeContext)

  const [loading,setLoading] = useState(true) //home用のloadingState → skeltonを表示

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"] //検索チップ用の教科

  const [slideValue ,setSlideValue] = useState<number[]>([1000,10000]) //フロント時給スライダーの値

  //検索用のstate ここから
  const [searchState,setSearchState] = useState<boolean>(false) //検索ボタンを押したかどうかのstate
  const [university, setUniversity] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [gender,setGender] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [hourlyPay, setHourlyPay] = useState<number[]>([1000, 10000]);
  //検索用のstate ここまで

  //フロントで教科で絞る
  const handleSubjectSearch = (subject:string) => {
    if(selectedSubjects.includes(subject)){ //すでにその科目が選択されていた場合
      const newSelectedSubjects = selectedSubjects.filter((selectedSubject)=>selectedSubject !== subject)
      let filteredUsers:User[] = []
      filteredUsers = users.filter((user:User)=>user.teacherProfile)
      filteredUsers = filteredUsers.filter((user:User)=>newSelectedSubjects.every((newSelectedSubject)=>user.teacherProfile?.subjects.includes(newSelectedSubject)))
      if(!(slideValue[0]===1000 && slideValue[1]===10000)){ //時給スライダーで指定していた場合
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
    if(!(slideValue[0]===1000 && slideValue[1]===10000)){ //時給スライダーで指定していた場合
      filteredUsers = filteredUsers.filter((user:User)=>{
        return user.teacherProfile?.hourlyPay >= slideValue[0] && user.teacherProfile.hourlyPay <= slideValue[1]
      })
    }
    setTeachers(filteredUsers)
    setSubject(newSelectedSubjects)
  }

//フロント教科リセット
  const handleSubjectReset = () => {
    let newUsers = users.filter((user:User)=>user.teacherProfile) //一度教師全員を格納
    if(!(slideValue[0]===1000 && slideValue[1]===10000)){ //時給スライダーで指定していた場合時給条件だけ適用
      newUsers= newUsers.filter((user:User)=>{
        return user.teacherProfile?.hourlyPay >= slideValue[0] && user.teacherProfile.hourlyPay <= slideValue[1]
      })
    }
    setTeachers(newUsers)
    setSubject([]) //教科のみリセット
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

  //フロント時給リセット
  const handleSliderReset = () => {
    let newUsers = users.filter((user:User)=>user.teacherProfile) //一度教師全員を格納
    if(selectedSubjects.length > 0){ //教科が選択されていた場合は教科条件だけ適用
      newUsers = newUsers.filter((user:User)=>selectedSubjects.every((selectedSubject)=>user.teacherProfile?.subjects.includes(selectedSubject)))
    }
    setTeachers(newUsers)
    setSlideValue([1000,10000]) //スライダーの値のみリセット
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
        <Grid container sx={{width: "100%"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }} mt={5}>
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
          {university&&<Grid item>
            <Chip label={university} color="primary" variant='outlined'/>
          </Grid>}
          {major&&<Grid item>
            <Chip label={major} color="primary" variant='outlined'/>
          </Grid>}
          {gender&&<Grid item>
            <Chip label={gender} color="primary" variant='outlined'/>
          </Grid>}
          {style&&<Grid item>
            <Chip label={style} color="primary" variant='outlined'/>
          </Grid>}
          {!(hourlyPay[0]===1000 && hourlyPay[1] === 10000) &&<Grid item>
            <Chip label={hourlyPay[0] + "円〜" + hourlyPay[1] + "円"} color="primary" variant='outlined'/>
          </Grid>}
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => window.location.reload()}
              sx={{borderRadius: 50 }}
              startIcon={<Refresh />}
            >
              全ての検索条件をリセット
          </Button>
          </Grid>
        </Grid>}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        {collapseOpen ?
        <Button
          variant="contained"
          color= "primary"
          onClick={handleCollapseToggle}
          sx={{borderRadius: 50}}
          endIcon ={<ExpandLess />}
          >
          高速絞り込み
        </Button> 
          :
        <Button
          variant="outlined"
          color= "primary"
          onClick={handleCollapseToggle}
          sx={{borderRadius: 50}}
          endIcon ={<ExpandMore />}
          >
          高速絞り込み
        </Button>
         }
      </Box>
      <Collapse in={collapseOpen}>
        <Box 
          bgcolor={grey[200]}
          p={2}
          borderRadius={4}
          mb={5}
        >
          <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              marginBottom={5}
              maxWidth={{xs: 300, sm: 300, md: 500}}
              mx="auto" 
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="subtitle2"
                sx={{
            
                }}
              >
                希望時給を範囲で指定
              </Typography>
              <Button onClick={handleSliderReset}>リセット</Button>
            </Box>
            <Slider
              defaultValue={[1000, 10000]}
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
              min={1000}
              max={10000}
              value={slideValue}
              marks={[
                { value: 1000, label: "1000円" },
                { value: 10000, label: "10000円以上" },
              ]}
              sx={{maxWidth: {xs: 200, sm: 300, md: 500}}}
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{mb:2}}
              >
                <Typography 
                variant="subtitle2"
                >
                  指導可能教科
                </Typography>
                <Button onClick={handleSubjectReset}>リセット</Button>
            </Box>
            <Grid container spacing={{xs: 1, sm: 2, md: 2}} justifyContent="center" sx={{mb:{xs: 1, sm: 3, md: 5}}}>
              {subjects.map((subject:string)=>{
                return(
                <Grid item key={subject}>
                  {selectedSubjects.includes(subject) ? <Chip label={subject} color="primary" onClick= {()=>handleSubjectSearch(subject)}/> : <Chip label={subject} color="primary" variant="outlined" onClick= {()=>handleSubjectSearch(subject)}/>}
                </Grid>
                )
              })}
            </Grid>
          </Box>
          </Box>
      </Collapse>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={{xs: 1, sm: 3, md: 5}}
      >
        {teachers.length >0 ? 
        <Button color= "secondary" variant="text" sx={{ borderRadius: 50 }} startIcon ={<Group/>} >
          {teachers.length}人の先生が見つかりました！
        </Button>
          : 
        <Button color= "secondary" variant="text" sx={{ borderRadius: 50 }} startIcon ={<PersonOff/>} >
          0人の検索結果
        </Button>
        }
      </Box>

        {teachers.length >0 ?
        <Grid container sx={{width: "100%"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }} mt={5}>
          {teachers.map((user: User)=>{
            return(
              <Grid item key={user.id} >
                <TeacherCard user={user} />
              </Grid>
            )
          })}
        </Grid> : 
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={10}
          mb={30}
          >
          <Typography variant="h5" color="teal">条件に一致する先生は見つかりませんでした。</Typography>
          </Box>}
        <SearchItem
          setUsers={setUsers} 
          setTeachers={setTeachers} 
          setLoading={setLoading} 
          university={university}
          setUniversity={setUniversity}
          major={major}
          setMajor={setMajor}
          gender={gender}
          setGender={setGender}
          style={style}
          setStyle={setStyle}
          hourlyPay={hourlyPay}
          setHourlyPay={setHourlyPay}
          searchState={searchState}
          setSearchState={setSearchState}
            />
    </div>
  )
}

export default Home

import { ExpandLess, ExpandMore, Group, PersonOff, Refresh } from '@mui/icons-material'
import { Box, Button, Chip, Collapse, Container, Dialog, Grid, Modal, Skeleton, Slider, SliderProps, Typography, useMediaQuery, useTheme } from '@mui/material'
import { SearchTeachersParams, User } from 'interfaces'
import { GetServerSideProps } from 'next'
import { getTeachers, getUsers, SearchTeachers } from 'pages/api/user'
import TeacherCard from 'pages/components/Cards/teacher/TeacherCard'
import { SearchItem } from 'pages/components/Dialog/student/SearchItem'
import {HomeContext, SearchModalContext} from 'pages/_app'
import { grey } from '@mui/material/colors';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

const Home:React.FC = () => {

  //レスポンシブ対応用
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users,setUsers] = useState<User[]>([]) //全員の情報
  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科で絞る用のstate
  const [collapseOpen,setCollapseOpen] = useState<boolean>(false) //フロント検索collapseを開くかどうかのstate

  const {isHome,setIsHome} = useContext(HomeContext)

  const [loading,setLoading] = useState(true) //home用のloadingState → skeltonを表示

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"] //検索チップ用の教科

  const [slideValue ,setSlideValue] = useState<number[]>([1000,10000]) //フロント時給スライダーの値


  //フロントで教科で絞る
  const handleSubjectSearch = (subject: string) => {
    const newSelectedSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((selectedSubject) => selectedSubject !== subject)
      : [...selectedSubjects, subject];
  
    setSubject(newSelectedSubjects);
  };

//フロント教科リセット
  const handleSubjectReset = () => {
    setSubject([]) //教科リセット
  }
  

//フロントで時給で絞る処理
  const handleSliderChange: SliderProps['onChange'] = (event, newValue) => {
      const value= newValue as number[]
      setSlideValue(value) //スライダーの値を更新
  }

  //フロント時給リセット
  const handleSliderReset = () => {
    setSlideValue([1000,10000]) //スライダーをリセット
  }

  //検索collapseを開くか閉じるかの処理
  const handleCollapseToggle = () => {
    setCollapseOpen(!collapseOpen);
  };

  
  const {searchTeacherTerm,setSearchTeacherTerm} = useContext(SearchModalContext) //検索ワード
  const {searchState,setSearchState} = useContext(SearchModalContext) //検索状態管理

 //検索結果を更新する
 const fetcher = (searchTeacherTerm:SearchTeachersParams) => {
  setLoading(true)
  return SearchTeachers(searchTeacherTerm);
};

//searchStudentTermが変更されたらキャッシュされた検索結果を更新
const { data, error } = useSWR(searchTeacherTerm, fetcher,{
  revalidateOnFocus: false, 
  revalidateOnReconnect: false,
  dedupingInterval: 1800000 // 30分間キーが変更されない限り再フェッチされない
});


//キャッシュが更新されたらusersを更新
useEffect(() => {
  if (!data) return;
  setUsers(data.data);
  setLoading(false)
}, [data]);




  //教師のデータをキャッシュに保存し、検索に応じてフィルタリング
  const filteredUsers = useMemo(() => {
    if(selectedSubjects.length ===0 && (slideValue[0]===1000 && slideValue[1]===10000) ) return users
    
    return users
    .filter((user:User)=>
      user.teacherProfile.hourlyPay >= slideValue[0] && user.teacherProfile.hourlyPay <= slideValue[1]
    )
    .filter((user:User) => 
      selectedSubjects.every((selectedSubject)=>user.teacherProfile.subjects.includes(selectedSubject))
    )
  }, [users,slideValue,selectedSubjects])

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
        sx={{mb: 5,mt: 5}}
        width="100%"
        minWidth="80vw"
      >
        {searchState&&
        <>
          <Box >
            <Grid container spacing={{xs: 1, sm: 2}} justifyContent="center" alignItems="center">
              <Grid item>
                <Typography variant="subtitle2" color="teal">
                  現在の検索条件:
                </Typography>
              </Grid>
              {searchTeacherTerm.university&&<Grid item>
                <Chip label={searchTeacherTerm.university} color="primary" variant='outlined'/>
              </Grid>}
              {searchTeacherTerm.major&&<Grid item>
                <Chip label={searchTeacherTerm.major} color="primary" variant='outlined'/>
              </Grid>}
              {searchTeacherTerm.gender&&<Grid item>
                <Chip label={searchTeacherTerm.gender} color="primary" variant='outlined'/>
              </Grid>}
              {searchTeacherTerm.style&&<Grid item>
                <Chip label={searchTeacherTerm.style} color="primary" variant='outlined'/>
              </Grid>}
              {!(searchTeacherTerm.hourlyPay[0]===1000 && searchTeacherTerm.hourlyPay[1] === 10000) &&<Grid item>
                <Chip label={searchTeacherTerm.hourlyPay[0] + "円〜" + searchTeacherTerm.hourlyPay[1] + "円"} color="primary" variant='outlined'/>
              </Grid>}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => window.location.reload()}
              sx={{borderRadius: 50 }}
              startIcon={<Refresh />}
            >
              全ての検索条件をリセット
            </Button>
          </Box>
        </Box>
        </>
        }
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
        <Box sx={{display: "flex",justifyContent: "center",alignItems: "center"}}>
          <Box 
            bgcolor={grey[200]}
            p={2}
            borderRadius={4}
            mb={5}
            width={{xs: "80vw", sm: "70vw",md: "60vw"}}
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
              width={{xs: "90%", sm: "85%", md: "80%"}}
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
        </Box>
      </Collapse>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={{xs: 1, sm: 3, md: 5}}
      >
        {filteredUsers.length >0 ? 
        <Button color= "secondary" variant="text" sx={{ borderRadius: 50 }} startIcon ={<Group/>} >
          {filteredUsers.length}人の先生が見つかりました！
        </Button>
          : 
        <Button color= "secondary" variant="text" sx={{ borderRadius: 50 }} startIcon ={<PersonOff/>} >
          0人の検索結果
        </Button>
        }
      </Box>

        {filteredUsers.length >0 ?
        <Grid container sx={{width: "100vw"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }} mt={5}>
          {filteredUsers.map((user: User)=>{
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
          minWidth="100%"
          >
          <Typography variant="h5" color="teal">条件に一致する先生は見つかりませんでした。</Typography>
          </Box>}
        <SearchItem
          setUsers={setUsers} 
          setLoading={setLoading} 
            />
    </div>
  )
}

export default Home

import { ExpandLess, ExpandMore, Group, PersonOff, Refresh } from '@mui/icons-material'
import { Box, Button, Chip, Collapse, Grid, Skeleton, Typography} from '@mui/material'
import { grey } from '@mui/material/colors'
import { User } from 'interfaces'
import { getStudents, getUsers } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/student/StudentCard'
import { SearchItem } from 'pages/components/Dialog/teacher/SearchItem'
import { HomeContext } from 'pages/_app'
import React, { useContext, useEffect, useMemo, useState } from 'react'

const Home:React.FC = () => {

    //レスポンシブ対応用

  const [loading,setLoading] =useState(true) //ホーム用のloadingState skeltonを表示

  const [users,setUsers] = useState<User[]>([]) //全員の情報

  const {isHome,setIsHome} = useContext(HomeContext) //ホームにいるかどうか

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科検索用のstate
  const [collapseOpen,setCollapseOpen] = useState<boolean>(false) //フロント教科検索collapseを開くかどうかのstate

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
    const handleSubjectSearch = (subject: string) => {
      const newSelectedSubjects = selectedSubjects.includes(subject)
        ? selectedSubjects.filter((selectedSubject) => selectedSubject !== subject)
        : [...selectedSubjects, subject];
    
      setSubject(newSelectedSubjects);
    };

  //フロント教科検索をリセット
  const handleResetSubjext =() =>{
    setSubject([])
  }

  //フロント教科検索collapseを開くか閉じるかの処理
  const handleCollapseToggle = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleGetStudents = async () => {

    try{
        const res = await getStudents()
        const users:User[] = res.data
        setUsers(users)
    }catch(err){
      console.log(err)
    }
    setLoading(false)

  }

  useEffect(() => {handleGetStudents()}, [])

  //キャッシュに生徒情報を保存して検索に応じてフィルタリング
  const filteredUsers = useMemo(() => {
    if (selectedSubjects.length === 0) {
      return users
    }
  
    return users
      .filter((user: User) =>
        selectedSubjects.every((selectedSubject) =>
          user.studentProfile?.subjects.includes(selectedSubject)
        )
      );
  }, [users, selectedSubjects]);

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
          </Grid>
          }
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => window.location.reload()}
              sx={{ borderRadius: 50 }}
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
          sx={{mb:3}}
          >
            {collapseOpen? <Button
            variant= "contained"
            color ="primary"
            sx={{mr: 2,borderRadius: 50 }}
            endIcon={<ExpandLess />}
            onClick ={handleCollapseToggle}
            >
              閉じる
            </Button>
            :
            <Button
            variant= "outlined"
            color ="primary"
            sx={{mr: 2,borderRadius: 50 }}
            endIcon={<ExpandMore />}
            onClick ={handleCollapseToggle}
            >
              希望教科から絞る
            </Button>
            
            }
          {selectedSubjects.length >0 && <Button onClick={handleResetSubjext} color ="error" startIcon={<Refresh />} variant ="outlined"  sx={{ borderRadius: 50 }}>リセット</Button>}
        </Box>
        <Collapse in={collapseOpen}>
          <Grid container spacing={{xs:1,sm:5}} justifyContent="center" sx={{ mb: {xs:5,sm:7},mt: {xs:1,sm:2}}}>
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
        </Collapse>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={5}
      >
       {filteredUsers.length >0 ? 
        <Button color= "secondary" variant="text" sx={{ borderRadius: 50 }} startIcon ={<Group/>} >
          {filteredUsers.length}人の生徒が見つかりました！
        </Button>
          : 
        <Button color= "secondary" variant="text" sx={{ borderRadius: 50 }} startIcon ={<PersonOff/>} >
          0人の検索結果
        </Button>
        }
      </Box>
      <Grid container sx={{width: "100%"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }} mt={5}>
        {filteredUsers.map((user: User)=>{
          return(
            <Grid item key={user.id}>
              <StudentCard key={user.id} user={user}/>
            </Grid>
          )
        })}
      </Grid>
      <SearchItem
      setUsers={setUsers}
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

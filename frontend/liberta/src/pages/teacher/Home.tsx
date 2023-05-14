import { Clear, ExpandLess, ExpandMore, Group, KeyboardArrowUp, PersonOff, Refresh } from '@mui/icons-material'
import { Box, Button, Chip, Collapse, Fab, Grid, Skeleton, styled, Typography} from '@mui/material'
import { grey } from '@mui/material/colors'
import { SearchStudentsParams, User } from 'interfaces'
import { getStudents, getUsers, SearchStudents } from 'pages/api/user'
import StudentCard from 'pages/components/Cards/student/StudentCard'
import { SearchItem } from 'pages/components/Dialog/teacher/SearchItem'
import { HomeContext, SearchModalContext } from 'pages/_app'
import React, { use, useContext, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

//高速絞り込みボタンのスタイル
const FastSearchButton = styled(Button)(({ theme }) => ({
  maxWidth : "100%",
  padding: theme.spacing(2, 5),
  borderRadius: '9999px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: '0 2px 4px rgba(32,33,36,0.3)', // ここを変更
  cursor: 'pointer',
  marginTop: 20,
  marginBottom: 15,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 4px 6px rgba(32,33,36,0.4)', // ここを変更
  },
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '95%',
    padding: theme.spacing(1.5, 3),
  },
  
}));

const Home:React.FC = () => {

    //レスポンシブ対応用

  const [loading,setLoading] =useState(true) //ホーム用のloadingState skeltonを表示

  const [users,setUsers] = useState<User[]>([]) //全員の情報

  const {isHome,setIsHome} = useContext(HomeContext) //ホームにいるかどうか

  const subjects:string[] = ["数学","英語","物理","化学","生物","地学","日本史","世界史","地理"]

  const [selectedSubjects,setSubject] = useState<string[]>([]) //フロント教科検索用のstate
  const [collapseOpen,setCollapseOpen] = useState<boolean>(false) //フロント教科検索collapseを開くかどうかのstate

  //チップを削除する関数
  const handleDeleteMajor =()=>{
    setSearchStudentTerm((prev)=>({...prev,major:""}))
  }
  const handleDeleteGrade =()=>{
    setSearchStudentTerm((prev)=>({...prev,grade:""}))
  }
  const handleDeleteDuration =()=>{
    setSearchStudentTerm((prev)=>({...prev,duration:""}))
  }
  const handleDeleteFrequency =()=>{
    setSearchStudentTerm((prev)=>({...prev,frequency:""}))
  }
  const handleDeleteStyle =()=>{
    setSearchStudentTerm((prev)=>({...prev,style:""}))
  }
  const handleDeleteDisiredSchool =()=>{
    setSearchStudentTerm((prev)=>({...prev,desiredSchool:""}))
  }

  const handleResetSearchTerm =()=>{
    setSearchStudentTerm({
      major: "",
      grade: "",
      duration: "",
      frequency: "",
      style: "",
      desiredSchool: "",
    })
  }

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

  //検索状態管理
  const {searchState,setSearchState} = useContext(SearchModalContext)
  const {searchStudentTerm,setSearchStudentTerm} = useContext(SearchModalContext)

  //検索結果を更新する
  const fetcher = async(searchStudentTerm:SearchStudentsParams) => {
    setLoading(true)
    try{
      const res = await SearchStudents(searchStudentTerm)
      return res.data
    }catch(error){
      console.log(error)
    }
  };

  //searchStudentTermが変更されたらキャッシュされた検索結果を更新
  const { data, error } = useSWR(searchStudentTerm, fetcher,{
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
    dedupingInterval: 1800000 // 30分間キーが変更されない限り再フェッチされない
  });


  //キャッシュが更新されたらusersを更新
  useEffect(() => {
    if(data){
      setUsers(() => data);
      if(searchStudentTerm.duration ==="" && searchStudentTerm.frequency ==="" && searchStudentTerm.style ==="" && searchStudentTerm.desiredSchool ==="" && searchStudentTerm.grade ==="" && searchStudentTerm.major ===""){
        setSearchState(false)
      }
      setLoading(false)
    }
  }, [data]);

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

    //ある程度スクロールしたら上に戻るボタンを表示
    const [scroll, setScroll] = useState(false);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    //上に戻るボタンを押したら一番上にスクロール
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

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
          <Box>
            <Grid container spacing={{xs: 1, sm: 2}} justifyContent="center" alignItems="center">
              <Grid item>
                <Typography variant="subtitle2" color="teal">
                  現在の検索条件:
                </Typography>
              </Grid>
              {searchStudentTerm.grade&&<Grid item>
                <Chip label={searchStudentTerm.grade} color="primary" variant='outlined' icon={<Clear sx={{fontSize: 'small'}} />} onClick={handleDeleteGrade}/>
              </Grid>}
              {searchStudentTerm.major&&<Grid item>
                <Chip label={searchStudentTerm.major} color="primary" variant='outlined' icon={<Clear sx={{fontSize: 'small'}} />} onClick={handleDeleteMajor}/>
              </Grid>}
              {searchStudentTerm.desiredSchool&&<Grid item>
                <Chip label={searchStudentTerm.desiredSchool} color="primary" variant='outlined' icon={<Clear sx={{fontSize: 'small'}} />} onClick={handleDeleteDisiredSchool}/>
              </Grid>}
              {searchStudentTerm.style&&<Grid item>
                <Chip label={searchStudentTerm.style} color="primary" variant='outlined' icon={<Clear sx={{fontSize: 'small'}} onClick={handleDeleteStyle}/>} />
              </Grid>}
              {searchStudentTerm.duration&&<Grid item>
                <Chip label={searchStudentTerm.duration} color="primary" variant='outlined' icon={<Clear sx={{fontSize: 'small'}} />} onClick={handleDeleteDuration} />
              </Grid>}
              {searchStudentTerm.frequency&&<Grid item>
                <Chip label={searchStudentTerm.frequency} color="primary" variant='outlined'icon={<Clear sx={{fontSize: 'small'}} />} onClick={handleDeleteFrequency} />
              </Grid>
              }
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleResetSearchTerm}
              sx={{borderRadius: 50 }}
              startIcon={<Refresh />}
            >
              全ての検索条件をリセット
            </Button>
          </Box>
          </Box>
          }
      </Box>
      {!collapseOpen&&<Box
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
      </Box>}
      {filteredUsers.length >0 &&<Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {collapseOpen ?
        <FastSearchButton
          onClick={handleCollapseToggle}
          variant="text"
          endIcon={<ExpandLess color='primary'/>}
          >
          <Typography variant="caption">閉じる</Typography>
        </FastSearchButton> 
          :
        <FastSearchButton
          onClick={handleCollapseToggle}
          variant="text"
          endIcon={<ExpandMore color='primary'/>}
          >
          <Typography variant="caption">希望科目から絞り込む</Typography>
        </FastSearchButton>
        }
      </Box>}
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
        {selectedSubjects.length >0 && <Box
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
        </Box>}
        </Collapse>

      <Grid container sx={{width: "100%"}} justifyContent="center" rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 4 }} mt={5}>
        {filteredUsers.map((user: User)=>{
          return(
            <Grid item key={user.id}>
              <StudentCard key={user.id} user={user}/>
            </Grid>
          )
        })}
      </Grid>
      <Box sx={{position: "fixed",bottom: 20,right: 10}}>
        {scroll && (
          <Fab color="primary" size="medium" onClick={scrollToTop}>
            <KeyboardArrowUp />
          </Fab>
        )}
      </Box>
      <SearchItem
      setUsers={setUsers}
      setLoading={setLoading} 
      />
    </div>
  )
}

export default Home


import { makeStyles } from '@material-ui/styles';
import { ArrowBack, ThumbUp } from '@mui/icons-material';
import { Box, Typography, Avatar, Chip, Button, Theme, styled } from '@mui/material';
import { CreateLikeParams, User } from 'interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { createLike } from 'pages/api/like';
import { confirmLiked, getUser } from 'pages/api/user';
import { AuthContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';


interface StudentDetailProps {
    user: User;
  }


export const getServerSideProps: GetServerSideProps<StudentDetailProps>= async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    if(id){
        try{
          let res = await getUser(id)
          const user:User = res.data;
         return {
             props: {
               user
             },
           };
        }catch(err){
            console.log(err)
            return {
             notFound: true,
           };
        }
    }else{
        return {
            notFound: true,
          };
    }
  };

  const LikeButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    border: '1px solid teal',
    color: 'teal',
    borderRadius: '8px',
    padding: '6px 16px',
    textTransform: 'uppercase',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    letterSpacing: '0.5px',
    marginTop: 30,
    '&:hover': {
      backgroundColor: 'teal',
      color: 'white',
      boxShadow: '0 6px 10px rgba(50, 50, 93, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s',
  }));


  const LikedButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'teal',
    color: 'white',
    marginTop: 30,
    '&:hover': {
      backgroundColor: 'teal',
      color: 'white',
    },
  }));



  const StudentDetail: React.FC<StudentDetailProps> = ({ user }) => {
 
    const {currentUser} = useContext(AuthContext);

    const [like, setLike]= useState<boolean>(false)

    const router = useRouter();

    //いいねボタンを押した時の処理
    const handleConfirmLiked = async() => {
      if(currentUser){
        try{
          const res = await confirmLiked(currentUser.id,user.id)
          const isLiked = res.data
          console.log(isLiked)
          setLike(isLiked)
        }catch(error){
          console.log(error)
        }
      }
    }


    useEffect(() => {handleConfirmLiked()},[])

    //いいねボタンを押した時の処理
    const handleLikeClick = async() => {

      if(currentUser && !like){
        const params:CreateLikeParams = {
          liked_id: user.id,
          liker_id: currentUser.id
        }
        setLike(true)
      try{
        const res = await createLike(params)
        console.log(res)

      }catch(error){
        console.log(error)
      }

      }else{
        console.log("失敗")
        return;
      }
    }


    return (
      <Box sx={{ padding: '16px' }}>
        <Button color="primary" startIcon={<ArrowBack />} sx={{marginBottom :5 }} onClick={() => router.push("/") }>戻る</Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
          <Avatar src="/images/dog.jpg" sx={{ width: 250, height: 250,marginRight: 50 }} />
          <Box>
            <Typography variant="h4" gutterBottom>{user.name}</Typography>
            <Typography variant="subtitle1">年齢: {user.studentProfile.age}</Typography>
            <Typography variant="subtitle1">学校名: {user.studentProfile.school}</Typography>
            <Typography variant="subtitle1">志望校: 大阪大学</Typography>
            <Typography variant="subtitle1">文理選択: 理系</Typography>

            {like ? (
              <LikedButton
              startIcon={<ThumbUp />}
              onClick ={handleLikeClick}
              >
                いいね済み
              </LikedButton>
            ) : (
              <LikeButton
                startIcon={<ThumbUp />}
                onClick ={handleLikeClick}
              >
                いいね！
              </LikeButton>
            )}
          </Box>
      </Box>


        <Box sx={{ marginTop: '24px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
          <Typography variant="h5" gutterBottom>希望科目</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {user.studentProfile.subjects.map((subject) => (
              <Chip label={subject}  key={subject}/>
            ))}
          </Box>
        </Box>
        <Box sx={{ marginTop: '24px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
          <Typography variant="h5" gutterBottom>希望指導形態</Typography>
          <Typography>オンライン</Typography>
        </Box>
        <Box sx={{ marginTop: '24px',marginBottom: 10 }}>
          <Typography variant="h5" gutterBottom>自己紹介</Typography>
          <Typography>{user.studentProfile.introduction}</Typography>
        </Box>
      </Box>
    );
  }

  export default StudentDetail;
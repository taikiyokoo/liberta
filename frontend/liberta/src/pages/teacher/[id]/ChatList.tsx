import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Avatar,
  Link,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import { CreateChatroomParams, User } from 'interfaces';
import { getLikingUsers } from 'pages/api/user';
import { ArrowBack, ArrowBackIosNew } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { createChatroom } from 'pages/api/chatroom';
import { AuthContext } from 'pages/_app';
import { useContext } from 'react';


type Props = {
  users: User[];
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id as string;
  if (id) {
    try {
      const response1 = await getLikingUsers(id); //いいねをしたユーザーの情報を取得
      const users: User[] = response1.data;
      return {
        props: {
          users,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};

const ChatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3) ,
  marginBottom: 10,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ChatList: React.FC<Props> = ({ users }) => {

  const router = useRouter();
  const {currentUser} = useContext(AuthContext)
  
  const handleClickChat =async (id:number) => {
    try{
      const params:CreateChatroomParams = {
        user1_id: currentUser?.id ,
        user2_id: id,
      }
      const res =  await createChatroom(params)
      router.push(`/chat/${res.data.id}`)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
     
      <Box display="flex" justifyContent="center" alignItems="center" minWidth="100vw" mt={{xs:0,sm: 5,md: 10}}>
        <Grid container sx={{width: {xs: "100vw",md: "50vw"}}}>
          {users.map((user) => (
            <Grid item xs={12} key={user.id} maxWidth="100%">
                <ChatCard onClick={() => handleClickChat(user.id)} sx={{width: "100%"}}>
                  <Avatar
                    sx={{ marginRight: 2,}}
                    src= "/images/dog.jpg"
                  >
                    {user.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Typography variant="subtitle2">メッセージを送ろう！</Typography>
                  </Box>
                </ChatCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ChatList;

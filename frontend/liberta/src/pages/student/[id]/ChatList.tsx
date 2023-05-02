import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Avatar,
  Link,
  IconButton,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import { CreateChatroomParams, User } from 'interfaces';
import { getLikingUsers } from 'pages/api/user';
import { ArrowBack, ArrowBackIosNew } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from 'pages/_app';
import { createChatroom } from 'pages/api/chatroom';


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
  padding: theme.spacing(2),
  marginBottom: 2,
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
  const { currentUser } = useContext(AuthContext);

  const handleClickChat =async (id:number) => {
    try{
      const params:CreateChatroomParams = {
        user1_id: currentUser?.id ,
        user2_id: id,
      }
      const res =  await createChatroom(params)
      console.log(res)
      router.push(`/chat/${res.data.id}`)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
    <Button color="primary" startIcon={<ArrowBackIosNew />} sx={{ color: 'teal',mb: 5,mr: {xs: 35,sm: 70,md: 150},mt: {xs:1,sm: 5} }} onClick={() => router.push("/") }></Button>
      <Container sx={{maxWidth: {xs: "80vw",md: "50vw"}}}>
        <Grid container spacing={1}>
          {users.map((user) => (
            <Grid item xs={12} key={user.id}>
                <ChatCard onClick={()=> handleClickChat(user.id)}>
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
      </Container>
    </>
  );
};

export default ChatList;

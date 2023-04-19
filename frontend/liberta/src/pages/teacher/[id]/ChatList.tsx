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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import { User } from 'interfaces';
import { getLikingUsers } from 'pages/api/user';


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
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ChatList: React.FC<Props> = ({ users }) => {
  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="戻る" href="/">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Chatroom
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={1}>
          {users.map((user) => (
            <Grid item xs={12} key={user.id}>
              <Link href={`/chat/${user.id}`} underline="none">
                <ChatCard>
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
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ChatList;

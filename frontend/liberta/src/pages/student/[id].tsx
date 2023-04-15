import { Button, Typography } from '@mui/material';
import { randomFill } from 'crypto';
import { User } from 'interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getUser } from 'pages/api/user';

interface StudentDetailProps {
    user: User;
  }


export const getServerSideProps: GetServerSideProps<StudentDetailProps>= async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    if(id){
        try{
         const response = await getUser(id)
         const user:User = response.data;
         return {
             props: {
               user,
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

  const StudentDetail: React.FC<StudentDetailProps> = ({ user }) => {

    return(
        <div>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.studentProfile?.grade}</Typography>
            <Typography>{user.studentProfile?.school}</Typography>
            <Button color='primary'>リクエスト</Button>

        </div>
    )


  }

  export default StudentDetail;
import { Button, Typography } from '@mui/material';
import { randomFill } from 'crypto';
import { User } from 'interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getUser } from 'pages/api/user';

interface TeacherDetailProps {
    user: User;
  }


export const getServerSideProps: GetServerSideProps<TeacherDetailProps>= async (context: GetServerSidePropsContext) => {
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

  const TeacherDetail: React.FC<TeacherDetailProps> = ({ user }) => {

    return(
        <div>
            <Typography>{user.name}</Typography>  
            <Typography>{user.email}</Typography>
            <Typography>{user.teacherProfile?.age}</Typography>
            <Typography>{user.teacherProfile?.university}</Typography>
            <Button color='success'>リクエスト</Button>
        </div>
    )


  }

  export default TeacherDetail;
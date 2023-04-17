import { styled } from '@material-ui/core';
import { ArrowBack } from '@mui/icons-material';
import { Button, ButtonGroup, Grid, Tab, Tabs } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Box } from '@mui/system';
import { User } from 'interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getLikedUsers, getLikingUsers } from 'pages/api/user';
import TeacherCard from 'pages/components/Cards/teacher/TeacherCard';
import React, { useState } from 'react'

interface LikedUsersProps {
    likedUsers: User[];
    likingUsers: User[];
  }


export const getServerSideProps: GetServerSideProps<LikedUsersProps>= async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    if(id){
        try{
          const response1 = await getLikedUsers(id) //いいねをしたユーザーの情報を取得
          const likedUsers:User[] = response1.data;
          const response2 = await getLikingUsers(id)
          const likingUsers:User[] = response2.data; //いいねされたユーザーの情報を取得
         return {
             props: {
               likedUsers,
               likingUsers
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


const LikedUsers:React.FC<LikedUsersProps> = ({likedUsers,likingUsers}) => {

  const router =useRouter()

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Box sx={{minWidth: 1200}}>
        <Button color="primary" startIcon={<ArrowBack />} sx={{ color: 'teal' }} onClick={() => router.push("/") }>戻る</Button>
      </Box>
      <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{marginBottom: 10}}
        >
          <Tab label="いいねしたユーザー" sx={{marginRight: 10}} />
          <Tab label="いいねされたユーザー" />
        </Tabs>
        <Box 
           sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
        }}
        >
          {selectedTab === 0 &&
            <Grid container sx={{width: "100%",justifyContent: 'center'}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {likedUsers.map((user: User)=>{
                  return(
                    <Grid item key={user.id} >
                      <TeacherCard user={user} />
                    </Grid>
                  )
                })}
            </Grid>
          }
          {selectedTab === 1 &&
            <Grid container sx={{width: "100%",justifyContent: 'center'}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {likingUsers.map((user: User)=>{
                  return(
                    <Grid item key={user.id} >
                      <TeacherCard user={user} />
                    </Grid>
                  )
                }
                )}
            </Grid>
          }
        </Box>
    </div>
  )
}

export default LikedUsers

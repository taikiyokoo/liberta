import { styled } from '@material-ui/core';
import { Button, ButtonGroup, Grid, Tab, Tabs } from '@mui/material';
import { teal } from '@mui/material/colors';
import { User } from 'interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getLikedUsers, getLikingUsers } from 'pages/api/user';
import StudentCard from 'pages/components/Cards/student/StudentCard';
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

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
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
        {selectedTab === 0 &&
          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {likedUsers.map((user: User)=>{
                return(
                  <Grid item key={user.id} >
                    <StudentCard user={user} />
                  </Grid>
                )
              })}
          </Grid>
        }
        {selectedTab === 1 &&
          <Grid container sx={{width: "100%"}} rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {likingUsers.map((user: User)=>{
                return(
                  <Grid item key={user.id} >
                    <StudentCard user={user} />
                  </Grid>
                )
              }
              )}
          </Grid>
        }
      
    </div>
  )
}

export default LikedUsers

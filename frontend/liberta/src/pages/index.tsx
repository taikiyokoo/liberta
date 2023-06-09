import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from './_app'
import { Typography } from '@material-ui/core'

export default function Home() {
  const {currentUser,isSignedIn} = useContext(AuthContext)
  const router = useRouter()

  const navigatePageByUserType = () => {
    console.log(currentUser)
    if(isSignedIn){
      if(currentUser?.userType === "teacher"){
        router.push('/teacher/Home')
      }else if(currentUser?.userType === "student"){
        router.push('/student/Home')
      }
    }else{
      router.push('/TopPage')
    }
  }


  useEffect(()=>{navigatePageByUserType()},[])

  return (
    <>
      <Head>
        <title>liberta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main >
      </main>
    </>
  )
}

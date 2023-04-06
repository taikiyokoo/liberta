import { makeStyles, Theme } from '@material-ui/core'
import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SignUpParams } from 'interfaces'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { signUp } from './api/auth'
import { AuthContext } from './_app'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  box: {
    marginTop: "2rem"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  }
}))

const SignUp = () => {

  const classes = useStyles()
  const router = useRouter()

  //認証用context
  const { setIsSignedIn,setCurrentUser } = useContext(AuthContext)

  //入力内容をuseStateで管理
  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password,setPassword]  = useState<string>("")
  const [passwordConfirmation,setPasswordConfirmation] = useState<string>("")

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try{
      const res = await signUp(params)
      console.log(res)

      if(res.status === 200){

        Cookies.set("_acccess_token",res.headers["access-token"])
        Cookies.set("_client",res.headers["client"])
        Cookies.set("_uid",res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.push("/")

        console.log("Successed in Sign Up")

      }else{
        
      }

    }catch(err){
      console.log(err)
      
    }
  }

  return (
    <>
      <form noValidate autoComplete='off'>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title = "アカウント作成" />
        <CardContent>
          <TextField 
            variant='outlined'
            required
            fullWidth
            label = "名前"
            value = {name}
            margin = "dense"
            onChange={event=> setName(event.target.value)}
          />
          <TextField
            variant='outlined'
            required
            fullWidth
            label = "メールアドレス"
            value = {email}
            margin = "dense"
            onChange = {event => setEmail(event.target.value)}

          />
          <TextField
            variant='outlined'
            required
            fullWidth
            label = "パスワード"
            type = "password"
            value = {password}
            margin = "dense"
            autoComplete='current-password'
            onChange = {event => setPassword(event.target.value)}
          />
          <TextField
            variant='outlined'
            required
            fullWidth
            label = "パスワード（確認）"
            type = "password"
            value = {passwordConfirmation}
            margin = "dense"
            autoComplete='current-password'
            onChange = {event => setPasswordConfirmation(event.target.value)}

          />
          <Button
            type = "submit"
            variant = "contained"
            size='large'
            fullWidth
            disabled = {!name || !email || !password || !passwordConfirmation ? true:false}
            className = {classes.submitBtn}
            onClick={handleSubmit}
          >
            アカウントを作成
          </Button>
          <Box textAlign="center" className={classes.box}>
              <Typography variant='body2'>
                  既にアカウントをお持ちですか？ &nbsp;
                <Link href="/SignIn">
                  ログイン
                </Link>
              </Typography>
            </Box>

        </CardContent>
      </Card>
    </ form>
    </>
  )
}

export default SignUp

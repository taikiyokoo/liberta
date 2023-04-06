import { makeStyles, Theme, useTheme } from '@material-ui/core'
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography, useColorScheme } from '@mui/material'
import { SignInParams } from 'interfaces'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { signIn } from './api/auth'
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
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

const SignIn: React.FC = () => {

  const router = useRouter()
  const classes = useStyles()

  // フォームの内容をuseStateで管理
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")

  // 認証用context
  const {setIsSignedIn,setCurrentUser} = useContext(AuthContext)

  // ログイン実行処理
  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()

    const params: SignInParams={
      email: email,
      password: password
    }

    try{
      const res = await signIn(params)

      if(res.status === 200){
        Cookies.set("_access_token",res.headers["access-token"])
        Cookies.set("_client",res.headers["client"])
        Cookies.set("_uid",res.headers["uid"])
        
        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.push("/")

        console.log("successed in signIn!")

      }else{
        console.log("エラーが発生しました")
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="ログイン"/>
          <CardContent>
            <TextField
              variant='outlined'
              required
              fullWidth
              label= "メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
              />
            <TextField
              variant='outlined'
              required
              fullWidth
              label= "パスワード"
              type="password"
              placeholder='At least 6 characters'
              value={password}
              margin="dense"
              autoComplete='current-password'
              onChange={event => setPassword(event.target.value) }
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              disabled={!email || !password ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              ログインする
            </Button>
            <Box textAlign="center" className={classes.box}>
              <Typography variant='body2'>
                  アカウントをお持ちではないですか？ &nbsp;
                <Link href="/SignUp">
                  アカウントを作成
                </Link>
              </Typography>
            </Box>
          </CardContent>

        </Card>

    </form>
    </>
  )
}

export default SignIn

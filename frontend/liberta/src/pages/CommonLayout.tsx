import React from "react"
import Header from "./Header"
import { Container, Grid } from "@mui/material"
import { makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme:Theme) => ({
  container: {
    overflow: "hidden",
    minWidth: "100vw"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
    <header>
      <Header />
    </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justifyContent ="center">
            <Grid item>
              {children}
            </Grid>   
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CommonLayout
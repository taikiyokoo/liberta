import { Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'

import React from 'react'


interface AlertMessageProps {
  open: boolean
  setOpen: Function
  severity: "error" | "success" | "info" | "warning"
  message: string
}

const AlertMessage = ({ open, setOpen, severity, message}: AlertMessageProps) => {

  const handleCloseAlertMessage = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return

    setOpen(false)
  }

  return (
    <>
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseAlertMessage}
      >
        <Alert onClose={handleCloseAlertMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      
    </>
  )
}

export default AlertMessage

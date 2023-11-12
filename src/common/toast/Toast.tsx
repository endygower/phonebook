import { Alert, Snackbar } from '@mui/material'

interface Props {
  open: boolean
  message: string
  onClose: () => void
}

export default function Toast(props: Props) {
  const { open, message, onClose } = props

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={3000}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

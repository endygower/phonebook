import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { css, Button, Card, IconButton, Typography } from '@mui/material'

type Props = {
  children: ReactNode
  title: string
  onClose: () => void
  onProceed?: () => void
}

export default function Popup(props: Props) {
  return (
    <Card css={styles.card}>
      <IconButton
        aria-label={`Close Modal`}
        css={styles.closeIcon}
        onClick={() => props.onClose()}
      >
        <CloseIcon />
      </IconButton>
      <div css={styles.title}>
        <Typography variant="h2">{props.title}</Typography>
      </div>
      {props.children}
      <div css={styles.buttonSection}>
        <Button onClick={() => props.onClose()}>Cancel</Button>
        <Button onClick={() => props.onProceed?.()} variant="contained">
          Yes
        </Button>
      </div>
    </Card>
  )
}

const styles = {
  card: css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 16,
    zIndex: 10,
    // todo: handle for desktop
    width: '90%',
  }),
  closeIcon: css({
    position: 'absolute',
    top: 8,
    right: 8,
    cursor: 'pointer',
  }),
  title: css({
    marginBottom: 24,
  }),
  buttonSection: css({
    marginTop: 24,
    display: 'flex',
    width: '100%',
    flexShrink: 1,
    justifyContent: 'flex-end',
    gap: 16,
  }),
}

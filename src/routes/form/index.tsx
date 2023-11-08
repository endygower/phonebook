import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import { css, Button, IconButton, TextField } from '@mui/material'

import Header from './components/Header'

export function Component() {
  return (
    <div css={styles.root}>
      <Header />

      <div css={styles.content}>
        <section css={styles.section}>
          <PersonOutlineRoundedIcon css={styles.icon} />
          <div css={styles.grid}>
            <TextField label="First name" variant="outlined" size="small" />
            <div />
            <TextField label="Last name" variant="outlined" size="small" />
            <div />
          </div>
        </section>

        <section css={styles.section}>
          <PhoneRoundedIcon css={styles.icon} />
          <div css={styles.grid}>
            <TextField label="Phone" variant="outlined" size="small" />
            <IconButton aria-label="Remove phone">
              <CloseRoundedIcon />
            </IconButton>

            <Button startIcon={<AddRoundedIcon />}>Add phone</Button>
          </div>
        </section>
      </div>
      <div css={styles.action}>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  )
}

const styles = {
  root: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),
  content: css({
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  }),
  action: css({
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    marginTop: 'auto',
    position: 'sticky',
    bottom: 0,
    background: '#fff',
    zIndex: 1,
  }),

  section: css({
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  }),
  grid: css({
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 40px',
    rowGap: 16,
  }),
  icon: css({
    marginTop: 8,
  }),
}

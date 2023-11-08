import AddIcon from '@mui/icons-material/Add'
import { AppBar, IconButton, Toolbar, Typography, css } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" css={styles.title}>
          Contacts
        </Typography>
        <IconButton
          component={Link}
          to="/add"
          aria-label="Add new contact"
          color="inherit"
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const styles = {
  title: css({ flexGrow: 1 }),
}

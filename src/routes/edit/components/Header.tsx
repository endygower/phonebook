import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          aria-label="Go back to contact list"
          color="inherit"
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Typography variant="h1">
          Edit contact
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

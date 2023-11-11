import SearchIcon from '@mui/icons-material/Search'
import { css, InputAdornment, OutlinedInput } from '@mui/material'

export default function Search() {
  return (
    <div css={styles.root}>
      <OutlinedInput
        size="small"
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  )
}

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  }),
}

import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import SearchIcon from '@mui/icons-material/Search'
import { css, InputAdornment, OutlinedInput } from '@mui/material'

import { useSearchDispatch } from '../contexts/search'

export default function Search() {
  const dispatch = useSearchDispatch()
  const [state, setState] = useState('')

  const debouncedValue = useDebounce(state, 100)
  useEffect(() => dispatch(debouncedValue), [debouncedValue])

  return (
    <div css={styles.root}>
      <OutlinedInput
        size="small"
        placeholder="Search..."
        onChange={(e) => setState(e.target.value)}
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

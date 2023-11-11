import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

import components from './components'
import typography from './typography'

const theme = extendTheme({
  components,
  typography,
})

export default theme

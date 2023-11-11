import { CssVarsThemeOptions } from '@mui/material'

import muiAppBar from './appBar'
import muiCard from './card'
import muiCardAction from './cardAction'
import muiOutlinedInput from './outlinedInput'

const components: CssVarsThemeOptions['components'] = Object.assign(
  {},
  muiAppBar,
  muiCard,
  muiCardAction,
  muiOutlinedInput
)

export default components

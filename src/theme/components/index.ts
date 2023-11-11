import { CssVarsThemeOptions } from '@mui/material'

import muiAppBar from './appBar'
import muiButton from './button'
import muiCard from './card'
import muiCardAction from './cardAction'
import muiOutlinedInput from './outlinedInput'

const components: CssVarsThemeOptions['components'] = Object.assign(
  {},
  muiAppBar,
  muiButton,
  muiCard,
  muiCardAction,
  muiOutlinedInput
)

export default components

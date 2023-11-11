import { CssVarsThemeOptions } from '@mui/material'

import muiCard from './card'
import muiCardAction from './cardAction'
import muiOutlinedInput from './outlinedInput'

const components: CssVarsThemeOptions['components'] = Object.assign(
  {},
  muiCard,
  muiCardAction,
  muiOutlinedInput
)

export default components

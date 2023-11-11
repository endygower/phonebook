import { CssVarsThemeOptions } from '@mui/material'

import muiCard from './card'
import muiCardAction from './cardAction'

const components: CssVarsThemeOptions['components'] = Object.assign(
  {},
  muiCard,
  muiCardAction
)

export default components

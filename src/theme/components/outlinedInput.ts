import { CssVarsThemeOptions } from '@mui/material'

const components: CssVarsThemeOptions['components'] = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
}

export default components

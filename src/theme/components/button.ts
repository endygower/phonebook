import { CssVarsThemeOptions } from '@mui/material'

const components: CssVarsThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: 8,
        textTransform: 'none',
      },
    },
  },
}

export default components

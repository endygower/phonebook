import { CssVarsThemeOptions } from '@mui/material'

const components: CssVarsThemeOptions['components'] = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.15)',
      },
    },
  },
}

export default components

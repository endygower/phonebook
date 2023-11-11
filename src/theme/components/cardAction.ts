import { CssVarsThemeOptions } from '@mui/material'

const components: CssVarsThemeOptions['components'] = {
  MuiCardActions: {
    styleOverrides: {
      root: {
        '> button': {
          minWidth: '16px',
        },
        '>:not(:first-of-type)': {
          marginLeft: 0,
        },
        padding: 2,
      },
    },
  },
}

export default components

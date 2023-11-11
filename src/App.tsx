import { createHashRouter, RouterProvider } from 'react-router-dom'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material'
import theme from '~/theme'

const router = createHashRouter([
  { path: '/', lazy: () => import('./routes/list') },
  { path: '/add', lazy: () => import('./routes/form') },
  { path: '/edit/:id', lazy: () => import('./routes/form') },
])

const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </CssVarsProvider>
    </ApolloProvider>
  )
}

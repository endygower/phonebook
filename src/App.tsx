import { createHashRouter, RouterProvider } from 'react-router-dom'
import theme from '~/theme'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material'

import { ModalProvider } from './common/modal/ModalProvider'
import { ToastProvider } from './common/toast/ToastProvider'

const router = createHashRouter([
  { path: '/', lazy: () => import('./routes/list') },
  { path: '/add', lazy: () => import('./routes/add') },
  { path: '/edit/:id', lazy: () => import('./routes/edit') },
])

const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          contact: offsetLimitPagination(['where']),
        },
      },
    },
  }),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CssVarsProvider theme={theme}>
        <ModalProvider>
          <ToastProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </ToastProvider>
        </ModalProvider>
      </CssVarsProvider>
    </ApolloProvider>
  )
}

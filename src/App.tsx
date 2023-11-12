import { createHashRouter, RouterProvider } from 'react-router-dom'
import theme from '~/theme'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material'

import { ModalProvider } from './common/modal/ModalProvider'
import { ToastProvider } from './common/toast/ToastProvider'
import { useEffect, useState } from 'react'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'

const router = createHashRouter([
  { path: '/', lazy: () => import('./routes/list') },
  { path: '/add', lazy: () => import('./routes/add') },
  { path: '/edit/:id', lazy: () => import('./routes/edit') },
])

export default function App() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              contact: offsetLimitPagination(['where']),
            },
          },
        },
      })
      const newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      })

      await newPersistor.restore()

      setClient(
        new ApolloClient({
          uri: 'https://wpe-hiring.tokopedia.net/graphql',
          cache,
        })
      )
    }

    init().catch(console.error)
  }, [])

  if (!client) return null

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

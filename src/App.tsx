import { createHashRouter, RouterProvider } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

const router = createHashRouter([
  { path: '/', lazy: () => import('./routes/list') },
  { path: '/add', lazy: () => import('./routes/form') },
  { path: '/edit/:id', lazy: () => import('./routes/form') },
])

export default function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  )
}

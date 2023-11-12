import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import Toast from './Toast'

type Action = (message: string) => void

const Context = createContext<Action>(() => {})

export function ToastProvider(props: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const action = useCallback((message: string) => {
    setMessage(message)
    setOpen(true)
  }, [])

  return (
    <Context.Provider value={action}>
      {props.children}
      {open && (
        <Toast open={open} onClose={() => setOpen(false)} message={message} />
      )}
    </Context.Provider>
  )
}

export function useToast() {
  return useContext(Context)
}

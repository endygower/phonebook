import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useMemo,
} from 'react'

import Popup from './Popup'

interface Action {
  showConfirmationModal: (config: ModalConfig) => void
  closeModal: () => void
}

const Context = createContext<Action>({
  showConfirmationModal() {},
  closeModal() {},
})

interface ModalConfig {
  content: string
  onConfirm: () => void
}

export function ModalProvider(props: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<ModalConfig>({
    content: '',
    onConfirm() {},
  })

  const action = useMemo(
    () => ({
      showConfirmationModal(config: ModalConfig): void {
        setOpen(true)
        setConfig(config)
      },
      closeModal() {
        setOpen(false)
      },
    }),
    []
  )

  return (
    <Context.Provider value={action}>
      {props.children}
      {open && (
        <Popup
          onClose={() => setOpen(false)}
          title="Confirmation"
          onProceed={config.onConfirm}
        >
          {config.content}
        </Popup>
      )}
    </Context.Provider>
  )
}

export function useModal() {
  return useContext(Context)
}

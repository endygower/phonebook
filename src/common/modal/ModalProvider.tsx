import { createContext, useContext, useState, PropsWithChildren } from 'react'

import { css } from '@mui/material'

import Popup from './Popup'

const ModalContext = createContext<{
  showConfirmationModal: (config: ModalConfig) => void
  closeModal: () => void
}>({
  showConfirmationModal: () => {},
  closeModal: () => {},
})

type ModalConfig = {
  content: string
  onConfirm: () => void
}

export function ModalProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<ModalConfig>()

  function showConfirmationModal(config: ModalConfig): void {
    setOpen(true)
    setConfig(config)
  }
  function closeModal() {
    setOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{
        showConfirmationModal,
        closeModal,
      }}
    >
      {children}
      {open && <div css={styles.overlay} />}
      {open && (
        <Popup
          onClose={() => setOpen(false)}
          title={'Confirmation'}
          onProceed={config?.onConfirm}
        >
          {config?.content}
        </Popup>
      )}
    </ModalContext.Provider>
  )
}

const styles = {
  overlay: css({
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 2,
    overflow: 'hidden',
  }),
}

export function useModal() {
  return useContext(ModalContext)
}

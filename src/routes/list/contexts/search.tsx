import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { createContext, useContext } from 'react'

const ValueContext = createContext('')
const DispatchContext = createContext<Dispatch<SetStateAction<string>>>(
  () => {}
)

export function SearchProvider(props: PropsWithChildren) {
  const [state, dispatch] = useState('')

  return (
    <ValueContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ValueContext.Provider>
  )
}

export function useSearchValue() {
  return useContext(ValueContext)
}

export function useSearchDispatch() {
  return useContext(DispatchContext)
}

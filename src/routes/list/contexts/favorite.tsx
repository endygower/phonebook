import { PropsWithChildren, createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface Value {
  values: number[]
  set: Set<number>
}

interface Action {
  add(id: number): void
  remove(id: number): void
}

const ValuesContext = createContext<Value>({
  values: [],
  set: new Set(),
})
const ActionContext = createContext<Action>({
  add() {},
  remove() {},
})

export function FavoriteProvider(props: PropsWithChildren) {
  const [values, setValues] = useLocalStorage<number[]>('favorite', [])

  const contextValue = useMemo(
    () => ({
      values,
      set: new Set(values),
    }),
    [values]
  )

  const action = useMemo(
    () => ({
      add(id: number) {
        setValues((values) => values.concat(id))
      },
      remove(id: number) {
        setValues((values) => values.filter((value) => value !== id))
      },
    }),
    []
  )

  return (
    <ValuesContext.Provider value={contextValue}>
      <ActionContext.Provider value={action}>
        {props.children}
      </ActionContext.Provider>
    </ValuesContext.Provider>
  )
}

export function useFavorite() {
  return useContext(ValuesContext)
}

export function useFavoriteAction() {
  return useContext(ActionContext)
}

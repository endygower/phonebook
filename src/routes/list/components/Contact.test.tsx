import { PropsWithChildren } from 'react'
import { HashRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'

import Contact from './Contact'
import { afterEach } from 'node:test'
import { FavoriteProvider } from '../contexts/favorite'

function Providers(props: PropsWithChildren) {
  return (
    <HashRouter>
      <MockedProvider>
        <FavoriteProvider>{props.children}</FavoriteProvider>
      </MockedProvider>
    </HashRouter>
  )
}

describe('App', () => {
  const mock = {
    id: 1,
    first_name: 'lorem',
    last_name: 'ipsum',
    phones: [{ number: 'my phone number' }],
  }
  const addLabel = 'Add lorem ipsum to favorite'
  const removeLabel = 'Remove lorem ipsum from favorite'

  afterEach(() => {
    localStorage.clear()
  })

  it('renders correctly', () => {
    render(<Contact contact={mock} />, { wrapper: Providers })

    const name = screen.getByText('lorem ipsum')
    expect(name).toBeInTheDocument()

    const phones = screen.getByText('my phone number')
    expect(phones).toBeInTheDocument()

    const addTofavorite = screen.getByLabelText(addLabel)
    expect(addTofavorite).toBeInTheDocument()

    const removeFromfavorite = screen.queryByLabelText(removeLabel)
    expect(removeFromfavorite).not.toBeInTheDocument()
  })

  it('renders remove from favorite action', () => {
    localStorage.setItem('favorite', JSON.stringify([1]))

    render(<Contact contact={mock} />, { wrapper: Providers })

    const addTofavorite = screen.queryByLabelText(addLabel)
    expect(addTofavorite).not.toBeInTheDocument()

    const removeFromfavorite = screen.getByLabelText(removeLabel)
    expect(removeFromfavorite).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from '../loading'

describe('Loading Component', () => {
  it('renderiza el mensaje de carga', () => {
    render(<Loading />)
    expect(screen.getByText('Escaneando tu sitio...')).toBeInTheDocument()
  })

  it('renderiza la progress bar', () => {
    render(<Loading />)
    const progressBar = document.querySelector('.progress-bar')
    expect(progressBar).toBeInTheDocument()
  })

  it('renderiza el spinner', () => {
    render(<Loading />)
    const spinner = document.querySelector('.spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('renderiza el hint de tiempo', () => {
    render(<Loading />)
    expect(screen.getByText(/menos de 30 segundos/)).toBeInTheDocument()
  })
})
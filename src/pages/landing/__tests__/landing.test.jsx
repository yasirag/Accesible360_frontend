import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Landing from '../landing'

describe('Landing Component', () => {
  it('renderiza el título', () => {
    render(<Landing onAudit={() => {}} error={null} />)
    expect(screen.getByText('Accesible360')).toBeInTheDocument()
  })

  it('renderiza el input de URL', () => {
    render(<Landing onAudit={() => {}} error={null} />)
    const input = screen.getByPlaceholderText(/ejemplo.com/)
    expect(input).toBeInTheDocument()
  })

  it('renderiza el botón Auditar', () => {
    render(<Landing onAudit={() => {}} error={null} />)
    expect(screen.getByRole('button', { name: /Auditar/ })).toBeInTheDocument()
  })

  it('valida URL inválida', () => {
    render(<Landing onAudit={() => {}} error={null} />)
    const input = screen.getByPlaceholderText(/ejemplo.com/)
    const button = screen.getByRole('button', { name: /Auditar/ })

    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.click(button)

    expect(screen.getByText(/La URL no es válida/)).toBeInTheDocument()
  })

  it('llama onAudit con URL válida', () => {
    const onAudit = vi.fn()
    render(<Landing onAudit={onAudit} error={null} />)

    const input = screen.getByPlaceholderText(/ejemplo.com/)
    const button = screen.getByRole('button', { name: /Auditar/ })

    fireEvent.change(input, { target: { value: 'example.com' } })
    fireEvent.click(button)

    expect(onAudit).toHaveBeenCalledWith('https://example.com')
  })

  it('muestra error cuando existe', () => {
    const errorMsg = 'Fallo al auditar'
    render(<Landing onAudit={() => {}} error={errorMsg} />)
    expect(screen.getByText(new RegExp(errorMsg))).toBeInTheDocument()  })
})
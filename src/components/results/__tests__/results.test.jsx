import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Results from '../results'

const mockData = {
  domain: 'example.com',
  url: 'https://example.com',
  score_overall: 75,
  indicators: {
    forms: {
      indicator: 'forms',
      violations: 2,
      elements: ['input', 'select'],
      wcag_criterion: '3.3.2',
    },
    headings: {
      indicator: 'headings',
      violations: 0,
      elements: [],
      wcag_criterion: '1.3.1',
    },
    links: {
      indicator: 'links',
      violations: 1,
      elements: ['a'],
      wcag_criterion: '2.4.4',
    },
  },
}

describe('Results Component', () => {
  it('renderiza el dominio', () => {
    render(<Results data={mockData} onNewAudit={() => {}} />)
    expect(screen.getByText('example.com')).toBeInTheDocument()
  })

  it('renderiza el score', () => {
    render(<Results data={mockData} onNewAudit={() => {}} />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('renderiza los indicadores', () => {
    render(<Results data={mockData} onNewAudit={() => {}} />)
    expect(screen.getByText('Formularios')).toBeInTheDocument()
    expect(screen.getByText('Encabezados')).toBeInTheDocument()
    expect(screen.getByText('Enlaces')).toBeInTheDocument()
  })

  it('abre modal al clickear indicador', () => {
    render(<Results data={mockData} onNewAudit={() => {}} />)
    const formCard = screen.getByText('Formularios')
    fireEvent.click(formCard)
    expect(screen.getByText('3.3.2')).toBeInTheDocument()
  })

  it('renderiza botón Nueva Auditoría', () => {
    render(<Results data={mockData} onNewAudit={() => {}} />)
    expect(screen.getByRole('button', { name: /Nueva Auditoría/ })).toBeInTheDocument()
  })

  it('llama onNewAudit al clickear botón', () => {
    const onNewAudit = vi.fn()
    render(<Results data={mockData} onNewAudit={onNewAudit} />)
    const button = screen.getByRole('button', { name: /Nueva Auditoría/ })
    fireEvent.click(button)
    expect(onNewAudit).toHaveBeenCalled()
  })
})
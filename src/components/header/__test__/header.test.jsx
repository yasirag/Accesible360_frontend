import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../header";

describe("Header Component", () => {
 it("renderiza el logo", () => {
  render(<Header />)
  expect(screen.getByText('Accesible360')).toBeInTheDocument()
})

it("NO renderiza dominio sin prop", () => {
  render(<Header />)
  expect(screen.queryByText(/\//)).not.toBeInTheDocument()
})

it("renderiza dominio cuando se pasa", () => {
  render(<Header domain="ejemplo.com" />)
  expect(screen.getByText('/ ejemplo.com')).toBeInTheDocument()
})

it("renderiza el link Dashboard", () => {
  render(<Header />)
  expect(screen.getByText('Dashboard')).toBeInTheDocument()
})

it("renderiza botones de acción", () => {
  render(<Header />)
  expect(screen.getByRole('button', { name: /Compartir auditoría/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Perfil de usuario/ })).toBeInTheDocument()
})
});

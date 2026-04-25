import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Login from "./Login"

// ✅ Shared mocks (important)
const mockLogin = vi.fn()
const mockNavigate = vi.fn()

// ✅ Mock dependencies
vi.mock("../auth/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin
  })
}))

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}))

describe("Login", () => {

  // ✅ 1. Render test
  it("renders login page", () => {
    render(<Login />)

    expect(screen.getByText("Bank Login")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
  })

  // ✅ 2. Validation test (EMPTY SUBMIT)
  it("shows validation errors on submit", async () => {
    render(<Login />)

    fireEvent.click(screen.getByRole("button", { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText("Customer ID is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
    })
  })

  // ✅ 3. Invalid Customer ID format
  it("shows error for invalid customerId format", async () => {
    render(<Login />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "abc" }
    })

    fireEvent.click(screen.getByRole("button", { name: /login/i }))

    await waitFor(() => {
      expect(
        screen.getByText("Invalid Customer ID format")
      ).toBeInTheDocument()
    })
  })

  // ✅ 4. Navigation test
  it("navigates to dashboard on successful login", async () => {
    mockLogin.mockResolvedValue({})

    render(<Login />)

    const customerInput = document.querySelector('input[name="customerId"]')
    const passwordInput = document.querySelector('input[name="password"]')

    fireEvent.change(customerInput, {
      target: { value: "123456789" }
    })

    fireEvent.change(passwordInput, {
      target: { value: "password123" }
    })

    fireEvent.click(screen.getByRole("button", { name: /login/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("123456789", "password123")
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
    })
  })

})
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Favorite from "../components/Favorite";

// 🔹 Mock API services
vi.mock("../services/api", () => ({
  getPayees: vi.fn(() =>
    Promise.resolve([
      { id: 1, name: "John", account: "123", bank: "HDFC" },
    ])
  ),
  addPayee: vi.fn(() => Promise.resolve()),
  deletePayee: vi.fn(() => Promise.resolve()),
}));

// 🔹 Mock debounce hook (avoid delay issues)
vi.mock("../hooks/useDebounce", () => ({
  default: (val) => val,
}));

// 🔹 Mock child components (avoid AntD complexity)
vi.mock("../components/tableComponent", () => ({
  default: ({ payees }) => (
    <div data-testid="table">{payees.length} rows</div>
  ),
}));

vi.mock("../components/PayeeModal", () => ({
  default: () => <div data-testid="modal">Modal</div>,
}));

describe("Favorite Component", () => {
  
  // ✅ 1. Renders title
  it("renders page title", () => {
    render(<Favorite />);
    expect(screen.getByText(/Favourite payees/i)).toBeInTheDocument();
  });

  // ✅ 2. Shows search input
  it("renders search input", () => {
    render(<Favorite />);
    expect(
      screen.getByPlaceholderText(/search by payee/i)
    ).toBeInTheDocument();
  });

  // ✅ 3. Add button exists
  it("renders add payee button", () => {
    render(<Favorite />);
    expect(screen.getByText(/add payee/i)).toBeInTheDocument();
  });

  // ✅ 4. Table renders after data fetch
  it("renders table with data", async () => {
    render(<Favorite />);
    expect(await screen.findByTestId("table")).toBeInTheDocument();
  });

  // ✅ 5. Search input updates value
  it("updates search input value", () => {
    render(<Favorite />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "john" } });

    expect(input.value).toBe("john");
  });

  // ✅ 6. Shows empty state when no data
  // it("shows empty state when no payees", async () => {
  //   const { getPayees } = await import("../services/api");

  //   getPayees.mockResolvedValueOnce([]);

  //   render(<Favorite />);

  //   expect(await screen.findByText(/no payees available/i)).toBeInTheDocument();
  // });

});
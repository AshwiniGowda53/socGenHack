import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PayeeModal from "../components/PayeeModal";

// 🔹 Mock antd message (avoid warnings)
vi.mock("antd", async () => {
  const actual = await vi.importActual("antd");
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe("PayeeModal", () => {
  const mockClose = vi.fn();
  const mockSubmit = vi.fn(() => Promise.resolve());

  // ✅ 1. Renders modal title (Add mode)
  it("renders Add Payee title", () => {
    render(
      <PayeeModal
        isOpen={true}
        onClose={mockClose}
        onSubmit={mockSubmit}
        editingPayee={null}
      />
    );

    expect(screen.getByText(/Add New Payee/i)).toBeInTheDocument();
  });

  // ✅ 2. Renders Edit mode correctly
  it("renders Edit Payee title", () => {
    render(
      <PayeeModal
        isOpen={true}
        onClose={mockClose}
        onSubmit={mockSubmit}
        editingPayee={{
          name: "John",
          account: "1234567890",
          bank: "HDFC",
        }}
      />
    );

    expect(screen.getByText(/Edit Payee Details/i)).toBeInTheDocument();
  });

  // ✅ 3. Inputs are present
  it("renders all input fields", () => {
    render(
      <PayeeModal
        isOpen={true}
        onClose={mockClose}
        onSubmit={mockSubmit}
        editingPayee={null}
      />
    );

    expect(screen.getByPlaceholderText(/enter payee name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter account number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter bank name/i)).toBeInTheDocument();
  });

  // ✅ 4. Cancel button works
  it("calls onClose when cancel is clicked", () => {
    render(
      <PayeeModal
        isOpen={true}
        onClose={mockClose}
        onSubmit={mockSubmit}
        editingPayee={null}
      />
    );

    fireEvent.click(screen.getByText(/cancel/i));

    expect(mockClose).toHaveBeenCalled();
  });

});
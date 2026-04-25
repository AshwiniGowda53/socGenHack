import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TableComponent from "../components/TableComponent";

const mockPayees = [
  {
    id: 1,
    name: "John Doe",
    account: "123456",
    bank: "BBVA",
  },
];

describe("TableComponent", () => {
  const mockEdit = vi.fn();
  const mockDelete = vi.fn();

  // ✅ 1. Render test (stable)
  it("renders payee data correctly", async () => {
    render(
      <TableComponent
        payees={mockPayees}
        onEdit={mockEdit}
        onDelete={mockDelete}
        loading={false}
      />
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123456")).toBeInTheDocument();
    expect(screen.getByText("BBVA")).toBeInTheDocument();
  });

  // ✅ 2. Edit button works (stable)
  it("calls onEdit when edit button is clicked", async () => {
    render(
      <TableComponent
        payees={mockPayees}
        onEdit={mockEdit}
        onDelete={mockDelete}
        loading={false}
      />
    );

    const buttons = await screen.findAllByRole("button");

    fireEvent.click(buttons[0]); // first button = edit

    expect(mockEdit).toHaveBeenCalledTimes(1);
  });

  // ✅ 3. Table renders even when empty (stable)
  it("renders table with empty data", () => {
    render(
      <TableComponent
        payees={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        loading={false}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  // ✅ 4. Loading state renders (stable)
  it("renders loading state", () => {
    render(
      <TableComponent
        payees={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        loading={true}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import MainTemplate from "./MainTemplate";
import "@testing-library/jest-dom";

describe("MainTemplate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders input field and buttons", () => {
    render(<MainTemplate />);

    expect(screen.getByPlaceholderText("Add a new task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByText("Remove Completed Tasks")).toBeInTheDocument();
  });

  test("adds a new task", () => {
    render(<MainTemplate />);

    const inputField = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(inputField, { target: { value: "Test Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("toggles task completion", () => {
    render(<MainTemplate />);

    const inputField = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(inputField, { target: { value: "Test Task" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("removes completed tasks", () => {
    render(<MainTemplate />);

    const inputField = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add Task");
    const removeButton = screen.getByText("Remove Completed Tasks");

    fireEvent.change(inputField, { target: { value: "Test Task" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    fireEvent.click(removeButton);

    console.log(screen.queryByText("Test Task"));

    expect(screen.queryByText("Test Task")).not.toBeInTheDocument();
  });
});

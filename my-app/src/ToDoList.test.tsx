import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import { dummyGroceryList } from "./constant";

describe("To-Do List CRUD Operations", () => {
  test("renders to-do list", () => {
    render(<ToDoList />);
    const item1 = screen.getByText("Apples");
    const item2 = screen.getByText("Bananas");
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  test("checks item off the list", () => {
    render(<ToDoList />);
    const checkbox = screen.getByLabelText("Apples");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  // Verifies the number of checked items is reflected in the title
  test("shows the correct number of checked items in the title", () => {
    render(<ToDoList />);

    const taskTitle = screen.getByText((content, element) => 
    element !== null && element.tagName.toLowerCase() === 'h3' && content.includes('Items bought: 0')
  );
    expect(taskTitle).toBeInTheDocument();
  });

  // Test for deleting an item by using data-testid
  test("deletes an item from the list", () => {
    render(<ToDoList />);

    // Find and click the delete button for the first item (Apples)
    const deleteButton = screen.getByTestId('delete-button-0');
    fireEvent.click(deleteButton);

    // The first item (Apples) should no longer be in the document
    expect(screen.queryByText("Apples")).toBeNull();
  });

  // Test for updating (toggling) a checkbox
  test("updates an item in the to-do list", () => {
    render(<ToDoList />);
    const checkbox = screen.getByLabelText("Bananas");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

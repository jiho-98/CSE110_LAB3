import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./StickyNotes";

describe("Sticky Notes CRUD Operations", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("updates a sticky note's content", () => {
    render(<StickyNotes />);
  
    const editButton = screen.getByTestId("edit-button-0"); // Assuming edit button exists for the first note
    fireEvent.click(editButton);
  
    const updatedContentTextarea = screen.getByPlaceholderText("Note Content");
    fireEvent.change(updatedContentTextarea, { target: { value: "Updated content" } });
  
    const saveButton = screen.getByText("Create Note");
    fireEvent.click(saveButton);
  
    expect(screen.getByText("Updated content")).toBeInTheDocument();
  });

  test("deletes a sticky note", () => {
    render(<StickyNotes />);

    // Create a note
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "Note to be deleted" } });
    fireEvent.change(contentTextarea, { target: { value: "This will be deleted" } });
    fireEvent.click(createButton);

    // Delete the note by clicking the delete button
    const deleteButton = screen.getByTestId("delete-button-6"); // Assuming the correct delete button for the note
    fireEvent.click(deleteButton);

    // Check if the note has been removed
    expect(screen.queryByText("Note to be deleted")).toBeNull();
  });
});

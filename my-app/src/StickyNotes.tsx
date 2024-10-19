import React, { useState } from "react";
import "./App.css";

export type NoteItem = {
  title: string;
  content: string;
  category: string;
  isFavorite: boolean;
};

export const dummyNoteList: NoteItem[] = [
  { title: "test note 1", content: "bla bla note1", category: "Other", isFavorite: true },
  { title: "test note 2", content: "bla bla note2", category: "Personal", isFavorite: false },
  { title: "test note 3", content: "bla bla note3", category: "Work", isFavorite: false },
  { title: "test note 4", content: "bla bla note4", category: "Study", isFavorite: false },
  { title: "test note 5", content: "bla bla note5", category: "Study", isFavorite: false },
  { title: "test note 6", content: "bla bla note6", category: "Personal", isFavorite: false }
];

export const StickyNotes = ({ notes: initialNotes = dummyNoteList }: { notes?: NoteItem[] }) => {
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("Other");

  const handleAddNote = () => {
    const newNote: NoteItem = {
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      isFavorite: false
    };
    setNotes([...notes, newNote]);
    setNoteTitle("");
    setNoteContent("");
    setNoteCategory("Other");
  };

  const toggleFavorite = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes[index].isFavorite = !updatedNotes[index].isFavorite;
    setNotes(updatedNotes);
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const favoriteNotes = notes.filter(note => note.isFavorite);

  return (
    <div className="app-container light">
      <div className="note-form-container">
        <form className="note-form" onSubmit={(e) => { e.preventDefault(); handleAddNote(); }}>
          <input
            type="text"
            placeholder="Note Title"
            value={noteTitle}
            onChange={e => setNoteTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Note Content"
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            required
          />
          <select
            value={noteCategory}
            onChange={e => setNoteCategory(e.target.value)}
          >
            <option value="Other">Other</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
          </select>
          <button type="submit">Create Note</button>
        </form>

        <div className="favorites" style={{ position: "absolute", bottom: 0, left: 0 }}>
          <h2>List of favorites:</h2>
          <ul>
            {favoriteNotes.length === 0 ? (
              <li>No favorite notes</li>
            ) : (
              favoriteNotes.map((note, index) => (
                <li key={index}>{note.title}</li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="notes-grid-container">
        <div className="notes-grid">
          {notes.map((note, index) => (
            <div key={index} className="note-item">
              <div className="notes-header">
                <button data-testid={`delete-button-${index}`} onClick={() => deleteNote(index)}>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.category}</p>
              <p>{note.isFavorite ? 'true' : 'false'}</p>
              <button data-testid={`edit-button-${index}`} onClick={() => toggleFavorite(index)}>
                {note.isFavorite ? "❤️" : "♡"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

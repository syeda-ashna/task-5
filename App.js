import React, { useState, useEffect } from 'react';
import './App.css';
import NotesList from './components/NotesList';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
    setNewNote({ title: note.title, content: note.content });
  };

  const updateNote = () => {
    if (editingNote && newNote.title.trim() && newNote.content.trim()) {
      setNotes(notes.map(note =>
        note.id === editingNote.id
          ? { ...note, title: newNote.title, content: newNote.content }
          : note
      ));
      setEditingNote(null);
      setNewNote({ title: '', content: '' });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📝 My Notes</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="note-form">
        <input
          type="text"
          placeholder="Note title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        {editingNote ? (
          <button onClick={updateNote}>Update Note</button>
        ) : (
          <button onClick={addNote}>Add Note</button>
        )}
        {editingNote && (
          <button onClick={() => { setEditingNote(null); setNewNote({ title: '', content: '' }); }}>Cancel</button>
        )}
      </div>
      <NotesList notes={filteredNotes} onEdit={editNote} onDelete={deleteNote} />
    </div>
  );
}

export default App;

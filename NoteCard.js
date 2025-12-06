import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteCard;

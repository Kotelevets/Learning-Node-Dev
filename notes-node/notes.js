const fs = require('fs');
const dataFile = './data/notes-data.json';

console.log('Starting notes.js...');

let fetchNotes = () => {
  try {
    let notesString = fs.readFileSync(dataFile);
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

let saveNotes = (notes) => {
  fs.writeFileSync(dataFile, JSON.stringify(notes));
};

// start addNote definition
// send the function definition to the variable
let addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  let duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};
// end addNote definition

let getAll = () => {
  console.log('Getting all notes');
};

let getNote = (title) => {
  console.log('Getting note', title);
};

let removeNote = (title) => {
  console.log('Removing note', title);
};

module.exports = {
  addNote,            // the same like - addNote: addNote, when the variable (value) name is equal to property name 
  getAll,
  getNote,
  removeNote
};

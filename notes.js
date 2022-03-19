const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  console.log("hiiii", notes);
  const duplicateNote = notes.find(() => {
    return notes.title === title;
  });
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
  } else {
    console.log("Title already taken");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });

  saveNotes(notesToKeep);

  if (notes.length !== notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.cyan("Your Notes"));
  for (const note of notes) {
    console.log(note.title);
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => {
    return note.title === title;
  });

  if (noteToRead) {
    console.log(chalk.cyan(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };

import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insert, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insert.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

describe("cli app", () => {
  test("newNote inserts data and returns it", async () => {
    const aNote = {
      content: "this is my note",
      id: 1,
      tags: ["hello"],
    };

    insert.mockResolvedValue(aNote);
    const result = await newNote(aNote.content, aNote.tags);
    expect(result.content).toEqual(aNote.content);
    expect(result.tags).toEqual(aNote.tags);
  });

  test("getAllNotes returns all notes", async () => {
    const db = {
      notes: ["note1", "note2", "note3"],
    };
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });

  test("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});

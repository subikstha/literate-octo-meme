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

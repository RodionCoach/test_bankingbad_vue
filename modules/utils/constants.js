import generateId from "./generateId";

const STORAGE_KEY = "board-data";
const SORT_ASC_KEY = "asc";
const SORT_DESC_KEY = "desc";

const initialState = [
  {
    id: generateId(),
    title: "TODO",
    cards: [
      {
        id: generateId(),
        title: "Add login form",
        description: "Design and build UI",
      },
      { id: generateId(), title: "Fix bug", description: "Auth flow issue" },
    ],
    sortOrder: SORT_ASC_KEY,
  },
  {
    id: generateId(),
    title: "In Progress",
    cards: [
      {
        id: generateId(),
        title: "Build card UI",
        description: "Make component editable",
      },
    ],
    sortOrder: SORT_ASC_KEY,
  },
  {
    id: generateId(),
    title: "Done",
    cards: [
      {
        id: generateId(),
        title: "Setup project",
        description: "Create base structure",
      },
    ],
    sortOrder: SORT_ASC_KEY,
  },
];

export { initialState, STORAGE_KEY, SORT_ASC_KEY, SORT_DESC_KEY };

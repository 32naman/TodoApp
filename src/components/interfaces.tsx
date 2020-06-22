export interface TodoItem {
  text: string;
  done: boolean;
  id: number;
}

export interface State {
  todos: TodoItem[];
  searchQuery: string;
  filteredTodos: TodoItem[] | null;
  date: string;
  hash:string|null;
  // todos: TodoItem[];
  listNum: number;
  totalLists: number;
  // searchQuery: string;
  // filteredTodos: TodoItem[] | null;
  // date: string;
  id_token: string | null;
  sharing: string;
}
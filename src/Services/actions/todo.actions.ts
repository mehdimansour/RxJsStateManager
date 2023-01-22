import { AppStoreInterface } from "../interfaces/store.interface";

export type AppAction = { [key: string]: (state: AppStoreInterface, payload: any) => AppStoreInterface };

export const TodoActionList: AppAction = {
    AddTodo: (state: AppStoreInterface, payload: any) => { return { ...state, todos: [...state.todos, payload] }; },
    RemoveTodo: (state: AppStoreInterface, payload: string) => { return { ...state, todos: state.todos.filter(todo => todo.id !== payload) }; },
    UpdateTodo: (state: AppStoreInterface, payload: any) => { return { ...state, todos: state.todos.map(todo => todo.id === payload.id ? payload : todo) }; },
};

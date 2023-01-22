import { Injectable } from '@angular/core';
import { TodoActionList, AppAction } from '../actions/todo.actions';
import { AppStoreInterface } from '../interfaces/store.interface';
import { TodoInterface } from '../interfaces/todo.interface';
import { StateService } from './state.service';

const initialState: AppStoreInterface = {
  todos: []
};

@Injectable({
  providedIn: 'root'
})
export class TodoStateService extends StateService<AppStoreInterface> {

  constructor() {
    super(initialState);
    this.setDispatchers();
  }

  setDispatchers(): void {
    for (const [key, action] of Object.entries(TodoActionList)) {
      this.handlers.set(key, action);
    }
  }
}

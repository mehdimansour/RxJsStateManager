import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoInterface } from 'src/Services/interfaces/todo.interface';
import { TodoStateService } from 'src/Services/Store/todo-state.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListItemComponent {

  @Input() todo = {} as unknown as TodoInterface;
  constructor(private todoStateService:TodoStateService) { }

  ngOnInit() {
  }

  updateTodoImportance(todo: TodoInterface) {
    this.todoStateService.dispatch({ type: "UpdateTodo", payload: { ...todo, isImportant: !this.todo.isImportant } });
  }
  deleteThisTodo(todoId: string) {  
    this.todoStateService.dispatch({ type: "RemoveTodo", payload: todoId });
  }

}

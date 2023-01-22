import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoInterface } from 'src/Services/interfaces/todo.interface';
import { TodoStateService } from 'src/Services/Store/todo-state.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  todoForm: FormGroup;
  $todos = [] as unknown as Observable<TodoInterface[]>;

  constructor(private formBuilder: FormBuilder, private todoStateService: TodoStateService) {
    this.todoForm = this.formBuilder.group({
      description: ['', [Validators.required,Validators.maxLength(150)]],
      isImportant: [false]
    });
    this.$todos = todoStateService.select(state => state.todos);
  }

  ngOnInit() {
  }

  addTodoToState() {
    this.todoStateService.dispatch({ type: "AddTodo", payload: { id: uuidv4(), ...this.todoForm.value } });
    this.todoForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;

  constructor() { }

  ngOnInit() {
    this.beforeEditCache = '';
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'completed': false,
        'editing': false,
        'date': new Date()
      },
      {
        'id': 2,
        'title': 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque culpa beatae commodi magni vero consequatur eligendi, accusamus excepturi corrupti voluptatem nihil asperiores iste deserunt inventore minima accusantium veritatis in quibusdam?',
        'completed': false,
        'editing': false,
        'date': new Date()
      },
      {
        'id': 3,
        'title': 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
        'completed': false,
        'editing': false,
        'date': new Date()
      }
    ];

    this.idForTodo = this.todos
      .reduce((acc, item) => {
        return acc > item.id ? acc : item.id
      }, Number.MIN_SAFE_INTEGER) + 1;
  }

  // добавить задачу в массив.
  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
      date: new Date()
    })

    this.todoTitle = '';
    this.idForTodo++;
  }

  // редактировать задачу.
  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  // применить редактирование.
  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    todo.editing = false;
  }

  // отменить редактирование.
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  // отметить задачу.
  checkTodo(todo: Todo): void {
    todo.completed === false ? todo.completed = true : todo.completed = false;
  }

  // удалить задачу.
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // возвращает количество невыполненных задач.
  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  // возвращает true, если количество выполненных задач больше нуля.
  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  // удалить выполненные задачи.
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // получить количество выполненных задач.
  get completedTodos(): Array<Todo> {
    return this.todos.filter(todo => todo.completed);
  }

  // сортирует задачи по дате добавления.
  get sortedTodos(): Array<Todo> {
    return this.todos.sort((a, b) => {
      return b.date.getTime() - a.date.getTime()
    });
  }

  // отметить все задачи.
  checkAllTodos(): void {
    let one = this.todos.some(todo => todo.completed);

    this.todos.forEach(todo => {
      todo.completed = one ? false : true;
    })
  }

}

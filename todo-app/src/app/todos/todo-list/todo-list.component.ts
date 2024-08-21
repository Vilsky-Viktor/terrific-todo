import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from '../../core/todo.service';
import { Todo } from '../../core/todo.model';
import { TodoEditDialogComponent } from '../todo-edit-dialog/todo-edit-dialog.component';
import { TodoDeleteDialogComponent } from '../todo-delete-dialog/todo-delete-dialog.component';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  gridCols: number = 1;

  constructor(private todoService: TodoService, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Small]) {
        this.gridCols = 1;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.gridCols = 2;
      } else if (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
        this.gridCols = 3;
      }
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  openEditDialog(todo?: Todo): void {
    const dialogRef = this.dialog.open(TodoEditDialogComponent, {
      width: '500px',
      data: todo ? { ...todo } : { title: '', done: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._id) {
          this.todoService.updateTodo(result._id, result).subscribe(() => this.loadTodos());
        } else {
          this.todoService.createTodo(result).subscribe(() => this.loadTodos());
        }
      }
    });
  }

  openDeleteDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDeleteDialogComponent, {
      width: '300px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(todo._id!).subscribe(() => this.loadTodos());
      }
    });
  }

  toggleTodoStatus(todo: Todo): void {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo._id!, todo).subscribe(() => this.loadTodos());
  }
}
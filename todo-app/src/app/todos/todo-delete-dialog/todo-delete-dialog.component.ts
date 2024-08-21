import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../../core/todo.model';

@Component({
  selector: 'app-todo-delete-dialog',
  templateUrl: './todo-delete-dialog.component.html',
  styleUrls: ['./todo-delete-dialog.component.scss']
})
export class TodoDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TodoDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

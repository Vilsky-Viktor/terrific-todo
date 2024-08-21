import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoEditDialogComponent } from './todo-edit-dialog/todo-edit-dialog.component';
import { TodoDeleteDialogComponent } from './todo-delete-dialog/todo-delete-dialog.component';
import { TodosComponent } from './todos.component'
import { TruncatePipe } from '../core/truncate.pipe'
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoEditDialogComponent,
    TodoDeleteDialogComponent,
    TruncatePipe,
  ],
  imports: [
    FormsModule,
    SharedModule,
    TodosRoutingModule,
    CommonModule,
  ],
  exports: [
    TruncatePipe,
  ],
  providers: [DatePipe],
})
export class TodosModule {}
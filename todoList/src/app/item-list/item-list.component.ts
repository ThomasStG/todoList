import { Component, Input, Optional, Inject, NgModule, OnInit } from '@angular/core';
import { TodoitemComponent } from '../todoitem/todoitem.component';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodoDataService } from '../todo-data.service';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [TodoitemComponent, CommonModule, NgFor, NgIf, NgForOf, HttpClientModule],
  providers: [
    TodoDataService
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit{
  todo_items: any[] = [];
  constructor(private todoService: TodoDataService) {
  }
  ngOnInit(): void {
    this.todo_items = this.todoService.getTodoItems();
    console.log(this.todo_items);
  }
}

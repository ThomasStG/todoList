import { Component, Input } from '@angular/core';
import { TodoitemComponent } from '../todoitem/todoitem.component';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TodoitemComponent, CommonModule, NgFor, NgIf, NgForOf],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  todo_items: any[]= ["$0", "$1", "$2", "$3", "$4",];
}

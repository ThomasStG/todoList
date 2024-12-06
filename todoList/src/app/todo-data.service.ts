import { Injectable } from '@angular/core';
import { TODO_ITEMS } from './mock_todo.ts'

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor() { }
  getTodoItems() {
    return TODO_ITEMS;
  }
}

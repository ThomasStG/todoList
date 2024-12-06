import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todoitem',
  standalone: true,
  imports: [],
  templateUrl: './todoitem.component.html',
  styleUrl: './todoitem.component.css'
})
export class TodoitemComponent {
  @Input() name: string = 'todoitem';
  @Input() time: Date = new Date();
  remainingTime: number = 0;
  constructor(){
    let now = new Date();
    this.remainingTime = Math.floor((this.time.getTime() - now.getTime()) / (1000 * 60 * 60));
    console.log(now, this.time);
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TimerComponent } from './timer/timer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TimerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todoList';
  timerComponent?: TimerComponent;
  time: string = '00:00';
  onTimerEnd(event: Event) {
    const time = (event.target as HTMLElement).getAttribute('data-time');
    console.log(`Timer ended: ${time} seconds`);
  }
}

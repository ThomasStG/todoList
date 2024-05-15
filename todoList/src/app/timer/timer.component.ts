import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  time: string = '';
  time_start:number = 0;
  timer_count:any;
  alarm: any;

  constructor() {
    this.timer(0, 0, 0);
    this.alarm = new Audio();
  }

  timer(hour: number, minute: number, startSeconds?: number){
    // let minute = 1;
    let seconds: number = (hour * 3600) + (minute * 60) + (startSeconds||0);
    let textSec: any = '0';
    let statSec: number = startSeconds ? startSeconds : 0;
    if (seconds == 0){
      this.time = '00:00:00';
      return;
    }
    const min_prefix = minute < 10 ? '0' : '';
    const hour_prefix = hour < 10 ? '0' : '';
    
    this.timer_count = setInterval(() => {
      console.log(seconds)
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
    
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      
      const hours = Math.floor(seconds/3600)
      const minutes = Math.floor((seconds - hours * 3600) / 60)
      const secs = Math.floor((seconds - hours * 3600 - minutes * 60)/3600)
      console.log(hours, minutes, secs)
      this.time = `${hour_prefix}${hours}:${min_prefix}${minutes}:${textSec}`;
      console.log(this.time);
      if (seconds == 0) {
        this.playAlarm();
        console.log('finished');
        clearInterval(this.timer_count);
      }
    }, 1000);
  }
  setTimer(hour: number, minute: number, seconds?: number) {
    if (this.timer_count) {
      clearInterval(this.timer_count);
    }
    this.timer(hour, minute, seconds ? seconds : 0);
  }

  setTimerFromInput(){
      const input_element_hours = document.querySelector('#hours') as HTMLInputElement;
      const input_element_minutes = document.querySelector('#minutes') as HTMLInputElement;
      const input_element_seconds = document.querySelector('#seconds') as HTMLInputElement;
      const hour = parseInt(input_element_hours.value, 10);
      const minute = parseInt(input_element_minutes.value, 10);
      const second = parseInt(input_element_seconds.value, 10);
      if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        console.error('Invalid input format. Please enter hours, minutes, and seconds separated by colons (e.g. 5:15:30).');
        return;
      }
      this.setTimer(hour, minute, second);
  }

  playAlarm() {
    this.alarm.src = (document.querySelector('#alarms') as HTMLInputElement).value.toString();
    this.alarm.volume = 0.5;
    this.alarm.load();
    this.alarm.play();
  }
}
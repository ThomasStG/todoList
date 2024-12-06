import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AutoTabDirective } from './timerupdate.directive';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgIf, FormsModule, AutoTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  time: string = '';
  time_start:number = 0;
  timer_count:any;
  alarm: any;
  seconds: number = 0;
  input: string = '';
  hour: string = '';
  minute: string='';
  second: string = '';

  constructor() {
    this.timer(0, 0, 0);
    this.alarm = new Audio();
  }

  timer(hour: number, minute: number, startSeconds?: number){
    // let minute = 1;
    this.seconds = (hour * 3600) + (minute * 60) + (startSeconds||0);
    this.time_start = this.seconds;
    if (startSeconds && startSeconds > 60) {
      hour = Math.floor(startSeconds/3600);
      startSeconds = startSeconds%3600;
      minute = Math.floor(startSeconds/60);
      startSeconds = startSeconds%60;
    }

    let textSec: any = '0';
    let statSec: number = startSeconds ? startSeconds : 0;
    if (this.seconds == 0){
      this.time = '00:00:00';
      return;
    }
    let min_prefix = minute < 10 ? '0' : '';
    let hour_prefix = hour < 10 ? '0' : '';
    const second_prefix = statSec < 10 ? '0' : '';
    this.time = `${hour_prefix}${hour}:${min_prefix}${minute}:${second_prefix}${startSeconds}`;
    this.timer_count = setInterval(() => {
      this.seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      
      const hours = Math.floor(this.seconds/3600)
      const minutes = Math.floor((this.seconds - hours * 3600) / 60)
      let min_prefix = minutes < 10 ? '0' : '';
      let hour_prefix = hours < 10 ? '0' : '';
      this.time = `${hour_prefix}${hours}:${min_prefix}${minutes}:${textSec}`;
      if (this.seconds == 0) {
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
    let parsed = this.parseTime();
    let hour = parseInt(parsed[0]), minute = parseInt(parsed[1]), second = parseInt(parsed[2]);
      if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        console.error('Invalid input format');
        return;
      }
      this.setTimer(hour, minute, second);
  }

  playAlarm() {
    let sound = (document.querySelector('#alarms') as HTMLInputElement).value.toString()
    if (sound != ''){
      this.alarm.src = sound;
      
      this.alarm.volume = 0.5;
      this.alarm.load();
      this.alarm.play();
    }
  }
  getDashArray(): string {
    const circumference = 2 * Math.PI * 115;
    const dashOffset = ((this.seconds / this.time_start)) * circumference;
    return `${dashOffset} ${circumference}`;
  }

  timerPause(){
    let time_remaining = this.time;
    clearInterval(this.timer_count);
  }

  timerResume(){
    let temp = this.time_start;
    this.setTimer(0,0,this.seconds);
    this.time_start = temp;
  }

  restartTimer(){
    this.setTimer(0,0,this.time_start);
  }

  parseTime(){
    let val = this.input.replace(/[^0-9]/g, '');
    let hour = '', minute = '', second = '';
    val = val.replace(/^0+(?=\d)/, '');
    switch(val.length) {
      case 7:
        hour = val.substring(1, 3);
        minute = val.substring(3, 5);
        second = val.substring(5, 7);
        break;
      case 6:
        hour = val.substring(0, 2);
        minute = val.substring(2, 4);
        second = val.substring(4, 6);
        break;
      case 5:
        hour = '0' + val.substring(0, 1);
        minute = val.substring(1, 3);
        second = val.substring(3, 5);
        break;
      case 4:
        minute = val.substring(0, 2);
        second = val.substring(2, 4);
        break;
      case 3:
        minute = '0' + val.substring(0, 1);
        second = val.substring(1, 3);
        break;
      case 2:
        second = val.substring(0, 2);
        break;
      case 1:
        second = '0' + val.substring(0, 1);
        break;
    }
    return [hour? hour : '00', minute?minute:'00', second?second: '0'];
  }
  formatTime() {
    let parsed = this.parseTime();
    let hour = parsed[0], minute = parsed[1], second = parsed[2];
    this.input = (hour ? hour + ':' : '') + (minute ? minute + ':' : '') + (second ? second : '00');
  }

}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const segments = value.split(':');
    const hours = segments[0] ? `${segments[0].padStart(2, '0')}:` : '';
    const minutes = segments[1] ? `${segments[1].padStart(2, '0')}:` : '00:';
    const seconds = segments[2] ? `${segments[2].padStart(2, '0')}` : '00';

    return `${hours}${minutes}${seconds}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  pure: true,
  name: 'nbatConference',
})
export class ConferencePipe implements PipeTransform {
  transform(value: 'East' | 'West'): string {
    switch (value) {
      case 'East':
        return 'Eastern conference';
      case 'West':
        return 'Western conference';
      default:
        return '';
    }
  }
}

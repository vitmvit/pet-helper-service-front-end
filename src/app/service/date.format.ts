// Импортируем необходимые модули
import {Pipe, PipeTransform} from '@angular/core';

// Создаем кастомную конвертацию даты в строку
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  // Метод преобразования даты
  transform(value: string): string {
    const date = new Date(value);
    // Форматируем дату в нужный вам формат (например, используя Intl.DateTimeFormat)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  }
}

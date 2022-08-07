export class DateMagic {
  getDay(time: string | Date): string {
    const date = new Date(time);
    const day = date.toLocaleDateString('en', { day: 'numeric' });
    const month = date.toLocaleDateString('en', { month: 'long' });
    const year = date.toLocaleDateString('en', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  }
}

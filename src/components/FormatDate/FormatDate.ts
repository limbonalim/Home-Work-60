import {DateTime} from 'luxon';

class FormatDate {


  constructor(private time: string) {

  }

  getDate() {
    let dateTime: DateTime = DateTime.fromISO(this.time);
    let day = this.addZero(dateTime.day.toString());
    let month = this.addZero(dateTime.month.toString());
    let hour = this.addZero(dateTime.hour.toString());
    let minute = this.addZero(dateTime.minute.toString());
    return `${day}.${month}.${dateTime.year} в ${hour}:${minute}`;
  }

  addZero(timeString: string): string {
    if (timeString.length < 2) {
      timeString = '0' + timeString;
    }
    return timeString;
  };
}

export default FormatDate;

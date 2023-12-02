import {Injectable} from '@angular/core';
import {DateTime, IANAZone} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private timeZone: string = 'Europe/Warsaw';

  constructor() {

  }

  public getCurrentDateTime() : string {
    const nowInWarsaw = DateTime.now().setZone(this.timeZone);
    return nowInWarsaw.toFormat('dd-MM-yyyy HH:mm:ss');
  }

  public getCurrentDate() : string {
      const nowInWarsaw = DateTime.now().setZone(this.timeZone);
      return nowInWarsaw.toFormat('dd-MM-yyyy');
  }

  public getCurrentDay() : string {
    const nowInWarsaw = DateTime.now().setZone(this.timeZone);
    return nowInWarsaw.toFormat('dd');
  }

  public getCurrentDayShort() : string {
    const nowInWarsaw = DateTime.now().setZone(this.timeZone);
    return nowInWarsaw.toFormat('dd');
  }

  public getCurrentMonth() : string {
    const nowInWarsaw = DateTime.now().setZone(this.timeZone);
    return nowInWarsaw.toFormat('MM');
  }

  public getCurrentYear() : string {
    const nowInWarsaw = DateTime.now().setZone(this.timeZone);
    return nowInWarsaw.toFormat('yyyy');
  }

}

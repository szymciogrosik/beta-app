import {Injectable} from '@angular/core';
import {DateTime, IANAZone} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private timeZone: string = 'Europe/Warsaw';

  constructor() {
  }

  public presentCurrentDateTime() : string {
    return this.getCurrentDateTime().toFormat('dd-MM-yyyy HH:mm:ss');
  }

  public presentCurrentDate() : string {
      return this.getCurrentDateTime().toFormat('dd-MM-yyyy');
  }

  public getCurrentDateTime(): DateTime {
    return DateTime.now().setZone(this.timeZone);
  }

}

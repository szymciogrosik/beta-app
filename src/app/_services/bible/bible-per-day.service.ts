import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BibleReference} from "./bible-reference";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BiblePerDayService {

  constructor(private http: HttpClient) {
  }

  public findQuotesForToday(): Observable<any> {
    return this.http.post<any>("https://db.bncd.stream/bncd/api/open-node/", JSON.stringify({key: environment.BIBLE_PER_DAY_API_KEY}));
  }

  public parseResponse(bibleReference: string): BibleReference {
    let matches = bibleReference.matchAll(/([0-9]*\s*[A-Za-z]+) ([0-9]+),([0-9]+)(-)*([0-9]+)*/g);
    for (const match of matches) {
      let startVerse: number = Number(match[3]);
      let endVerse: number = Number(match[5]) === undefined ? Number(match[5]) : startVerse;
      return new BibleReference(match[1], Number(match[2]), startVerse, endVerse);
    }
    return new BibleReference("", 0, 0, 0);
  }

}

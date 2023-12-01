import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BibleReference} from "./bible-reference";

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  constructor(private http: HttpClient) {
  }

  public findQuoteForWarsawBible(bibleReference: BibleReference): Observable<any> {
    return this.findQuote(bibleReference.bibleBook.bibleApi, bibleReference.chapter, bibleReference.verseStart, bibleReference.verseEnd);
  }

  private findQuote(bookApiName: string | undefined, chapter: number, verseStart: number | null, verseEnd: number | null): Observable<any> {
    let requestUrl = "https://www.biblia.info.pl/api" + "/biblia/bw/" + bookApiName + "/" + chapter;
    if (verseStart) {
      requestUrl += ("/" + verseStart);
    }
    if (verseEnd) {
      requestUrl += ("-" + verseEnd);
    }
    return this.http.get<any>(requestUrl);
  }

}

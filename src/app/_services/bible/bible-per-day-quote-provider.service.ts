import {Injectable} from '@angular/core';
import {BibleReference} from "./bible-reference";
import {Quote} from "../../_models/bibleperday/quote";
import {BibleService} from "./bible.service";
import {BiblePerDayParserService} from "./bible-per-day-parser.service";
import {QuoteContainer} from "../../_models/bibleperday/quote-container";

@Injectable({
  providedIn: 'root'
})
export class BiblePerDayQuoteProviderService {
  constructor(
    private bibleService: BibleService,
    private parser: BiblePerDayParserService
  ) {
  }

  public fillQuoteNotFromBible(quotes: string[], targetQuoteContainer: QuoteContainer): void {
    this.createQuoteNotFromBible(quotes, targetQuoteContainer);
  }

  public fillQuoteNotFromBibleWithReference(quote: string, quoteRef: string, targetQuoteContainer: QuoteContainer): void {
    this.createQuoteNotFromBibleWithReference(quote, quoteRef, targetQuoteContainer);
  }

  public fillQuoteFromBible(inputReference: string, bibleTargetQuoteContainer: QuoteContainer): void {
    if (!inputReference) {
      bibleTargetQuoteContainer.wait = false;
      return;
    }
    this.fillQuoteRepeatableFromBible(this.parser.getBibleReferences(inputReference), 0, bibleTargetQuoteContainer, [])
  }

  private fillQuoteRepeatableFromBible(bibleReferences: BibleReference[], index: number, bibleTargetQuoteContainer: QuoteContainer, bibleTmpQuoteList: Quote[]): void {
    if (bibleReferences.length == 0 || !bibleReferences[index]) {
      return;
    }
    let singleReference: BibleReference = bibleReferences[index];

    this.bibleService.findQuoteForWarsawBible(singleReference).subscribe({
      next: (data): void => {
        let reference: string = singleReference.present();
        let bibleQuote: string = '';
        for (let i: number = 0; i < data.verses.length; i++) {
          bibleQuote += data.verses[i].text + "\n";
        }
        let quote: Quote = new Quote();
        quote.setValueAndReference(this.capitalizeFirstLetter(bibleQuote), reference);
        bibleTmpQuoteList.push(quote);

        index++;
        if (index < bibleReferences.length) {
          this.fillQuoteRepeatableFromBible(bibleReferences, index, bibleTargetQuoteContainer, bibleTmpQuoteList);
        } else {
          bibleTargetQuoteContainer.setQuoteList(bibleTmpQuoteList);
        }
      },
      error: (error) => console.error(error)
    });
  }

  private createQuoteNotFromBible(quotes: string[], targetQuoteNotFromBibleContainer: QuoteContainer): void {
    let result: Quote[] = [];
    for (let i: number = 0; i < quotes.length; i++) {
      let quote: string = quotes[i];
      let quoteObj: Quote = new Quote();
      quoteObj.setValue(quote);
      result.push(quoteObj);
    }
    targetQuoteNotFromBibleContainer.setQuoteList(result);
  }

  private createQuoteNotFromBibleWithReference(quote: string, quoteRef: string, targetQuoteNotFromBibleContainer: QuoteContainer): void {
    let quoteObj: Quote = new Quote();
    quoteObj.setValueAndReference(quote, quoteRef)
    targetQuoteNotFromBibleContainer.setQuoteList([quoteObj]);
  }

  private capitalizeFirstLetter(text: string): string {
    if (text.length > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    } else {
      return text;
    }
  }

}

import {Injectable} from '@angular/core';
import {BibleReference} from "./bible-reference";
import {Quote} from "../../_models/bibleperday/quote";
import {BibleService} from "./bible.service";
import {BiblePerDayParserService} from "./bible-per-day-parser.service";

@Injectable({
  providedIn: 'root'
})
export class BiblePerDayQuoteProviderService {
  private contentStylePrefix: string = "<div style='text-align: left;'>";
  private contentStyleSuffix: string = "</div>";
  private refStylePrefix: string = "<div style='text-align: center;'><br/><i style='text-align: center;'>";
  private redStyleSuffix: string = "</i></div>";

  constructor(
    private bibleService: BibleService,
    private parser: BiblePerDayParserService
  ) {
  }

  public fillQuoteNotFromBible(quote: string, quoteRef: string, targetQuote: Quote): void {
    this.createQuoteNotFromBible(quote, quoteRef, targetQuote);
  }

  public fillQuoteFromBible(inputReference: string, bibleTargetQuote: Quote): void {
    if (!inputReference) {
      bibleTargetQuote.wait = false;
      return;
    }
    this.fillQuoteRepeatableFromBible(this.parser.getBibleReferences(inputReference), 0, bibleTargetQuote, new Quote())
  }

  private fillQuoteRepeatableFromBible(bibleReferences: BibleReference[], index: number, bibleTargetQuote: Quote, bibleTmpQuote: Quote): void {
    if (bibleReferences.length == 0 || !bibleReferences[index]) {
      return;
    }
    let singleReference: BibleReference = bibleReferences[index];

    this.bibleService.findQuoteForWarsawBible(singleReference).subscribe({
      next: (data): void => {
        for (let i: number = 0; i < data.verses.length; i++) {
          bibleTmpQuote.value += (this.contentStylePrefix + data.verses[i].text + this.contentStyleSuffix);
        }
        bibleTmpQuote.value += (this.refStylePrefix + singleReference.present() + this.redStyleSuffix);
        index++;
        if (index < bibleReferences.length) {
          bibleTmpQuote.value += "<br/>";
          this.fillQuoteRepeatableFromBible(bibleReferences, index, bibleTargetQuote, bibleTmpQuote);
        } else {
          bibleTargetQuote.value += bibleTmpQuote.value;
        }
      },
      error: (error) => console.error(error)
    });
  }

  private createQuoteNotFromBible(quote: string, quoteRef: string, targetQuoteNotFromBible: Quote): void {
    let content: string = "";
    if (quote) {
      content += this.contentStylePrefix + quote + this.contentStyleSuffix;
    }
    if (quoteRef) {
      content += this.refStylePrefix + quoteRef + this.redStyleSuffix;
    }

    if (content !== "") {
      targetQuoteNotFromBible.setValue(content);
    } else {
      targetQuoteNotFromBible.wait = false;
    }
  }

}

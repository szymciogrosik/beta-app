import {QuoteContainer} from "../quote-container";

export class Contemplation {
  bibleText: QuoteContainer = new QuoteContainer();
  text: QuoteContainer = new QuoteContainer();

  public isReady(): boolean {
    return this.bibleText.isReady() && this.text.isReady();
  }

}

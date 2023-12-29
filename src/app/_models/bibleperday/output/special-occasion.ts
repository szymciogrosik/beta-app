import {Quote} from "../quote";
import {QuoteContainer} from "../quote-container";

export class SpecialOccasion {
  occasion: Quote = new Quote();
  title: Quote = new Quote();
  mainQuoteText: QuoteContainer = new QuoteContainer();
  psalmText: QuoteContainer = new QuoteContainer();
  worshipSongs: QuoteContainer = new QuoteContainer();
  apostolicLessonText: QuoteContainer = new QuoteContainer();
  sermonTextListText: QuoteContainer = new QuoteContainer();
  oldTestamentText: QuoteContainer = new QuoteContainer();
  gospelText: QuoteContainer = new QuoteContainer();

  public isReady(): boolean {
    return this.occasion.isReady()
      && this.title.isReady()
      && this.mainQuoteText.isReady()
      && this.psalmText.isReady()
      && this.worshipSongs.isReady()
      && this.apostolicLessonText.isReady()
      && this.sermonTextListText.isReady()
      && this.oldTestamentText.isReady()
      && this.gospelText.isReady()
  }

}

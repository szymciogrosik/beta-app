import {Quote} from "../quote";

export class SpecialOccasion {
  occasion: Quote = new Quote();
  title: Quote = new Quote();
  mainQuoteText: Quote = new Quote();
  psalmText: Quote = new Quote();
  worshipSongs: Quote = new Quote();
  apostolicLessonText: Quote = new Quote();
  sermonTextListText: Quote = new Quote();
  oldTestamentText: Quote = new Quote();
  gospelText: Quote = new Quote();

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

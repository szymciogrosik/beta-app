import {Quote} from "../quote";

export class Contemplation {
  bibleText: Quote = new Quote();
  text: Quote = new Quote();

  public isReady(): boolean {
    return this.bibleText.isReady() && this.text.isReady();
  }

}

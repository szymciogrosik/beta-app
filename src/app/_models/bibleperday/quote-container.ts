import {Quote} from "./quote";

export class QuoteContainer {
  wait: boolean = true;
  quoteList: Quote[] = [];

  public setQuoteList(newQuoteList: Quote[]): void {
    if (newQuoteList.length > 0) {
      this.quoteList = newQuoteList;
    } else {
      this.wait = false;
    }
  }

  public isReady(): boolean {
    if (!this.wait) {
      return true;
    } else {
      return this.quoteList.length > 0 && this.quoteList.every(quote => quote.isReady());
    }
  }

  public present(): string {
    let result: string = '';
    for (let i: number = 0; i < this.quoteList.length; i++) {
      let quote: Quote = this.quoteList[i];
      result += quote.present();
      if (i !== this.quoteList.length - 1) {
        result += "</br>";
      }
    }
    return result;
  }

  public toString(): string {
    let result: string = '';
    for (let i: number = 0; i < this.quoteList.length; i++) {
      let quote: Quote = this.quoteList[i];
      result += quote.toString();
      if (i !== this.quoteList.length - 1) {
        result += "\n";
      }
    }
    return result;
  }

  public toStringWithoutReference(): string {
    let result: string = '';
    for (let i: number = 0; i < this.quoteList.length; i++) {
      let quote: Quote = this.quoteList[i];
      result += quote.toStringWithoutReference();
      if (i !== this.quoteList.length - 1) {
        result += "\n";
      }
    }
    return result;
  }

}

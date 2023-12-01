import {TranslateBibleShortcuts} from "./translate-bible-shortcuts";
import {BibleBook} from "./bible-book";

export class BibleReference {
  bibleBook: BibleBook;
  chapter: number;
  verseStart: number | null;
  verseEnd: number | null;

  constructor(warsawBibleBookShortcut: string, chapter: number, verseStart: number | null, verseEnd: number | null) {
    let bookNameInApi: { fullName: string, biblePerDay: string, bibleApi: string } =
      TranslateBibleShortcuts.findBibleBook(warsawBibleBookShortcut);
    this.bibleBook = new BibleBook(bookNameInApi.fullName, bookNameInApi.biblePerDay, bookNameInApi.bibleApi);
    this.chapter = chapter;
    this.verseStart = verseStart;
    this.verseEnd = verseEnd;
  }

  public present(): string {
    let stringReference: string = this.bibleBook.biblePerDay + " " + this.chapter;
    if (this.verseStart) {
      stringReference += ("," + this.verseStart);
    }
    if (this.verseEnd) {
      stringReference += ("-" + this.verseEnd);
    }
    return stringReference;
  }

}

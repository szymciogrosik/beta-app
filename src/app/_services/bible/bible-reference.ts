import {TranslateBibleShortcuts} from "./translate-bible-shortcuts";
import {BibleBook} from "./bible-book";

export class BibleReference {
  bibleBook: BibleBook;
  chapter: number;
  verseStart: number;
  verseEnd: number;

  constructor(warsawBibleBookShortcut: string, chapter: number, verseStart: number, verseEnd: number) {
    let bookNameInApi: { fullName: string, biblePerDay: string, bibleApi: string } =
      TranslateBibleShortcuts.findBibleBook(warsawBibleBookShortcut);
    this.bibleBook = new BibleBook(bookNameInApi.fullName, bookNameInApi.biblePerDay, bookNameInApi.bibleApi);
    this.chapter = chapter;
    this.verseStart = verseStart;
    this.verseEnd = verseEnd;
  }

  public present(): string {
    return this.bibleBook.biblePerDay + " " + this.chapter + "," + this.verseStart +
      (this.verseStart !== this.verseEnd ? ("-" + this.verseEnd) : "");
  }

}

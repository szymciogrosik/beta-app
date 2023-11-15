export class BibleBook {
  fullName: string;
  biblePerDay: string;
  bibleApi: string;

  constructor(fullName: string, biblePerDay: string, bibleApi: string) {
    this.fullName = fullName;
    this.biblePerDay = biblePerDay;
    this.bibleApi = bibleApi;
  }

}

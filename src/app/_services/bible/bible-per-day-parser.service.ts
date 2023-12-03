import {Injectable} from '@angular/core';
import {BibleReference} from "./bible-reference";

@Injectable({
  providedIn: 'root'
})
export class BiblePerDayParserService {

  constructor() { }

  public getBibleReferences(bibleReferences: string): BibleReference[] {
    if (!bibleReferences) {
      return [];
    }

    let allBibleReferenceList: BibleReference[] = [];
    let allBibleReferenceStringList: string[] = bibleReferences.split(" | ");

    for (const singleBibleReferenceString of allBibleReferenceStringList) {
      let matchesToRegExp: IterableIterator<RegExpMatchArray> =
        singleBibleReferenceString.matchAll(/^([0-9 ]*[\p{Letter}\p{Mark}]+) ([0-9]+)(,)*([0-9]+)*(-)*([0-9]+)*$/gu);
      // (number OPT and book MAN) + SPACE + (chapter MAN) + ("," OPT) + (verseStart OPT) + ("-" OPT) + (verseEnd OPT)
      // ----------- 1 --------------------------- 2 ----------- 3 ----------- 4 -------------- 5 ---------- 6 -------
      let foundReference: boolean = false;
      for (const match of matchesToRegExp) {
        let warsawBibleBookShortcut: string = match[1];
        let chapter: number = Number(match[2]);
        let startVerse: number | null = Number(match[4]) ? Number(match[4]) : null;
        let endVerse: number | null = Number(match[6]) ? Number(match[6]) : null;
        allBibleReferenceList.push(new BibleReference(warsawBibleBookShortcut, chapter, startVerse, endVerse));
        foundReference = true;
        break;
      }
      if (!foundReference) {
        throw new Error("Bible reference '" + singleBibleReferenceString + "' does not match to Regular Expression.");
      }
    }
    if (allBibleReferenceList.length === 0) {
      throw new Error("Bible reference '" + bibleReferences + "' does not match to any Regular Expression.");
    }
    return allBibleReferenceList;
  }

}

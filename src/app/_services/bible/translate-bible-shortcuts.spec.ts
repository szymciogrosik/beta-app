import { TranslateBibleShortcuts } from './translate-bible-shortcuts';

describe('TranslateBibleShortcuts', () => {
  let translateBibleShortcut: TranslateBibleShortcuts;
  beforeEach(() => {
    translateBibleShortcut = new TranslateBibleShortcuts();
  });

  it('should create an instance', () => {
    expect(translateBibleShortcut).toBeTruthy();
  });
  it('should find a proper api key', () => {
    expect(TranslateBibleShortcuts.findBibleBook("BPD")).toBe(undefined);
  });
});

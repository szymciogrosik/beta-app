import { TranslateBibleShortcuts } from './translate-bible-shortcuts';

describe('TranslateBibleShortcuts', () => {
  let translateBibleShortcut: TranslateBibleShortcuts;
  beforeEach(() => {
    translateBibleShortcut = new TranslateBibleShortcuts();
  });

  it('should create an instance', () => {
    expect(translateBibleShortcut).toBeTruthy();
  });
});

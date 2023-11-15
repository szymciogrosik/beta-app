interface EnumIdentity { }
export class TranslateBibleShortcuts implements EnumIdentity {

  private static bibleShortcuts: { fullName: string, biblePerDay: string, bibleApi: string }[] = [
    { "fullName": "Księga Rodzaju", "biblePerDay": "1 Mż", "bibleApi": "rdz" },
    { "fullName": "Księga Wyjścia", "biblePerDay": "2 Mż", "bibleApi": "wj" },
    { "fullName": "Księga Kapłańska", "biblePerDay": "3 Mż", "bibleApi": "kpl" },
    { "fullName": "Księga Liczb", "biblePerDay": "4 Mż", "bibleApi": "lb" },
    { "fullName": "Księga Powtórzonego Prawa", "biblePerDay": "5 Mż", "bibleApi": "pwt" },
    { "fullName": "Księga Jozuego", "biblePerDay": "Joz", "bibleApi": "joz" },
    { "fullName": "Księga Sędziów", "biblePerDay": "Sdz", "bibleApi": "sdz" },
    { "fullName": "Księga Rut", "biblePerDay": "Rt", "bibleApi": "rt" },
    { "fullName": "1 Księga Samuela", "biblePerDay": "1 Sm", "bibleApi": "1sm" },
    { "fullName": "2 Księga Samuela", "biblePerDay": "2 Sm", "bibleApi": "2sm" },
    { "fullName": "1 Księga Królewska", "biblePerDay": "1 Krl", "bibleApi": "1krl" },
    { "fullName": "2 Księga Królewska", "biblePerDay": "2 Krl", "bibleApi": "2krl" },
    { "fullName": "1 Księga Kronik", "biblePerDay": "1 Krn", "bibleApi": "1krn" },
    { "fullName": "2 Księga Kronik", "biblePerDay": "2 Krn", "bibleApi": "2krn" },
    { "fullName": "Księga Ezdrasza", "biblePerDay": "Ezd", "bibleApi": "ezd" },
    { "fullName": "Księga Nehemiasza", "biblePerDay": "Ne", "bibleApi": "ne" },
    { "fullName": "Księga Estery", "biblePerDay": "Est", "bibleApi": "est" },
    { "fullName": "Księga Hioba", "biblePerDay": "Hi", "bibleApi": "hi" },
    { "fullName": "Księga Psalmów", "biblePerDay": "Ps", "bibleApi": "ps" },
    { "fullName": "Księga Przysłów", "biblePerDay": "Prz", "bibleApi": "prz" },
    { "fullName": "Księga Koheleta", "biblePerDay": "Kz", "bibleApi": "koh" },
    { "fullName": "Pieśń nad pieśniami", "biblePerDay": "Pnp", "bibleApi": "pnp" },
    { "fullName": "Księga Izajasza", "biblePerDay": "Iz", "bibleApi": "iz" },
    { "fullName": "Księga Jeremiasza", "biblePerDay": "Jr", "bibleApi": "jr" },
    { "fullName": "Lamentacje Jeremiasza", "biblePerDay": "Tr", "bibleApi": "lm" },
    { "fullName": "Księga Ezechiela", "biblePerDay": "Ez", "bibleApi": "ez" },
    { "fullName": "Księga Daniela", "biblePerDay": "Dn", "bibleApi": "dn" },
    { "fullName": "Księga Ozeasza", "biblePerDay": "Oz", "bibleApi": "oz" },
    { "fullName": "Księga Joela", "biblePerDay": "Jl", "bibleApi": "jl" },
    { "fullName": "Księga Amosa", "biblePerDay": "Am", "bibleApi": "am" },
    { "fullName": "Księga Abdiasza", "biblePerDay": "Ab", "bibleApi": "ab" },
    { "fullName": "Księga Jonasza", "biblePerDay": "Jon", "bibleApi": "jon" },
    { "fullName": "Księga Micheasza", "biblePerDay": "Mi", "bibleApi": "mi" },
    { "fullName": "Księga Nahuma", "biblePerDay": "Na", "bibleApi": "na" },
    { "fullName": "Księga Habakuka", "biblePerDay": "Ha", "bibleApi": "ha" },
    { "fullName": "Księga Sofoniasza", "biblePerDay": "So", "bibleApi": "so" },
    { "fullName": "Księga Aggeusza", "biblePerDay": "Ag", "bibleApi": "ag" },
    { "fullName": "Księga Zachariasza", "biblePerDay": "Za", "bibleApi": "za" },
    { "fullName": "Księga Malachiasza", "biblePerDay": "Ml", "bibleApi": "ml" },
    { "fullName": "Ewangelia Mateusza", "biblePerDay": "Mt", "bibleApi": "mat" },
    { "fullName": "Ewangelia Marka", "biblePerDay": "Mk", "bibleApi": "mar" },
    { "fullName": "Ewangelia Łukasza", "biblePerDay": "Łk", "bibleApi": "luk" },
    { "fullName": "Ewangelia Jana", "biblePerDay": "J", "bibleApi": "jan" },
    { "fullName": "Dzieje Apostolskie", "biblePerDay": "Dz", "bibleApi": "dz" },
    { "fullName": "List do Rzymian", "biblePerDay": "Rz", "bibleApi": "rz" },
    { "fullName": "1 list do Koryntian", "biblePerDay": "1 Kor", "bibleApi": "1kor" },
    { "fullName": "2 list do Koryntian", "biblePerDay": "2 Kor", "bibleApi": "2kor" },
    { "fullName": "List do Galatów", "biblePerDay": "Ga", "bibleApi": "gal" },
    { "fullName": "List do Efezjan", "biblePerDay": "Ef", "bibleApi": "ef" },
    { "fullName": "List do Filipian", "biblePerDay": "Flp", "bibleApi": "fil" },
    { "fullName": "List do Kolosan", "biblePerDay": "Kol", "bibleApi": "kol" },
    { "fullName": "1 List do Tesaloniczan", "biblePerDay": "1 Tes", "bibleApi": "1tes" },
    { "fullName": "2 List do Tesaloniczan", "biblePerDay": "2 Tes", "bibleApi": "2tes" },
    { "fullName": "1 List do Tymoteusza", "biblePerDay": "1 Tm", "bibleApi": "1tym" },
    { "fullName": "2 List do Tymoteusza", "biblePerDay": "2 Tm", "bibleApi": "2tym" },
    { "fullName": "List do Tytusa", "biblePerDay": "Tt", "bibleApi": "tyt" },
    { "fullName": "List do Filemona", "biblePerDay": "Flm", "bibleApi": "flm" },
    { "fullName": "List do Hebrajczyków", "biblePerDay": "Hbr", "bibleApi": "hebr" },
    { "fullName": "List Jakuba", "biblePerDay": "Jk", "bibleApi": "jak" },
    { "fullName": "1 List Piotra", "biblePerDay": "1 P", "bibleApi": "1p" },
    { "fullName": "2 List Piotra", "biblePerDay": "2 P", "bibleApi": "2p" },
    { "fullName": "1 List Jana", "biblePerDay": "1 J", "bibleApi": "1j" },
    { "fullName": "2 List Jana", "biblePerDay": "2 J", "bibleApi": "2j" },
    { "fullName": "3 List Jana", "biblePerDay": "3 J", "bibleApi": "3j" },
    { "fullName": "List Judy", "biblePerDay": "Jud", "bibleApi": "jud" },
    { "fullName": "Apokalipsa (Objawienie)", "biblePerDay": "Obj", "bibleApi": "obj" }
  ];

  constructor() { }

  public static findBibleBook(biblePerDay: string) : { fullName: string, biblePerDay: string, bibleApi: string } {
    let item: { fullName: string; biblePerDay: string; bibleApi: string } | undefined
      = this.bibleShortcuts.find(item => item.biblePerDay === biblePerDay);
    if (item === undefined) {
      throw new Error("Cannot find item for bible per day property: " + biblePerDay);
    }
    return item;
  }

}

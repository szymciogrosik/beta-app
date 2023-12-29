import {Quote} from "../quote";
import {SpecialOccasionContainer} from "./special-occasion-container";
import {ContemplationContainer} from "./contemplation-container";
import {QuoteContainer} from "../quote-container";

export class BiblePerDay {
  date: Quote = new Quote();
  firstStandardText: QuoteContainer = new QuoteContainer();
  secondStandardText: QuoteContainer = new QuoteContainer();
  firstAdditionalText: QuoteContainer = new QuoteContainer();
  secondAdditionalText: QuoteContainer = new QuoteContainer();
  quoteNotFromBibleText: QuoteContainer = new QuoteContainer();
  specialOccasionContainer: SpecialOccasionContainer = new SpecialOccasionContainer();
  contemplationContainer: ContemplationContainer = new ContemplationContainer();
}

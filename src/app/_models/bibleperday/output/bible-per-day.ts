import {Quote} from "../quote";
import {SpecialOccasionContainer} from "./special-occasion-container";
import {ContemplationContainer} from "./contemplation-container";

export class BiblePerDay {
  date: Quote = new Quote();
  firstStandardText: Quote = new Quote();
  secondStandardText: Quote = new Quote();
  firstAdditionalText: Quote = new Quote();
  secondAdditionalText: Quote = new Quote();
  quoteNotFromBibleText: Quote = new Quote();
  specialOccasionContainer: SpecialOccasionContainer = new SpecialOccasionContainer();
  contemplationContainer: ContemplationContainer = new ContemplationContainer();
}

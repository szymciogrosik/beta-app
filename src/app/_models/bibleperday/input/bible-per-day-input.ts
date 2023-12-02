import {ContemplationInput} from "./contemplation-input";
import {SpecialOccasionInput} from "./special-occasion-input";

export class BiblePerDayInput {
  date: string;
  firstStandard: string;
  secondStandard: string;
  firstAdditional: string;
  secondAdditional: string;
  quoteNotFromBible: string;
  quoteNotFromBibleReference: string;
  specialOccasionList: SpecialOccasionInput[];
  contemplationDTO: ContemplationInput;
}

import {SpecialOccasion} from "./special-occasion";

export class SpecialOccasionContainer {
  wait: boolean = true;
  specialOccasionList: SpecialOccasion[];

  public isReady(): boolean {
    if (!this.wait) {
      return true;
    } else {
      return this.specialOccasionList && this.specialOccasionList.every(elem => elem.isReady());
    }
  }

}

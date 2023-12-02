import {Contemplation} from "./contemplation";

export class ContemplationContainer {
  wait: boolean = true;
  contemplation: Contemplation;

  public isReady(): boolean {
    if (!this.wait) {
      return true;
    } else {
      return this.contemplation && this.contemplation.isReady();
    }
  }

}

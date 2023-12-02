export class Quote {
  wait: boolean = true;
  value: string = "";

  public setValue(newValue: string) {
    if (newValue) {
      this.value = newValue;
    } else {
      this.wait = false;
    }
  }

  public isReady(): boolean {
    if (!this.wait) {
      return true;
    } else {
      return !!this.value;
    }
  }

}

export class Quote {
  // Todo: add to the code instead on this place
  private contentStylePrefix: string = "<div style='text-align: left;'>";
  private contentStyleSuffix: string = "</div>";
  private refStylePrefix: string = "<div style='text-align: center;'><br/><i style='text-align: center;'>";
  private refStyleSuffix: string = "</i></div>";

  wait: boolean = true;
  value: string = "";
  reference: string = "";

  public setValue(newValue: string): void {
    if (!!newValue) {
      this.value = newValue;
    } else if (!newValue) {
      this.wait = false;
    }
  }

  public setValueAndReference(newValue: string, newReference: string): void {
    if (!!newValue && !!newReference) {
      this.value = newValue;
      this.reference = newReference;
    } else if (!newValue && !newReference) {
      this.wait = false;
    } else {
      throw new Error("One of elements is empty when expected all to be empty or none. NewValue=" + newValue + ", newReference=" + newReference);
    }
  }

  public isReady(): boolean {
    if (!this.wait) {
      return true;
    } else {
      // Only value is mandatory
      return !!this.value;
    }
  }

  public present(): string {
    let result: string = '';

    result += this.contentStylePrefix;
    result += this.value;
    result += this.contentStyleSuffix;

    if (!this.reference) {
      return result;
    }

    result += this.refStylePrefix;
    result += this.reference;
    result += this.refStyleSuffix;

    return result;
  }

  public toString(): string {
    let result: string = '';
    result += this.value;
    if (!this.reference) {
      return result;
    }
    result += " - ";
    result += this.reference;
    return result;
  }

}

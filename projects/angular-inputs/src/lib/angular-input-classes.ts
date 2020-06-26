export class AngularInputsIdLabel {
  id: any;
  l: string;

  public constructor(id: any, l: string) {
    this.id = id;
    this.l = l;
  }
}

export class AngularInputsIdLabelGroup {
  l: string;
  g: AngularInputsIdLabel[] = [];

  public constructor(l: string) {
    this.l = l;
  }
}

export class LabelValue<T, L> {
  public label: T;
  public value: L;
  public additionalData?: any;
}

export type OptionsValues = LabelValue<string, string>[];

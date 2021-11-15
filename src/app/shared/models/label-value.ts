export class LabelValue<T, L> {
  public label: T;
  public value: L;
}

export type OptionsValues = LabelValue<string, string>[];

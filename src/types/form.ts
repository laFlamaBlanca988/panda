// types/form.ts

export type FieldType = "text" | "checkbox" | "select";

export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
}

export interface TextField extends BaseField {
  type: "text";
  placeholder: string;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface SelectField extends BaseField {
  type: "select";
  options: string[];
}

export type FormField = TextField | CheckboxField | SelectField;

import { FormType } from "./FormTypesEnum";

export interface FormAttributes {
  title: string;
  type: FormType;
  value: string | any;
  multiple?: boolean;
  api?: string;
}

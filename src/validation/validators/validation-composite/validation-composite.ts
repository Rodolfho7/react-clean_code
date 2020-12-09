import { FieldValidation } from "../../protocols/field-validation";
import { Validation } from "../../../presentation/protocols/validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}
  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter((val) => val.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message;
      }
    }
    return null;
  }

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }
}
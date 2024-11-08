type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

export type FormErrors = Record<string, string | null>;

export function validateForm(
  formData: Record<string, any>,
  rules: Record<string, (value: any) => string | null>
): ValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(formData[field]);
    if (error) {
      isValid = false;
      errors[field] = error;
    }
  }

  return { isValid, errors };
}

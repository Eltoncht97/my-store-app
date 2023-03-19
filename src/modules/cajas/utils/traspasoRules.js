import { minValue, required } from "@vuelidate/validators";

export const traspasoRules = {
  emisor: { required },
  receptor: { required },
  total: { required, minValue: minValue(1) },
};

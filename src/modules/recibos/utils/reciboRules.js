import { minValue, required } from "@vuelidate/validators";

export const reciboRules = {
  client: { required },
  paymentMethod: { required },
  total: { required, minValue: minValue(1) },
};

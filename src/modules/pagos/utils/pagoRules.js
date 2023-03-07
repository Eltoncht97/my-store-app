import { minValue, required } from "@vuelidate/validators";

export const pagoRules = {
  proveedor: { required },
  paymentMethod: { required },
  total: { required, minValue: minValue(1) },
};

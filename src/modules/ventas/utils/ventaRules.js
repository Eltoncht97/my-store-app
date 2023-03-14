import { required, minValue } from "@vuelidate/validators";

export const ventaRules = {
  client: { required },
  date: { required },
  products: { required },
  paymentMethod: { required },
  subtotal: { required, minValue: minValue(1) },
  total: { required, minValue: minValue(1) },
};

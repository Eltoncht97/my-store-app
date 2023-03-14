import { minValue, required } from "@vuelidate/validators";

export const ordenDeCompraRules = {
  proveedor: { required },
  date: { required },
  products: { required },
  factura: { required },
  subtotal: { required, minValue: minValue(1) },
  total: { required, minValue: minValue(1) },
};

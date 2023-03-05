import { required, minValue } from "@vuelidate/validators";

export const productRules = {
  name: { required },
  categoryId: { required },
  code: { required },
  stock: { required, minValue: minValue(0) },
  stockMin: { required, minValue: minValue(0) },
  costWithoutIva: { required, minValue: minValue(0) },
  discountPercentage: { required, minValue: minValue(0) },
  discount: { required, minValue: minValue(0) },
  ivaType: { required },
  iva: { required, minValue: minValue(0) },
  costPrice: { required, minValue: minValue(0) },
  utilitiesPercentage: { required, minValue: minValue(0) },
  utilities: { required, minValue: minValue(0) },
  price: { required, minValue: minValue(1) },
};

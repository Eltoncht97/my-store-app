import { maxLength, minLength, required } from "@vuelidate/validators";

export const proveedorRules = {
  name: { required },
  cuit: { minLength: minLength(11), maxLength: maxLength(11) },
  address: { required },
  phone: { required },
};

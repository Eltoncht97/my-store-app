import { required } from "@vuelidate/validators";

export const clientRules = {
  name: { required },
  lastname: { required },
  phone: { required },
  address: { required },
};

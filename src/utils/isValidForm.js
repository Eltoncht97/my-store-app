export const isValidForm = (rules, validator) => {
  const keys = Object.keys(rules)
  
  const isInvalid = keys.find((key) => validator[key].$invalid)

  if (isInvalid) {
    validator.$touch();
    console.log("Formulario Invalido")
    return false;
  }
  
  console.log("Formulario Valido")
  return true;
};
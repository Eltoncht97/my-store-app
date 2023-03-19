import Swal from "sweetalert2";

export const successAlert = (params) => {
  const { title = "Completado!", text, type = "success" } = params;
  return Swal.fire(title, text, type);
};

export const waringAlert = (params) => {
  const { title = "Alerta!", text, type = "warning" } = params;
  return Swal.fire(title, text, type);
};

export const errorAlert = (params) => {
  const { title = "Error!", text, type = "warning" } = params;
  return Swal.fire(title, text, type);
};

export const confirmAlert = async (params) => {
  const {
    title,
    text = "No se podra revertir esto!",
    confirmButtonText = "Aceptar",
    cancelButtonText = "Cancelar",
  } = params;

  const confirm = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });

  return confirm.isConfirmed;
};

import Swal from "sweetalert2";

export const confirmDelete = async () => {
  const resp = await Swal.fire({
    title: "Esta seguro de eliminar la caja?",
    text: "No se podra revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar!",
    cancelButtonText: "Cancelar",
  });

  return resp.isConfirmed;
};

export const successAlert = (title = "", text = "") => {
  Swal.fire(title, text, "success");
};

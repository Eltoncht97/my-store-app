import Swal from "sweetalert2"

export const customAlert = (title='Completado!', text, type='success') => {
  return Swal.fire(
    title,
    text,
    type
  )
}

export const customConfirm = async(title, text='', confirmButtonText, cancelButtonText='Cancelar') => {
  const confirm = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
    cancelButtonText
  })

  return confirm.isConfirmed
}

export const handleError = (resp) => {
  if(!resp.ok) customAlert(resp.message, "", "warning");
}
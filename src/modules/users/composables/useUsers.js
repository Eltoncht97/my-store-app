import Swal from "sweetalert2"
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const useUsers = () => {
  const store = useStore()
  const router = useRouter()

  const filter = ref('')
  const isLoading = ref(false)
  
  const loadUsers = async () => {
    await store.dispatch('users/loadUsers')
  }

  const getUser = async ( id ) => {
    await store.dispatch('users/getUser', id)
  }

  const createUser = async ( data ) => {
    const resp = await store.dispatch('users/createUser', data)
    if(resp.ok){
      Swal.fire(
        'Completado!',
        'Usuario creado exitosamente!',
        'success'
      )
      router.push({name: 'users-list'})
    }
  }

  const updateUser = async ( user, updatePassword ) => {
    
    if(!updatePassword && user.password) {
      delete user.password
    }

    const confirmUpdate = await Swal.fire({
      title: 'Esta seguro de actualizar el usuario?',
      text: "No se podra revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar!',
      cancelButtonText: 'Cancelar'
    })
    
    if(confirmUpdate.isConfirmed) {
      const resp = await store.dispatch('users/updateUser', user)
      if(resp.ok){
        Swal.fire(
          'Actualizado!',
          'El usuario a sido actualizado.',
          'success'
        )      
      }
    }
  }

  const deleteUser = async ( id ) => {
    const confirmDelete = await Swal.fire({
      title: 'Esta seguro de eliminar el usuario?',
      text: "No se podra revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    })
    
    if(confirmDelete.isConfirmed) {
      const resp = await store.dispatch('users/deleteUser', id)
      if(resp.ok) {
        Swal.fire(
          'Eliminado!',
          'El usuario a sido eliminado.',
          'success'
        )
        
      }
    }
  }

  // onUnmounted(() => {
  //   store.commit('users/resetModule')
  // })

  onMounted(() => {
    store.commit('users/resetUser')
  })

  return {
    createUser,
    deleteUser,
    filter,
    getUser,
    loadUsers,
    updateUser,
    isLoading,

    user: computed(() => store.getters['users/getUser']),
    users: computed(() => store.getters['users/getUsers']),
    filterUsers: (filterTxt) => store.commit('users/filterUsers', filterTxt),
    resetUser: () => store.commit('users/resetUser'),
  }
}

export default useUsers
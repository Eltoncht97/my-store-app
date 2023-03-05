import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Swal from "sweetalert2";

import { isValidForm } from "@/utils/isValidForm";
import { customAlert } from "@/utils/customSweetAlerts";

const useCategories = () => {
  const store = useStore();
  const router = useRouter();

  const filter = ref("");
  const isLoading = ref(false);

  const category = computed(() => store.getters["categories/getCategory"]);

  const rules = computed(() => {
    return {
      name: { required },
    };
  });

  const v$ = useVuelidate(rules, category);

  const loadCategories = async () => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch("categories/loadCategories");
    store.commit("ui/setLoading", false);
    if (!ok) {
      customAlert("Error", message, "warning");
    }
  };

  const loadCategory = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch("categories/getCategory", id);
    store.commit("ui/setLoading", false);
    if (!ok) {
      customAlert("Error", message, "warning");
    }
  };

  const createCategory = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch(
      "categories/createCategory",
      category.value
    );

    if (resp.ok) {
      Swal.fire("Completado!", "Categoria creada exitosamente!", "success");

      if (redirect) router.push({ name: "categories-list" });
    }
  };

  const updateCategory = async (category) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const confirmUpdate = await Swal.fire({
      title: "Esta seguro de actualizar la categoria?",
      text: "No se podra revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmUpdate.isConfirmed) {
      const resp = await store.dispatch("categories/updateCategory", category);
      if (resp.ok) {
        Swal.fire(
          "Actualizado!",
          "La categoria a sido actualizada.",
          "success"
        );
        router.push({ name: "categories-list" });
      }
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Esta seguro de eliminar la categoria?",
      text: "Se eliminaran todos los productos bajo esta categoria!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      const resp = await store.dispatch("categories/deleteCategory", id);
      if (resp.ok) {
        Swal.fire("Eliminado!", "La categoria a sido eliminada.", "success");
      }
    }
  };

  onMounted(() => {
    store.commit("categories/resetCategory");
  });

  return {
    filter,
    isLoading,
    category,
    categories: computed(() => store.getters["categories/getCategories"]),
    v$,

    createCategory,
    deleteCategory,
    loadCategory,
    loadCategories,
    updateCategory,
    filterCategories: (filterTxt) =>
      store.commit("categories/filterCategories", filterTxt),
    resetCategory: () => store.commit("categories/resetCategory"),
  };
};

export default useCategories;

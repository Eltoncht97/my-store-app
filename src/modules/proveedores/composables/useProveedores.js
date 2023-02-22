import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { isValidForm } from "@/utils/isValidForm";
import Swal from "sweetalert2";
import { customAlert } from "@/utils/customSweetAlerts";

const useProveedores = () => {
  const store = useStore();
  const router = useRouter();

  const proveedor = computed(() => store.getters["proveedores/getProveedor"]);

  const filterSaldo = ref("todos");

  const rules = computed(() => {
    return {
      name: { required },
      cuil: { required, minLength: minLength(11), maxLength: maxLength(11) },
      address: { required },
      phone: { required },
    };
  });

  const v$ = useVuelidate(rules, proveedor);

  const loadProveedores = async (filterTxt = "", page = 1) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch("proveedores/getProveedores", {
      keyword: filterTxt,
      page,
    });
    store.commit("ui/setLoading", false);
    if (!ok) {
      customAlert("Error", message, "warning");
    }
  };

  const filterProveedores = async (filterTxt, page = 1) => {
    await store.dispatch("proveedores/getProveedores", {
      keyword: filterTxt,
      saldo: filterSaldo.value,
      page,
    });
  };

  const loadProveedor = async (id) => {
    store.commit("ui/setLoading", true);
    const { ok, message } = await store.dispatch(
      "proveedores/getProveedor",
      id
    );
    store.commit("ui/setLoading", false);
    if (!ok) {
      customAlert("Error", message, "warning");
    }
  };

  const createProveedor = async (redirect = true) => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch(
      "proveedores/createProveedor",
      proveedor.value
    );
    if (resp.ok) {
      Swal.fire("Completado!", "Proveedor creado exitosamente!", "success");
      loadProveedores();
      if (redirect) {
        router.push({ name: "proveedores-list" });
      }
    }
  };

  const updateProveedor = async () => {
    if (!isValidForm(rules.value, v$.value)) return;

    const resp = await store.dispatch(
      "proveedores/updateProveedor",
      proveedor.value
    );
    if (resp.ok) {
      Swal.fire(
        "Completado!",
        "Proveedor actualizado exitosamente!",
        "success"
      );
      router.push({ name: "proveedores-list" });
    }
  };

  const deleteProveedor = async (id) => {
    const resp = await store.dispatch("proveedores/deleteProveedor", id);
    if (resp.ok) {
      Swal.fire("Eliminado!", "El proveedor a sido eliminado.", "success");
      loadProveedores();
    }
  };

  return {
    filterSaldo,
    proveedor,
    proveedores: computed(() => store.getters["proveedores/getProveedores"]),
    totalProveedores: computed(
      () => store.getters["proveedores/getTotalProveedores"]
    ),
    v$,
    createProveedor,
    filterProveedores,
    loadProveedor,
    loadProveedores,
    updateProveedor,
    deleteProveedor,
    resetProveedor: () => store.commit("proveedores/resetProveedor"),
  };
};

export default useProveedores;

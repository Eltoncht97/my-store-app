import { createStore } from "vuex";
import ui from "@/modules/dashboard/store";
import clients from "@/modules/clients/store";
import products from "@/modules/products/store";
import categories from "@/modules/categories/store";
import users from "@/modules/users/store";
import ventas from "@/modules/ventas/store";
import cajas from "@/modules/cajas/store";
import auth from "@/modules/auth/store";
import cuentasClientes from "@/modules/cuentas-clientes/store";
import cuentasProveedores from "@/modules/cuentas-proveedores/store";
import recibos from "@/modules/recibos/store";
import proveedores from "@/modules/proveedores/store";
import ordenesDeCompra from "@/modules/ordenes-de-compra/store";
import pagos from "@/modules/pagos/store";
import impresiones from "@/modules/impresiones/store";

const store = createStore({
  modules: {
    auth,
    cajas,
    categories,
    clients,
    cuentasClientes,
    cuentasProveedores,
    impresiones,
    ordenesDeCompra,
    pagos,
    products,
    proveedores,
    recibos,
    ui,
    users,
    ventas,
  },
});

export default store;

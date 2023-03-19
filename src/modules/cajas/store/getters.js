// export const myGetter = ( state ) => {
// return state.something

import moment from "moment";

// }
export const getCajas = (state) => {
  return state.cajas;
};

export const getCajasAbiertas = (state) => {
  return state.cajas
    .filter((caja) => caja.state === "Abierta")
    .map((c) => ({
      ...c,
      label: `${c.user.fullName} - ${moment(String(c.createdAt)).format(
        "DD/MM/YYYY"
      )} - ${c.state} `,
    }));
};

export const getCaja = (state) => {
  return state.caja;
};

export const getInformeData = (state) => {
  return state.informeCaja;
};

export const getTotalMovimientos = (state) => {
  return state.caja.movimientos
    .map((m) => m.monto)
    .reduce((prev, curr) => prev + curr, 0);
};

export const getTotalMovimientosInforme = (state) => {
  return state.informeCaja.movimientos[0]
    .map((m) => m.monto)
    .reduce((prev, curr) => prev + curr, 0);
};

export const getTraspaso = (state) => {
  return state.traspasoForm;
};

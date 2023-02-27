export const getIVAValue = (ivaType) => {
  const ivaValue = Number(ivaType.split(" ")[1]) | 0;
  switch (ivaValue) {
    case 0:
      return 0;
    case 10:
      return 10.5;
    case 21:
      return 21;
    case 27:
      return 27.5;

    default:
      return 0;
  }
};

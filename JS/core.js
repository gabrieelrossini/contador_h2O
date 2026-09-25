function calcularMetaMl(peso) {
  return peso * 35;
}

function calcularMetaCopos(metaMl, tamanhoCopo) {
  return Math.ceil(metaMl / tamanhoCopo);
}

function calcularCoposBebidos(mlBebidos, tamanhoCopo) {
  return mlBebidos / tamanhoCopo;
}

function formatarMl(valorMl) {
  return Math.round(valorMl);
}

function formatarCopos(coposBebidos) {
  const arredondado = Math.round(coposBebidos * 10) / 10;
  return arredondado;
}

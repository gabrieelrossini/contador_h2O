function salvarEstado(peso, tamanhoCopo, mlBebidos) {
  localStorage.setItem("peso", peso);
  localStorage.setItem("tamanhoCopo", tamanhoCopo);
  localStorage.setItem("mlBebidos", mlBebidos);
}

function carregarEstado() {
  const peso = Number(localStorage.getItem("peso"));
  const tamanhoCopo = Number(localStorage.getItem("tamanhoCopo"));
  const mlBebidos = Number(localStorage.getItem("mlBebidos"));

  return { peso, tamanhoCopo, mlBebidos };
}

function jaConfigurado() {
  const peso = localStorage.getItem("peso");
  const tamanhoCopo = localStorage.getItem("tamanhoCopo");

  if (peso === null || tamanhoCopo === null) {
    return false;
  } else {
    return true;
  }
}

function limparTudo() {
  localStorage.removeItem('peso');
  localStorage.removeItem('tamanhoCopo');
  localStorage.removeItem('mlBebidos');
}

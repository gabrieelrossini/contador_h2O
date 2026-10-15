function mostrarTela(nome) {
  const divConfig = document.getElementById('configuracao');
  const divContador = document.getElementById('contador');

  if (nome === 'configuracao') {
    divConfig.style.display = 'block';
    divContador.style.display = 'none';
  } else {
    divConfig.style.display = 'none';
    divContador.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (jaConfigurado()) {
    mostrarTela('contador');
  } else {
    mostrarTela('configuracao');
  }
});

document.getElementById('btn-salvar').addEventListener('click', function() {
  const peso = document.getElementById('peso').value;
  const tamanhoCopo = document.getElementById('tamanho-copo').value;

  salvarEstado(peso, tamanhoCopo, 0);
  mostrarTela('contador');
  renderizarContador();
});

function renderizarContador() {
  // 1. Pega os dados salvos
  const estado = carregarEstado();

  // 2. Calcula metas e valores
  const metaMl = calcularMetaMl(estado.peso);
  const metaCopos = calcularMetaCopos(metaMl, estado.tamanhoCopo);
  const coposBebidos = calcularCoposBebidos(estado.mlBebidos, estado.tamanhoCopo);

  // 3. Formata os textos
  const textoCopos = formatarCopos(coposBebidos) + ' de ' + metaCopos + ' copos';
  const textoMl = formatarMl(estado.mlBebidos) + ' ml de ' + formatarMl(metaMl) + 'ml';

  // 4. Coloca na tela
  document.getElementById('texto-copos').textContent = textoCopos;
  document.getElementById('texto-ml').textContent = textoMl;

  // Calcula porcentagem (trava em 100% se passar)
  const porcentagem = Math.min(100, (estado.mlBebidos / metaMl) * 100);

  // Atualiza a barra
  document.getElementById('barra-preenchida').style.width = porcentagem + '%';

  // Verifica se bateu a meta
  if (estado.mlBebidos >= metaMl) {
    document.getElementById('mensagem-meta').textContent = 'Meta batida!';
  } else {
    document.getElementById('mensagem-meta').textContent = '';
  }

  // Desabilita botões de subtrair se mlBebidos for 0
  const btnMenosUm = document.getElementById('btn-menos-um');
  const btnMenosMeio = document.getElementById('btn-menos-meio');

  if (estado.mlBebidos === 0) {
    btnMenosUm.disabled = true;
    btnMenosMeio.disabled = true;
  } else {
    btnMenosUm.disabled = false;
    btnMenosMeio.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (jaConfigurado()) {
    mostrarTela('contador');
    renderizarContador(); // <-- adiciona essa linha
  } else {
    mostrarTela('configuracao');
  }
});

function adicionarCopos(quantidade) {
  // 1. Pega estado atual
  const estado = carregarEstado();

  // 2. Calcula novo valor (quantidade pode ser 1, 0.5, -0.5, -1)
  const novoMl = estado.mlBebidos + (estado.tamanhoCopo * quantidade);

  // 3. Trava em zero se ficar negativo
  const mlFinal = Math.max(0, novoMl);

  // 4. Salva e atualiza tela
  salvarEstado(estado.peso, estado.tamanhoCopo, mlFinal);
  renderizarContador();
}

document.getElementById('btn-mais-um').addEventListener('click', function() {
  adicionarCopos(1);
});
document.getElementById('btn-mais-meio').addEventListener('click', function() {
  adicionarCopos(0.5);
});
document.getElementById('btn-menos-meio').addEventListener('click', function() {
  adicionarCopos(-0.5);
});
document.getElementById('btn-menos-um').addEventListener('click', function() {
  adicionarCopos(-1);
});

// Cancela: só fecha o modal
document.getElementById('btn-cancelar-reset').addEventListener('click', function() {
  document.getElementById('modal-reset').style.display = 'none';
});

// Botão reset geral abre o mesmo modal
document.getElementById('btn-reset-geral').addEventListener('click', function() {
  document.getElementById('modal-reset').style.display = 'block';
});

let tipoReset = ''; // 'dia' ou 'geral'

// Quando abre o modal do reset do dia
document.getElementById('btn-reset').addEventListener('click', function() {
  tipoReset = 'dia';
  document.getElementById('modal-reset').style.display = 'block';
});

// Quando abre o modal do reset geral
document.getElementById('btn-reset-geral').addEventListener('click', function() {
  tipoReset = 'geral';
  document.getElementById('modal-reset').style.display = 'block';
});

// No confirmar, verifica qual era
document.getElementById('btn-confirmar-reset').addEventListener('click', function() {
  if (tipoReset === 'dia') {
    const estado = carregarEstado();
    salvarEstado(estado.peso, estado.tamanhoCopo, 0);
    renderizarContador();
  } else {
    limparTudo();
    mostrarTela('configuracao');
  }
  document.getElementById('modal-reset').style.display = 'none';
});

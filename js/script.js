document.addEventListener('DOMContentLoaded', function () {
  const adicionar = document.getElementById('adicionar');
  const botadd = document.getElementById('botadd');
  const voltar = document.getElementById('voltar');
  const voltar2 = document.getElementById('voltar2');
  const detalhes = document.getElementById('detalhes');
  const telaPrincipal = document.getElementById('telaPrincipal');
  const telaSecundaria = document.getElementById('telaSecundaria');
  const telaTer = document.getElementById('telaTer');
  const nomeInput = document.getElementById('nome');
  const idadeInput = document.getElementById('idade');
  const cargoInput = document.getElementById('cargo');
  const salarioInput = document.getElementById('salario');
  let funcionarios = [];
  let modo = 'Adicionar';
  let funcionarioEditando = null;

  class funcionario {
    constructor(nome, idade, cargo, salario) {
      this.nome = nome;
      this.idade = idade;
      this.cargo = cargo;
      this.salario = salario;
    }
    maiorque5k() {
      return this.salario >= 5000;
    }
  }
  
  const mostrartela1 = () => {
    telaPrincipal.style.display = 'block';
    telaSecundaria.style.display = 'none';
    telaTer.style.display = 'none';
  };

  const mostrartela2 = () => {
    telaPrincipal.style.display = 'none';
    telaSecundaria.style.display = 'block';
    telaTer.style.display = 'none';
  };

  const mostrartela3 = () => {
    telaPrincipal.style.display = 'none';
    telaSecundaria.style.display = 'none';
    telaTer.style.display = 'block';
  };

  const atualizarTabela = () => {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';
    funcionarios.forEach((f, index) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${f.nome}</td>
        <td>${f.idade}</td>
        <td>${f.cargo}</td>
        <td>${f.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>
          <button onclick="editarFuncionario(${index})">Editar</button>
          <button onclick="excluirFuncionario(${index})">Excluir</button>
        </td>
      `;
      corpoTabela.appendChild(linha);
    });
  };

  window.editarFuncionario = (index) => {
    const f = funcionarios[index];
    nomeInput.value = f.nome;
    idadeInput.value = f.idade;
    cargoInput.value = f.cargo;
    salarioInput.value = f.salario;
    funcionarioEditando = f;
    modo = 'Editar';
    mostrartela2();
  };

  window.excluirFuncionario = (index) => {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {
      funcionarios.splice(index, 1);
      atualizarTabela();
    }
  };

  const atualizarTabelaDetalhada = () => {
    const corpoDetalhado = document.getElementById('corpoDetalhado');
    const relatorios = document.getElementById('relatorios');
    corpoDetalhado.innerHTML = '';
    relatorios.innerHTML = '';

    const filtrados = funcionarios.filter(f=>f.maiorque5k());
    const funcionario = funcionarios;

    filtrados.forEach(f => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${f.nome}</td>
        <td>${f.idade}</td>
        <td>${f.cargo}</td>
        <td>${f.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      `;
      corpoDetalhado.appendChild(linha);
    });

    const media = funcionario.reduce((acc, f) => acc + f.salario, 0) / (filtrados.length || 1);
    relatorios.innerHTML += `<div><strong>Média salarial:</strong> ${media.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>`;

    const cargos = [...new Set(funcionarios.map(f => f.cargo))];
    relatorios.innerHTML += `<div><strong>Cargos únicos:</strong> ${cargos.join(', ')}</div>`;

    const nomes = funcionarios.map(f => f.nome.toUpperCase());
    relatorios.innerHTML += `<div><strong>Nomes em maiúsculo:</strong> ${nomes.join(', ')}</div>`;
  };

  adicionar.onclick = () => {
    modo = 'Adicionar';
    nomeInput.value = '';
    idadeInput.value = '';
    cargoInput.value = '';
    salarioInput.value = '';
    mostrartela2();
  };

  botadd.onclick = () => {
    const nome = nomeInput.value.trim();
    const idade = parseInt(idadeInput.value, 10);
    const cargo = cargoInput.value.trim();
    const salario = parseFloat(salarioInput.value);

    if (nome)

    if (!nome || isNaN(idade) || idade <= 0 || !cargo || isNaN(salario) || salario < 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
    if (modo === 'Adicionar') {
      funcionarios.push(new funcionario(nome, idade, cargo, salario));
    } else if (modo === 'Editar' && funcionarioEditando !== null) {
      funcionarioEditando.nome = nome;
      funcionarioEditando.idade = idade;
      funcionarioEditando.cargo = cargo;
      funcionarioEditando.salario = salario;
      funcionarioEditando = null;
      modo = 'Adicionar';
    }

    atualizarTabela();
    mostrartela1();
  };

  detalhes.onclick = () => {
    mostrartela3();
    atualizarTabelaDetalhada();
  };

  voltar.onclick = mostrartela1;
  voltar2.onclick = mostrartela1;

  mostrartela1();
});
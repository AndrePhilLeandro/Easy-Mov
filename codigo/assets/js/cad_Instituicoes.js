function salvarPagina1() {
    const nome = document.getElementById('nome').value;
    const reitResp = document.getElementById('reit_resp').value;
    const loc = document.getElementById('loc').value;
    const mantenedora = document.getElementById('mantenedora').value;
    const setorResp = document.getElementById('setor_resp').value;
    const email = document.getElementById('email').value;
    const regulamentacao = document.getElementById('regulamentacao').value;
    const quantAlunos = document.getElementById('quant_alunos').value;

    const instituicao = {
        nome,
        reitResp,
        loc,
        mantenedora,
        setorResp,
        email,
        regulamentacao,
        quantAlunos
    };

    localStorage.setItem('cadastroInstituicaoTemp', JSON.stringify(instituicao));
}

function salvarPagina2() {
    const veicPropioAlu = document.getElementById('veicPropio_Alu').value;
    const quantBike = document.getElementById('quantBike').value;
    const tempoServico = document.getElementById('tempoServico').value;
    const espacoReser = document.getElementById('espacoReser').value;

    const instituicaoTemp = JSON.parse(localStorage.getItem('cadastroInstituicaoTemp'));

    const instituicao = {
        ...instituicaoTemp,
        veicPropioAlu,
        quantBike,
        tempoServico,
        espacoReser
    };

    let cadastros = JSON.parse(localStorage.getItem('cadastrosInstituicoes')) || [];
    cadastros.push(instituicao);
    localStorage.setItem('cadastrosInstituicoes', JSON.stringify(cadastros));
    localStorage.removeItem('cadastroInstituicaoTemp');
}

function finalizarCadastro() {
    salvarPagina2();
    alert("Cadastro realizado com sucesso!");
    if (confirm("Deseja realizar outro cadastro?")) {
        window.location.href = '/codigo/pages/cad_Instituicoes.html';
    } else {
        window.location.href = '/codigo/pages/Busca.html';
    }
}

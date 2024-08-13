function filtrarInstituicoes() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const listaInstituicoes = document.getElementById('listaInstituicoes');
    const cadastros = JSON.parse(localStorage.getItem('cadastrosInstituicoes')) || [];

    listaInstituicoes.innerHTML = '';

    const resultadosFiltrados = cadastros.filter(instituicao => instituicao.nome.toLowerCase().includes(filtro));

    if (resultadosFiltrados.length > 0) {
        resultadosFiltrados.forEach(instituicao => {
            const instituicaoRow = document.createElement('tr');

            instituicaoRow.innerHTML = `
                <td data-label="Nome">${instituicao.nome}</td>
                <td data-label="Reitor(a)">${instituicao.reitResp}</td>
                <td data-label="Localização">${instituicao.loc}</td>
                <td data-label="Mantenedora">${instituicao.mantenedora}</td>
                <td data-label="Setor Responsável">${instituicao.setorResp}</td>
                <td data-label="Email">${instituicao.email}</td>
                <td data-label="Regulamentação">${instituicao.regulamentacao}</td>
                <td data-label="Faixa de Alunos">${instituicao.quantAlunos}</td>
                <td data-label="Veículo Próprio">${instituicao.veicPropioAlu}</td>
                <td data-label="Qtd. Bicicletas">${instituicao.quantBike}</td>
                <td data-label="Tempo de Uso">${instituicao.tempoServico}</td>
                <td data-label="Espaço Reservado">${instituicao.espacoReser}</td>
            `;

            listaInstituicoes.appendChild(instituicaoRow);
        });
    } else {
        listaInstituicoes.innerHTML = '<tr><td colspan="12">Nenhuma instituição encontrada.</td></tr>';
    }
}

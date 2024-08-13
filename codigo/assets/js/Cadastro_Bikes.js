// Configurar a ação do botão de cadastro
document.getElementById('cadastrarBike').addEventListener('click', cadastrarBike);

// Ler bikes do localStorage
function leBikes() {
    let strBikes = localStorage.getItem('db');
    let objBikes = { Bikes: [] };
    if (strBikes) {
        objBikes = JSON.parse(strBikes);
    }
    return objBikes;
}

// Salvar bikes no localStorage
function salvaBikes(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

// Exibir bikes na página
function exibirBikes() {
    let objBikes = leBikes();
    let listaBikes = document.getElementById('listaBikes');
    listaBikes.innerHTML = '';

    objBikes.Bikes.forEach(bike => {
        let bikeItem = document.createElement('div');
        bikeItem.innerHTML = `
        <h5 class="card-title">${bike.idBike}</h5>
            <img src="${bike.Imagem}" alt="Imagem da Bike">
            <p>Marca: ${bike.Marca}</p>
            <p>Aro: ${bike.Aro}</p>
            <p>Marcha: ${bike.Marcha}</p>
            <p>Freio: ${bike.Freio}</p>
            <p>Cesta: ${bike.Cesta}</p>
            <p> Preço: R$ ${bike.Valor}</p>
            <p> Estoque: ${bike.QuantBike}  </p>
            <p>Descrição: ${bike.Descricao}</p>
        `;
        listaBikes.appendChild(bikeItem);
    });
}

// Cadastrar bike
function cadastrarBike() {
    // Ler dados do localStorage
    let objBikes = leBikes();

    // Coletar dados do formulário
    let strImagem = document.getElementById('imagemBike').value;
    let strMarca = document.getElementById('marcaBike').value;
    let strAro = document.getElementById('aroBike').value;
    let strId = document.getElementById('idBike').value;
    let strQuantBike = document.getElementById('quantBike').value;
    let strMarcha = document.getElementById('marchaBike').checked ? "Sim" : "Não";
    let strFreio = document.getElementById('freioBike').checked ? "Sim" : "Não";
    let strCesta = document.getElementById('cestaBike').checked ? "Sim" : "Não";
    let strValor = document.getElementById('valorBike').value;
    let strDescricao = document.getElementById('descricaoBike').value;

    let valor = parseFloat(strValor);
    let valorFormatado = valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Criar objeto com nova bike
    let novaBike = {
        Id: strId,
        Imagem: strImagem,
        Marca: strMarca,
        Aro: strAro,
        Marcha: strMarcha,
        Freio: strFreio,
        Cesta: strCesta,
        valor: strValor,
        Descricao: strDescricao,
        Disponiveis: strQuantBike,
        Alugadas: 0,
        Indisponiveis: 0
    };

    // Adicionar nova bike ao objeto de bikes
    objBikes.Bikes.push(novaBike);

    // Salvar bikes no localStorage novamente
    salvaBikes(objBikes);

    // Informar o cadastro efetivado
    alert('Bike cadastrada com sucesso');
    window.open('/codigo/pages/Adm_Bikes.html', '_blank');
    


    // Atualizar a exibição das bikes
    exibirBikes();
}

// Exibir as bikes ao carregar a página
document.addEventListener('DOMContentLoaded', exibirBikes);

document.addEventListener("DOMContentLoaded", function () {
    // Carregar bicicletas do localStorage ao carregar a página
    let objBikes = leBikes();
    displaytela(objBikes.Bikes);
});

// Função para ler as bicicletas do localStorage
function leBikes() {
    let strBikes = localStorage.getItem('db');
    let objBikes = { Bikes: [] };
    if (strBikes) {
        objBikes = JSON.parse(strBikes);
    }
    return objBikes;
}

function salvaBikes(dados) {

    localStorage.setItem('db', JSON.stringify(dados));
}

// Função para exibir as bicicletas na tela
function displaytela(items) {
    let mostrartela = document.getElementById("displaytela");
    let div = document.createElement('div');
    div.className = "row";
    items.forEach((item) => {
        let maximoCaracteres = 30; 
        let descricaoLimitada = item.Descricao.length > maximoCaracteres 
                                ? item.Descricao.substring(0, maximoCaracteres) + "..." 
                                : item.Descricao;
        let card = document.createElement('div');
        card.className = "col-12 col-md-3 p-0 m-0";

        card.innerHTML = `
        <div class="card m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${item.Id}">
        <img src="${item.Imagem}" class="card-img-top border" id="img200px">
        <div class="card-body p-1">
            <p><b>Modelo:</b> ${item.Marca}</p>
            <p><b>Categoria:</b> Bicicletas</p>
            <p><b>Desc:</b> ${descricaoLimitada}</p>
        </div>
    </div>`;
        
        div.appendChild(card);
    });

    mostrartela.appendChild(div);

    // Evento para atualizar o modal
    document.getElementById('exampleModal').addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; // Botão que acionou o modal
        var id = button.getAttribute('data-id'); // Extrai informação do atributo data-id
        var selectedItem = items.find(item => item.Id == id); // Encontra o item com base no ID
        var modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = ''; // Limpa o conteúdo anterior

        // Adiciona imagem e informações da bicicleta ao modal
        modalBody.innerHTML = `
        <div class="card m-1">
            <div class="row">
                <div class="col-4">
                    <img src="${selectedItem.Imagem}" class="card-img-top border" id="modalImg">
                    </div>
                    <div class="col-4">
                        <p><b>Modelo:</b>${selectedItem.Marca}</p>
                        <p><b>Descrição</b>:<br>${selectedItem.Descricao}</p>
                        <p><b>Disponíveis</b>:<br><span class="fs-5 text badge rounded-pill text-bg-success mb-2">${selectedItem.Disponiveis}</span></p>
                        <p><b>Alugadas</b>:<br><span class="fs-5 text badge rounded-pill text-bg-primary mb-2">${selectedItem.Alugadas}</span></p>
                        <p><b>Indisponíveis</b>:<br><span class="fs-5 text badge rounded-pill text-bg-danger mb-2">${selectedItem.Indisponiveis}</span></p>
                    </div>
            </div> 
            <div class="row ">
                <div class="col-12 offset-4">
                
                </div>    
            </div>
        </div>`;
    });
}
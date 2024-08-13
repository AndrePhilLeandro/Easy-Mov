// Função para obter dados do localStorage
function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para salvar dados no localStorage
function setLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Ler bikes do localStorage
function leBikes() {
    return getLocalStorageData('db');
}

// Ler carrinho do localStorage
function leCarrinho() {
    return getLocalStorageData('cart');
}

// Salvar carrinho no localStorage
function salvaCarrinho(cart) {
    setLocalStorageData('cart', cart);
}




// Filtro Menor Preço
document.getElementById('FilMenor').addEventListener('click', FilMenor);
function FilMenor() {
    var bikes = leBikes();
    var menorPreco = bikes[0].preco;
    for (var i = 1; i < bikes.length; i++) {
        if (bikes[i].preco < menorPreco) {
            menorPreco = bikes[i].preco;
        }
    }
    var bikesMenorPreco = bikes.filter(function(bike) {
        return bike.preco === menorPreco;
    });

    // Exibir bicicletas com o menor preço no elemento com o ID "listaBikes"
    var resultadoElement = document.getElementById('listaBikes');
    resultadoElement.innerHTML = '';
    bikesMenorPreco.forEach(function(bike) {
        resultadoElement.innerHTML += 'Marca: ' + bike.marca + ', Preço: ' + bike.preco + '<br>';
        return bikes;
    });
}

function renderBikeCards() {
    let objBikes = leBikes();
    let listaBikes = document.getElementById('listaBikes');
    listaBikes.innerHTML = '';

    objBikes.Bikes.forEach((bike, index) => {
        let card = `
            <div class="col">
                <div class="card" style="width: 18rem; padding: 50px; border-color: #8452ed; ">
                    <h5 class="card-title">${bike.Marca}</h5>
                    <img src="${bike.Imagem}" class="card-img-top" alt="Imagem da Bike">
                    <div class="card-body">

                    <label for="quantidade${index}">Quantidade</label>
                    <input type="number" id="quantidade${index}" style="border: 1px solid #ccc66d; border-radius: 10px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
                                    background-color: whitesmoke;  margin-bottom: 5px;   " 
                           value="1" min="1">
                    
                   
                    <button type="button" class="btn btn-outline-success" onclick="Addcart(${index}, ${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                        Adicionar ao Carrinho
                    </button>
                    
                        <br>
                        <div>
                            R$ ${bike.valor}
                        </div>
                        Estoque: ${bike.Disponiveis}
                    </div>
                </div>
            </div>
        `;
        listaBikes.innerHTML += card;
    });
}

// Função para adicionar ao carrinho
function Addcart(index, quantity) {
    let quantidade = document.getElementById(`quantidade${quantity}`).value;
    // Aqui você pode adicionar a lógica para adicionar ao carrinho com a quantidade selecionada
    console.log(`Adicionando ${quantidade} unidades da bike ${index} ao carrinho.`);
}

// Função para adicionar bike ao carrinho
function Addcart(index) {
    let objBikes = leBikes();
    const bike = objBikes.Bikes[index];
    const cart = leCarrinho();
    cart.push(bike);
    salvaCarrinho(cart);
    renderCartItems();
}

// Davi Guedes

function renderBikeCards() {
    let objBikes = leBikes();
    let listaBikes = document.getElementById('listaBikes');
    listaBikes.innerHTML = '';

    objBikes.Bikes.forEach((bike, index) => {
        let card = `
            <div class="col">
                <div class="card" style="width: 18rem; padding: 50px; border-color: #8452ed; ">
                    <h5 class="card-title">${bike.Marca}</h5>
                    <img src="${bike.Imagem}" class="card-img-top" alt="Imagem da Bike">
                    <div class="card-body">
                        <label for="quantidade${index}">Quantidade</label>
                        <input type="number" id="quantidade${index}" style="border: 1px solid #ccc66d; border-radius: 10px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
                                        background-color: whitesmoke;  margin-bottom: 5px;   " 
                               value="1" min="1">
                        <button type="button" class="btn btn-outline-success" onclick="Addcart(${index}, ${index})">
                            Adicionar ao Carrinho
                        </button>
                        <br>
                        <div>
                            R$ ${bike.valor}
                        </div>
                        Estoque: ${bike.Disponiveis}
                        <br>
                        <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="showBikeDetails(${index})">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
        listaBikes.innerHTML += card;
    });
}

// Função para exibir detalhes da bike no modal
function showBikeDetails(index) {
    let objBikes = leBikes();
    const bike = objBikes.Bikes[index];
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    <img src="${bike.Imagem}" style=" width: 18rem; "  class="card-img-top border" id="modalImg">
        <div class="card m-1">
            <div class="row">
                <div class="col-4">
                    
                </div>
                <div class="col-8">
                    <p><b>Modelo:</b> ${bike.Marca}</p>
                    <p><b>Aro:</b> <span> ${bike.Aro}</span></p>
                    <p><b>Marcha:</b> <span>${bike.Marcha}</span></p>
                    <p><b>Freios:</b> <span> ${bike.Freio}</span></p>
                    <p><b>Cesta:</b> <span>${bike.Cesta}</span></p>
                    <p><b>Descrição:</b> ${bike.Descricao}</p>
                    
                </div>
            </div>
        </div>
    `;
}

// Exibir as bikes e os itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderBikeCards();
    renderCartItems();
});
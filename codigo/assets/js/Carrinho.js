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

// Função para adicionar bike ao carrinho
function Addcart(index) {
    let objBikes = leBikes();
    const bike = objBikes[index]; // Ajustado para pegar a bike correta
    const cart = leCarrinho();
    cart.push(bike);
    salvaCarrinho(cart);
    renderCartItems();
    renderBikeCards(); // Atualiza as bikes exibidas após adicionar ao carrinho
}

// Função para remover bike do carrinho
function removeFromCart(index) {
    const cart = leCarrinho();
    cart.splice(index, 1);
    salvaCarrinho(cart);
    renderCartItems();
    renderBikeCards(); // Atualiza as bikes exibidas após remover do carrinho
}

// Função para exibir bikes do carrinho na página
function renderBikeCards() {
    let cartBikes = leCarrinho();
    let listaBikes = document.getElementById('listaBikes');
    listaBikes.innerHTML = '';

    cartBikes.forEach((bike, index) => {
        let card = `
            <div class="card" style="width: 150px;margin-top: 5px;">
                <img src="${bike.Imagem}" class="card-img-top" alt="Bike">
                <div class="card-body">
                    <p class="card-text">${bike.Marca}</p>
                    <p class="card-text">R$ ${bike.valor}</p>
                    <button type="button" class="btn btn-danger" onclick="removeFromCart(${index})">Remover</button>
                </div>
            </div>
        `;
        listaBikes.innerHTML += card;
    });
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = leCarrinho();
    cartItems.innerHTML = ''; // Limpa o conteúdo anterior

    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.valor); // Adiciona o valor do item ao total como um número

        // Cria um div para cada item do carrinho com a classe "col" para exibir lado a lado
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('col', 'mb-4'); // Adiciona classes do Bootstrap para espaçamento

        const itemContent = `
          
        `;

        itemContainer.innerHTML = itemContent;
        cartItems.appendChild(itemContainer); // Adiciona o item à lista no HTML
    });

    cartTotal.innerHTML = `Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`; // Formata o total como moeda brasileira
}

// Função para salvar histórico de aluguel no localStorage
function salvarHistorico() {
    const cart = leCarrinho();
    let historico = getLocalStorageData('historico');
    historico.push(cart); // Adiciona o carrinho atual ao histórico

    setLocalStorageData('historico', historico);

    // Limpa o carrinho após salvar no histórico
    salvaCarrinho([]);
}

// Exibir as bikes e os itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderBikeCards();
    renderCartItems();
});

// Evento para finalizar a compra e salvar no histórico
document.getElementById('Finalizar_Compra').addEventListener('click', function() {
    alert("Aluguel realizado com sucesso!");
    salvarHistorico();
    
});

// Chama a função para renderizar os cards de histórico ao carregar a página
window.onload = function() {
    renderBikeCards();
};

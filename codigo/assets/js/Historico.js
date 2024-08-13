// Função para obter dados do localStorage
function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Função para renderizar os cards das bicicletas no histórico
function renderHistoricoBikes() {
    let historicoBikes = getLocalStorageData('historico');
    let listaBikes = document.getElementById('historicoBikes');
    listaBikes.innerHTML = '';

    historicoBikes.forEach((cart, cartIndex) => {
        let cartItemsHtml = '';
        cart.forEach((bike, index) => {
            let card = `
                <div class="card" style="width: 150px;margin-top: 5px;">
                    <img src="${bike.Imagem}" class="card-img-top" alt="Bike">
                    <div class="card-body">
                        <p class="card-text">${bike.Marca}</p>
                        <p class="card-text">R$ ${bike.valor}</p>
                    </div>
                </div>
            `;
            cartItemsHtml += card;
        });

        // Criar div para cada carrinho no histórico
        let cartContainer = document.createElement('div');
        cartContainer.classList.add('historico-cart');
        cartContainer.innerHTML = `
            <h4>Carrinho ${cartIndex + 1}</h4>
            <div class="d-flex flex-wrap">${cartItemsHtml}</div>
        `;

        listaBikes.appendChild(cartContainer);
    });
}

// Chama a função para renderizar os cards de histórico ao carregar a página
window.onload = function() {
    renderHistoricoBikes();
};

// Retorna os dados do carrinho ou um array vazio
function getCarrinho() {
    return JSON.parse(localStorage.getItem('marketplace_carrinho')) || [];
}

// Salva e atualiza badge
function salvarCarrinho(carrinho) {
    localStorage.setItem('marketplace_carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function adicionarAoCarrinho(produtoId) {
    const carrinho = getCarrinho();
    const produto = produtos.find(p => p.id === parseInt(produtoId));
    
    if (produto) {
        const itemExistente = carrinho.find(item => item.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        salvarCarrinho(carrinho);
        if (typeof mostrarToast === 'function') {
            mostrarToast(`"${produto.nome}" adicionado!`);
        }
    }
}

function removerDoCarrinho(produtoId) {
    let carrinho = getCarrinho();
    carrinho = carrinho.filter(item => item.id !== parseInt(produtoId));
    salvarCarrinho(carrinho);
    renderizarPaginaCarrinho();
}

function atualizarQuantidade(produtoId, delta) {
    const carrinho = getCarrinho();
    const item = carrinho.find(item => item.id === parseInt(produtoId));
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(produtoId);
            return;
        }
        salvarCarrinho(carrinho);
        renderizarPaginaCarrinho();
    }
}

function atualizarContadorCarrinho() {
    const carrinho = getCarrinho();
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const contadores = document.querySelectorAll('#cart-count');
    
    contadores.forEach(contador => {
        if (totalItens > 0) {
            contador.innerText = totalItens;
            contador.style.display = 'flex';
        } else {
            contador.style.display = 'none';
        }
    });
}

function renderizarPaginaCarrinho() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return; // Só roda na página carrinho.html

    const carrinho = getCarrinho();
    container.innerHTML = '';
    
    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10">
                <p class="text-gray-500 mb-4">Seu carrinho está vazio.</p>
                <a href="../index.html" class="text-mercadoBlue font-medium hover:underline">Voltar para a página inicial</a>
            </div>
        `;
        totalEl.innerText = 'R$ 0,00';
        return;
    }

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between py-5 gap-4';
        itemDiv.innerHTML = `
            <div class="flex items-center gap-4 w-full sm:w-auto">
                <img src="${item.imagem}" alt="${item.nome}" class="w-20 h-20 object-cover rounded shadow-sm">
                <div>
                    <h3 class="font-semibold text-gray-800 max-w-xs truncate" title="${item.nome}">${item.nome}</h3>
                    <p class="text-mercadoBlue font-medium text-lg mt-1">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
            <div class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div class="flex items-center border rounded-md overflow-hidden shadow-sm">
                    <button onclick="atualizarQuantidade(${item.id}, -1)" class="px-3 py-1.5 bg-gray-50 hover:bg-gray-200 transition-colors text-gray-600 font-bold">-</button>
                    <span class="px-4 py-1.5 font-medium border-x text-sm">${item.quantidade}</span>
                    <button onclick="atualizarQuantidade(${item.id}, 1)" class="px-3 py-1.5 bg-gray-50 hover:bg-gray-200 transition-colors text-gray-600 font-bold">+</button>
                </div>
                <button onclick="removerDoCarrinho(${item.id})" class="text-gray-400 hover:text-red-500 transition-colors" title="Remover item">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        `;
        container.appendChild(itemDiv);
    });

    totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}
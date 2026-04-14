// --- UTILITÁRIOS ---
function mostrarToast(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-xl transform transition-all duration-300 translate-y-10 opacity-0 z-50 font-medium';
    toast.innerText = mensagem;
    document.body.appendChild(toast);
    
    // Animação de entrada
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });
    
    // Animação de saída
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Retorna se o usuário está na raiz (index) ou nas subpáginas (para rotas relativas)
const isPaginaPrincipal = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || !window.location.pathname.includes('/pages/');

// --- INICIALIZADORES DE PÁGINA ---

// 1. Home (index.html)
function initHome() {
    const grid = document.getElementById('product-grid');
    const inputsBusca = [document.getElementById('search-input'), document.getElementById('search-input-mobile')];
    
    if (!grid) return;

    function renderizarGrid(lista) {
        grid.innerHTML = '';
        if(lista.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-xl text-gray-500">Nenhum produto encontrado com este nome.</p></div>';
            return;
        }
        
        const caminhoPrefixo = isPaginaPrincipal ? 'pages/' : '';

        lista.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col group';
            
            // Navega para a tela de detalhes ao clicar no card
            card.onclick = () => window.location.href = `${caminhoPrefixo}produto.html?id=${produto.id}`;
            
            card.innerHTML = `
                <div class="relative h-56 overflow-hidden bg-gray-50 p-4">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-5 flex flex-col flex-grow border-t border-gray-100">
                    <h2 class="text-sm font-light text-gray-700 mb-2 line-clamp-2 min-h-[40px]">${produto.nome}</h2>
                    <div class="mt-auto">
                        <p class="text-2xl font-normal text-gray-900">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                        <p class="text-xs text-green-500 font-semibold mt-1">10x sem juros</p>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    renderizarGrid(produtos);

    // Lógica de Busca (Desktop e Mobile)
    inputsBusca.forEach(input => {
        if(input) {
            input.addEventListener('input', (e) => {
                const termo = e.target.value.toLowerCase();
                const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
                renderizarGrid(filtrados);
                
                // Sincroniza ambos os inputs se existirem
                inputsBusca.forEach(i => { if(i && i !== input) i.value = e.target.value; });
            });
        }
    });
}

// 2. Detalhes do Produto (produto.html)
function initProduto() {
    const container = document.getElementById('product-details');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        container.innerHTML = `
            <div class="text-center py-16 bg-white rounded-lg shadow-sm">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado!</h2>
                <a href="../index.html" class="bg-mercadoBlue text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors inline-block">Voltar ao Início</a>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row p-6 md:p-10 gap-10">
            <div class="w-full md:w-1/2 flex justify-center items-center p-4">
                <img src="${produto.imagem}" alt="${produto.nome}" class="w-full max-w-md object-contain mix-blend-multiply">
            </div>
            <div class="w-full md:w-1/2 flex flex-col justify-start">
                <p class="text-sm text-gray-400 mb-2">Novo | +1000 vendidos</p>
                <h1 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 leading-tight">${produto.nome}</h1>
                
                <div class="mb-8">
                    <p class="text-5xl font-light text-gray-900 tracking-tighter">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                    <p class="text-green-500 mt-2">em <span class="font-semibold">10x de R$ ${(produto.preco/10).toFixed(2).replace('.', ',')}</span> sem juros</p>
                </div>
                
                <h3 class="font-medium text-lg mb-2">O que você precisa saber sobre este produto</h3>
                <p class="text-gray-600 mb-8 text-sm leading-relaxed">${produto.descricao}</p>
                
                <div class="mt-auto flex flex-col gap-3">
                    <button class="w-full bg-mercadoBlue hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded shadow transition-colors">
                        Comprar agora
                    </button>
                    <button onclick="adicionarAoCarrinho(${produto.id})" class="w-full bg-blue-100 hover:bg-blue-200 text-mercadoBlue font-semibold py-4 px-8 rounded transition-colors">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    `;
}

// 3. Login Fake (login.html)
function initLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        localStorage.setItem('marketplace_usuarioLogado', email);
        
        mostrarToast('Login realizado com sucesso!');
        const btnSubmit = form.querySelector('button');
        btnSubmit.innerText = 'Entrando...';
        btnSubmit.disabled = true;

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    });
}

// --- BOOTSTRAP GERAL ---
document.addEventListener('DOMContentLoaded', () => {
    // Verifica e atualiza status visual de usuário logado
    const btnLogin = document.getElementById('btn-login');
    const usuario = localStorage.getItem('marketplace_usuarioLogado');
    if (btnLogin && usuario) {
        btnLogin.innerText = `Olá, ${usuario.split('@')[0]}`;
        btnLogin.href = '#'; // Previne navegação
    }

    // Inicializa contador global
    atualizarContadorCarrinho();

    // Invoca funções por página (elas auto-ignoram se o elemento não existir)
    initHome();
    initProduto();
    renderizarPaginaCarrinho(); 
    initLogin();
});
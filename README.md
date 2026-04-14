# 🛒 MarketPlace - E-commerce Frontend

Uma aplicação web front-end que simula as principais funcionalidades de um marketplace. O projeto foi desenvolvido com foco em responsividade, código limpo e usabilidade, sem a necessidade de um back-end (utilizando `localStorage` para persistência de dados).

## 🚀 Funcionalidades

- **Catálogo de Produtos:** Listagem dinâmica de produtos em um grid responsivo.
- **Sistema de Busca:** Filtro em tempo real de produtos pelo nome.
- **Página de Detalhes:** Visualização individual do produto passando o ID via URL (`?id=X`).
- **Carrinho de Compras (com `localStorage`):**
  - Adicionar e remover produtos.
  - Controle de quantidade (aumentar/diminuir).
  - Cálculo automático do valor total.
  - Indicador visual (badge) com a quantidade de itens no header.
- **Simulação de Login:** Autenticação mockada com salvamento do e-mail do usuário logado para personalização do cabeçalho.
- **Design Responsivo:** Layout adaptável para dispositivos móveis, tablets e desktops (Mobile-first).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando apenas tecnologias front-end nativas e ferramentas de estilização via CDN:

- **HTML5:** Estruturação semântica.
- **Tailwind CSS (via CDN):** Estilização utilitária rápida e responsiva, com configuração de cores personalizadas (Amarelo Mercado e Azul).
- **JavaScript (Vanilla):** Lógica de negócios, manipulação do DOM, manipulação de URLs e uso do `localStorage`.
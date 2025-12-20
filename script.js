// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Detecta página atual pelo ID presente
function detectCurrentPage() {
    if (document.getElementById('updatePage')) return 'update.html';
    if (document.getElementById('aboutPage')) return 'about.html';
    return 'index.html'; // home
}

// Navegação INTELIGENTE entre páginas
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const page = btn.dataset.page;
        const currentPage = detectCurrentPage();
        
        // Se está na página correta → só ativa botão
        if (currentPage === page + '.html') {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            return;
        }
        
        // Navega para outra página
        window.open(page + '.html', '_self');
    });
});

// Resto do código HOME (só carrega no index.html)
if (detectCurrentPage() === 'index.html') {
// Dados dos sites expandidos
const sitesData = {
    games: [
        {
            name: 'Steam',
            url: 'https://store.steampowered.com/',
            description: 'Maior plataforma de jogos PC com milhares de títulos, vendas frequentes e comunidade ativa.'
        },
        {
            name: 'Epic Games',
            url: 'https://store.epicgames.com/',
            description: 'Jogos grátis semanais, launcher exclusivo e suporte a Unreal Engine.'
        },
        {
            name: 'itch.io',
            url: 'https://itch.io/',
            description: 'Indies, jogos experimentais e suporte direto aos desenvolvedores independentes.'
        }
    ],
    casino: [
        {
            name: 'Stake',
            url: 'https://stake.com/',
            description: 'Cassino crypto com apostas esportivas, slots e crash games originais.'
        },
        {
            name: 'Roobet',
            url: 'https://roobet.com/',
            description: 'Cassino moderno com provably fair games e streaming ao vivo.'
        }
    ],
    sports: [
        {
            name: 'Bet365',
            url: 'https://www.bet365.com/',
            description: 'Maior casa de apostas esportivas do mundo com odds competitivas.'
        },
        {
            name: 'Pinnacle',
            url: 'https://www.pinnacle.com/',
            description: 'Odds mais altas do mercado, sem limites e foco em apostadores profissionais.'
        }
    ]
};

// Função para remover todos os detalhes
function removeAllSiteDetails() {
    document.querySelectorAll('.site-detail-card').forEach(card => {
        card.classList.remove('visible');
    });
}

// Função para LIMPAR SITES completamente
function clearSites() {
    document.getElementById('cardContainer').innerHTML = '';
    removeAllSiteDetails();
}

// Função para pegar nome da categoria (texto visível)
function getCategoryName(btn) {
    return btn.querySelector('span').textContent.toLowerCase();
}

// ORDENAÇÃO A-Z, Z-A e FILTRO por LETRA INICIAL
let currentSort = 'az';
let currentLetter = '';

document.querySelectorAll('.sort-btn, .letter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de TODOS os botões
        document.querySelectorAll('.sort-btn, .letter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Define modo atual
        if (btn.classList.contains('sort-btn')) {
            currentSort = btn.dataset.sort;
            currentLetter = '';
        } else {
            currentLetter = btn.dataset.letter.toLowerCase();
            currentSort = '';
        }

        // ✅ SEMPRE limpa sites ao mudar filtro
        clearSites();
        filterAndSortCategories();
    });
});

function filterAndSortCategories() {
    const buttonsGrid = document.getElementById('buttonsGrid');
    const categoryBtns = Array.from(document.querySelectorAll('.category-btn'));

    // 1. RESETA TODOS os estilos primeiro
    categoryBtns.forEach(btn => {
        btn.style.display = 'none';
        btn.style.opacity = '0';
    });

    let filteredBtns = categoryBtns;

    // 2. FILTRA por letra inicial se selecionada
    if (currentLetter) {
        filteredBtns = categoryBtns.filter(btn => {
            return getCategoryName(btn).startsWith(currentLetter);
        });
    }

    // 3. ORDENA se A-Z ou Z-A (MOSTRA TODOS na ordem correta)
    if (!currentLetter && currentSort) {
        filteredBtns = categoryBtns.slice();
        filteredBtns.sort((a, b) => {
            if (currentSort === 'az') {
                return getCategoryName(a).localeCompare(getCategoryName(b));
            } else if (currentSort === 'za') {
                return getCategoryName(b).localeCompare(getCategoryName(a));
            }
            return 0;
        });
    }

    // 4. Aplica estilos aos filtrados/ordenados
    filteredBtns.forEach(btn => {
        btn.style.display = 'flex';
        btn.style.opacity = '1';
    });

    // 5. Reordena no DOM mantendo todos os elementos
    filteredBtns.forEach(btn => {
        buttonsGrid.appendChild(btn);
    });
}

// Navegação Header
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(page + 'Page').classList.add('active');

        if (page === 'home') {
            clearSites();
            filterAndSortCategories();
        }
    });
});

// ✅ EVENT DELEGATION PERFEITO
document.addEventListener('click', (e) => {
    // Category buttons - SEMPRE limpa sites antes
    if (e.target.closest('.category-btn')) {
        const btn = e.target.closest('.category-btn');
        const category = btn.dataset.category;
        clearSites(); // ✅ LIMPA sites ANTES de mostrar novos
        showSitesList(category);
        return;
    }

    // Cards dos sites
    if (e.target.classList.contains('site-btn')) {
        e.stopPropagation();
        const item = e.target.closest('.site-item');
        const detailCard = item.querySelector('.site-detail-card');

        document.querySelectorAll('.site-detail-card').forEach(card => {
            card.classList.remove('visible');
        });

        detailCard.classList.add('visible');
        return;
    }

    if (e.target.classList.contains('close-card')) {
        e.stopPropagation();
        e.target.closest('.site-detail-card').classList.remove('visible');
        return;
    }

    if (!e.target.closest('.site-item')) {
        document.querySelectorAll('.site-detail-card').forEach(card => {
            card.classList.remove('visible');
        });
    }
});

function showSitesList(category) {
    const container = document.getElementById('cardContainer');
    const sites = sitesData[category] || [];

    let html = `<div class="sites-list">`;

    sites.forEach((site, index) => {
        html += `
            <div class="site-item">
                <button class="site-btn" data-category="${category}" data-site="${index}">
                    ${site.name}
                </button>
                <div class="site-detail-card">
                    <button class="close-card">×</button>
                    <h4>${site.name}</h4>
                    <p class="site-detail-description">${site.description}</p>
                    <a href="${site.url}" target="_blank" class="site-visit-btn">
                        Visitar Site →
                    </a>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

// BARRA DE PESQUISA
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const buttons = document.querySelectorAll('.category-btn');

    if (query !== '') {
        clearSites();
    }

    buttons.forEach(btn => {
        const categoryName = getCategoryName(btn);
        if (query === '' || categoryName.includes(query)) {
            btn.style.display = 'flex';
            btn.style.opacity = '1';
        } else {
            btn.style.display = 'none';
        }
    });
});

searchInput.addEventListener('focus', () => {
    searchInput.select();
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchInput.blur();
    }
});

// Inicializa ordenação
filterAndSortCategories();

// No final do script.js, adicione esta função:
function navigateToPage(page) {
    if (page === 'update') {
        window.open('update.html', '_self'); // Abre página separada
        return;
    }

    // Resto da navegação normal (home/about)
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    document.getElementById(page + 'Page').classList.add('active');
    e.target.classList.add('active');
}

// Substitua o event listener do header por:
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const page = btn.dataset.page;
        navigateToPage(page);
    });
})
};

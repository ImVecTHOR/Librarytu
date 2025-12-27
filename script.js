/* =========================
   HEADER SCROLL
========================= */
window.addEventListener('scroll', () => {
    document.querySelector('.header')
        ?.classList.toggle('scrolled', window.scrollY > 50);
});

/* =========================
   NAVEGAÇÃO HEADER
========================= */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        window.location.href = page === 'home' ? 'index.html' : `${page}.html`;
    });
});

const btn = document.getElementById("showEmail");
const emailField = document.getElementById("email");

if (btn) {
  btn.addEventListener("click", () => {
    const user = "techsensacao";
    const domain = "gmail.com";
    emailField.textContent = `${user}@${domain}`;
    btn.remove(); // remove o botão depois de mostrar
  });
}


/* =========================
   DADOS DOS SITES
========================= */
const sitesData = {
    games: [
        { name: 'Steam', url: 'https://store.steampowered.com/', description: 'Maior plataforma de jogos PC.' },
        { name: 'Epic Games', url: 'https://store.epicgames.com/', description: 'Jogos grátis semanais.' },
        { name: 'itch.io', url: 'https://itch.io/', description: 'Jogos independentes.' }
    ],
    casino: [
        { name: 'Stake', url: 'https://stake.com/', description: 'Cassino crypto.' },
        { name: 'Roobet', url: 'https://roobet.com/', description: 'Cassino moderno.' }
    ],
    sports: [
        { name: 'Bet365', url: 'https://www.bet365.com/', description: 'Apostas esportivas.' },
        { name: 'Pinnacle', url: 'https://www.pinnacle.com/', description: 'Odds altas.' }
    ]
};

/* =========================
   ELEMENTOS
========================= */
const buttonsGrid = document.getElementById('buttonsGrid');
const sitesRow = document.getElementById('sitesRow');
const searchInput = document.querySelector('.search-input');

/* =========================
   UTILIDADES
========================= */
function clearSitesRow() {
    sitesRow.classList.add('hidden');
    sitesRow.innerHTML = '';
    sitesRow.removeAttribute('style');
}

function getVisibleButtons() {
    return [...document.querySelectorAll('.category-btn')]
        .filter(btn => btn.style.display !== 'none');
}

function getColumnsCount() {
    const width = window.innerWidth;

    if (width <= 600) {
        return 2; // celular
    }

    if (width <= 1024) {
        return 4; // tablet
    }

    return 5; // desktop
}


/* =========================
   FILTRO / ORDENAÇÃO
========================= */
let currentSort = 'az';
let currentLetter = '';

document.querySelectorAll('.sort-btn, .letter-btn').forEach(btn => {
    btn.addEventListener('click', () => {

        document.querySelectorAll('.sort-btn, .letter-btn')
            .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        if (btn.classList.contains('sort-btn')) {
            currentSort = btn.dataset.sort;
            currentLetter = '';
        } else {
            currentLetter = btn.dataset.letter.toLowerCase();
            currentSort = '';
        }

        clearSitesRow();
        applyFilter();
    });
});

function applyFilter() {
    const buttons = [...document.querySelectorAll('.category-btn')];

    let filtered = buttons;

    if (currentLetter) {
        filtered = filtered.filter(btn =>
            btn.textContent.toLowerCase().startsWith(currentLetter)
        );
    }

    if (currentSort) {
        filtered.sort((a, b) =>
            currentSort === 'az'
                ? a.textContent.localeCompare(b.textContent)
                : b.textContent.localeCompare(a.textContent)
        );
    }

    buttons.forEach(btn => btn.style.display = 'none');
    filtered.forEach(btn => {
        btn.style.display = 'flex';
        buttonsGrid.appendChild(btn);
    });
}

/* =========================
   CATEGORIAS → SITES
========================= */
document.addEventListener('click', e => {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    const category = btn.dataset.category;
    const sites = sitesData[category];
    if (!sites) return;

    const visibleButtons = getVisibleButtons();
    const index = visibleButtons.indexOf(btn);
    const columns = getColumnsCount();

    const rowEndIndex =
        Math.min(
            Math.floor(index / columns) * columns + (columns - 1),
            visibleButtons.length - 1
        );

    const insertAfter = visibleButtons[rowEndIndex];

    sitesRow.innerHTML = `
        <div class="sites-list">
            ${sites.map(site => `
                <button class="site-btn"
                    data-name="${site.name}"
                    data-description="${site.description}"
                    data-url="${site.url}">
                    ${site.name}
                </button>
            `).join('')}
        </div>
    `;

    insertAfter.after(sitesRow);
    sitesRow.classList.remove('hidden');
});

/* =========================
   MODAL
========================= */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');

document.addEventListener('click', e => {
    if (!e.target.classList.contains('site-btn')) return;

    modalTitle.textContent = e.target.dataset.name;
    modalDescription.textContent = e.target.dataset.description;
    modalLink.href = e.target.dataset.url;

    modalOverlay.classList.add('active');
});

document.querySelector('.modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});

function closeModal() {
    modalOverlay.classList.remove('active');
}

/* =========================
   BUSCA
========================= */
searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    clearSitesRow();

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.style.display =
            btn.textContent.toLowerCase().includes(query) ? 'flex' : 'none';
    });
});

/* =========================
   INIT
========================= */
applyFilter();

// ===== FAVICON DINÂMICO (mantive seu código) =====
function trocarFavicon(novoIcone) {
    const favicon = document.getElementById('favicon');
    if (favicon) {
        favicon.href = novoIcone + '?v=' + new Date().getTime();
    } else {
        const link = document.createElement('link');
        link.id = 'favicon';
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = novoIcone + '?v=' + new Date().getTime();
        document.head.appendChild(link);
    }
}

function checarHorario() {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();

    console.log(`Agora são ${horas}:${minutos < 10 ? '0' + minutos : minutos}`);

    if (horas === 17 && minutos === 48) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    } else if (horas === 6 && minutos === 48) {
        trocarFavicon('images/SOL/favicon-32x32.png');
    } else if (
        (horas > 17 || (horas === 17 && minutos > 48)) ||
        (horas < 6 || (horas === 6 && minutos < 32))
    ) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    } else {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
}

setInterval(checarHorario, 5000);
checarHorario();

// ===== INÍCIO - Terminal, histórico, menu de sites e preview =====
const input = document.getElementById('input');
const output = document.getElementById('output');
const terminal = document.getElementById('terminal');
const cursor = document.getElementById('cursor');
const mirror = document.getElementById('mirror');

let commandHistory = [];
let historyIndex = -1;

terminal.addEventListener('click', () => input.focus());

const updateCursorPosition = () => {
    const textBeforeCursor = input.value.substring(0, input.selectionStart);
    mirror.textContent = textBeforeCursor || '\u200b'; // evita width zero
    cursor.style.left = `${mirror.offsetWidth}px`;
};


input.addEventListener('input', updateCursorPosition);

// ===== CONFIGURAÇÕES DO PREVIEW (ajuste aqui se quiser) =====
const PREVIEW_WIDTH = 360;
const PREVIEW_HEIGHT = 420;

function ensurePreviewElement() {
    let preview = document.getElementById('sitePreview');
    if (!preview) {
        preview = document.createElement('div');
        preview.id = 'sitePreview';
        preview.classList.add('site-preview'); // classe CSS
        document.body.appendChild(preview);
    }
    return preview;
}

const categories = {
    sites_jogos: [
        { name: "SteamDB", url: "https://steamdb.info", img: "images/sites_jogos/steamdb/steamdb_preco.png", description: "Acompanhe preços de jogos da Steam e históricos de descontos. Nele tambem é possivel conectar sua própria conta Steam e ver mais dados interessantes sobre sua conta." },
        { name: "Exophase", url: "https://www.exophase.com", img: "images/SITES_JOGOS/exophase.png" },
        { name: "Can You Run It", url: "https://www.systemrequirementslab.com/cyri", img: "images/SITES_JOGOS/can_you_run_it.png" }
    ],
    design: [
        { name: "Dribbble", url: "https://dribbble.com", img: "images/DESIGN/dribbble.png" },
        { name: "Behance", url: "https://www.behance.net", img: "images/DESIGN/behance.png" }
    ],
    tecnologia: [
        { name: "TechCrunch", url: "https://techcrunch.com", img: "images/TECNOLOGIA/techcrunch.png" },
        { name: "The Verge", url: "https://www.theverge.com", img: "images/TECNOLOGIA/theverge.png" }
    ],
    animais: [
        { name: "National Geographic", url: "https://www.nationalgeographic.com/animals", img: "images/ANIMAIS/natgeo.png" },
        { name: "BBC Animals", url: "https://www.bbc.com/animals", img: "images/ANIMAIS/bbc_animals.png" }
    ]
};

let currentMenu = null;
let menuIndex = 0;
let selectedIndex = 0; // <<<<<< declare aqui
let menuActive = false; // Para desativar histórico enquanto o menu está ativo

function openCategory(categoryName) {
    const menu = categories[categoryName];
    if (!menu) return;

    currentMenu = menu;
    selectedIndex = 0;
    menuActive = true; // desativa histórico
    renderMenu(menu, selectedIndex);
}


function renderMenu(menu, index) {
    let html = "\nSelecione um site:\naperte [enter] para entrar no site e [esc] para fechar a categoria \n";
    menu.forEach((item, i) => {
        html += `\n  ${item.name} ${i === index ? "<" : ""}`;
    });
    output.innerHTML = html;
    terminal.scrollTop = terminal.scrollHeight;

    // preview responsivo
    const preview = ensurePreviewElement();
    const selected = menu[index];
    if (selected && selected.img) {
        preview.innerHTML = `
        <img src="${selected.img}" alt="${selected.name}" class="site-preview-img">
        <p class="site-description">${selected.description || ''}</p>
        `;
        preview.style.display = 'flex';
    } else {
        preview.innerHTML = '';
        preview.style.display = 'none';
    }
}

function hideMenuPreview() {
    const preview = document.getElementById('sitePreview');
    if (preview) {
        preview.style.display = 'none';
        preview.innerHTML = '';
    }
}

// ===== FUNÇÃO UNIFICADA DE PROCESSAR COMANDO =====
function processCommand(command) {
    output.innerHTML += `\nU:\\> ${command}`;

    switch (command.toLowerCase()) {
        case 'hello world':
            output.innerHTML += '\n:D';
            break;

        case 'cato':
            output.innerHTML += '\n▄───▄\n█▀█▀█\n█▄█▄█\n─███──▄▄\n─████▐█─█\n─████───█\n─▀▀▀▀▀▀▀';
            break;

        case 'clear':
            output.innerHTML = '';
            menuActive = false;
            hideMenuPreview();
            break;

        case 'help':
            output.innerHTML += '\nComandos disponíveis:\n- hello world\n- cato\n- sites_jogos\n- clear\n- help';
            break;

        case "sites_jogos":
            openCategory("sites_jogos");
            break;
        case "design":
            openCategory("design");
            break;
        case "tecnologia":
            openCategory("tecnologia");
            break;
        case "animais":
            openCategory("animais");
            break;

        case '':
            // nada
            break;

        default:
            if (!menuActive) {
                output.innerHTML += `\n'${command}' não é reconhecido como um comando interno ou externo.`;
            }
            break;
    }

    terminal.scrollTop = terminal.scrollHeight;
    updateCursorPosition();
}

// ===== ÚNICO HANDLER DE TECLADO (history + menu resolvidos aqui) =====
input.addEventListener('keydown', function (event) {
    if (!menuActive) {
        // histórico normal
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex] || '';
                    updateCursorPosition();
                }
                return;

            case 'ArrowDown':
                event.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = commandHistory.length;
                    input.value = '';
                }
                updateCursorPosition();
                return;

            case 'Enter':
                event.preventDefault();
                const command = input.value.trim();
                if (command) {
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    processCommand(command);
                    input.value = '';
                }
                updateCursorPosition();
                return;
        }
    } else {
        // menu ativo
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                selectedIndex = (selectedIndex > 0) ? selectedIndex - 1 : currentMenu.length - 1;
                renderMenu(currentMenu, selectedIndex);
                return;

            case 'ArrowDown':
                event.preventDefault();
                selectedIndex = (selectedIndex < currentMenu.length - 1) ? selectedIndex + 1 : 0;
                renderMenu(currentMenu, selectedIndex);
                return;

            case 'Enter':
                event.preventDefault();
                const selectedSite = currentMenu[selectedIndex];
                if (selectedSite && selectedSite.url) {
                    window.open(selectedSite.url, "_blank");
                }
                return;

            case 'Escape':
                event.preventDefault();
                menuActive = false;
                hideMenuPreview();
                output.innerHTML += `\nMenu fechado.`;
                terminal.scrollTop = terminal.scrollHeight;
                return;
        }
    }
});


// Inicializa posição do cursor
updateCursorPosition();

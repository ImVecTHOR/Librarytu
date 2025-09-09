//FAVICON DINÂMICO----------------------------------------------------------------------

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

    // Lógica de horário
    // Após 17:48 → LUA
    if (horas === 17 && minutos === 48) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    }
    // Após 6:32 → SOL
    else if (horas === 6 && minutos === 48) {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
    // Após 17:48 e antes de 6:32 = LUA
    else if (
        (horas > 17 || (horas === 17 && minutos > 48)) ||
        (horas < 6 || (horas === 6 && minutos < 32))
    ) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    }
    else {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
}

setInterval(checarHorario, 5000);
checarHorario();

//------------------------------------------------------------------------------------------------

const input = document.getElementById('input');
const output = document.getElementById('output');
const terminal = document.getElementById('terminal');
const cursor = document.getElementById('cursor');
const mirror = document.getElementById('mirror');

let commandHistory = [];
let historyIndex = -1;

terminal.addEventListener('click', () => input.focus());

const updateCursorPosition = () => {
    mirror.textContent = input.value;
    const mirrorWidth = mirror.offsetWidth;
    cursor.style.left = `${mirrorWidth + 2}px`;
};

input.addEventListener('input', updateCursorPosition);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
        processCommand(command);
        input.value = '';
        updateCursorPosition();
    }

    if (event.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex] || '';
            input.setSelectionRange(input.value.length, input.value.length);
            updateCursorPosition();
        }
    } else if (event.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex] || '';
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
        input.setSelectionRange(input.value.length, input.value.length);
        updateCursorPosition();
    }

});

function processCommand(command) {
    output.innerHTML += `\nU:\\> ${command}`;

    switch (command.toLowerCase()) {
        case 'hello world':
            output.innerHTML += '\n:D';
            break;
        case 'help':
            output.innerHTML += '\nComandos disponíveis:\n- hello world\n- clear\n- help';
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        case '':
            break;
        case 'cato':
            output.innerHTML += '\n▄───▄\n█▀█▀█\n█▄█▄█\n─███──▄▄\n─████▐█─█\n─████───█\n─▀▀▀▀▀▀▀';
            break;
        default:
            output.innerHTML += `\n'${command}' não é reconhecido como um comando interno ou externo.`;
            break;
    }

    terminal.scrollTop = terminal.scrollHeight;
}

updateCursorPosition();


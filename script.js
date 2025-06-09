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
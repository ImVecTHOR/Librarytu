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
    // Se for 17:27 → troca para especial
    if (horas === 17 && minutos === 28) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    }
    // Se for 6:32 → volta para padrão
    else if (horas === 6 && minutos === 48) {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
    // Se estiver entre 17:27 e antes de 6:32 → mantém especial
    else if (
        (horas > 17 || (horas === 17 && minutos > 48)) ||
        (horas < 6 || (horas === 6 && minutos < 32))
    ) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    }
    // Caso contrário → padrão
    else {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
}

// Checa a cada 5 segundos
setInterval(checarHorario, 5000);
checarHorario();

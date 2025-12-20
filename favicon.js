// ===== FAVICON DINÂMICO =====
function trocarFavicon(novoIcone) {
    const favicon = document.getElementById('favicon');
    const href = novoIcone + '?v=' + new Date().getTime();

    if (favicon) {
        favicon.href = href;
    } else {
        const link = document.createElement('link');
        link.id = 'favicon';
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = href;
        document.head.appendChild(link);
    }
}

function checarHorario() {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();

    console.log(`Agora são ${horas}:${minutos.toString().padStart(2, '0')}`);

    // Troca exata nos minutos programados
    if (horas === 17 && minutos === 48) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    } else if (horas === 6 && minutos === 48) {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
    // Regras gerais: dia e noite
    else if ((horas > 17 || (horas === 17 && minutos > 48)) || 
             (horas < 6 || (horas === 6 && minutos < 32))) {
        trocarFavicon('images/LUA/favicon-32x32.png');
    } else {
        trocarFavicon('images/SOL/favicon-32x32.png');
    }
}

// Verifica a cada 60 segundos
setInterval(checarHorario, 60000);
// Verificação inicial
checarHorario();
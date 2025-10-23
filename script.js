document.addEventListener('DOMContentLoaded', () => {

  // =======================
  // Inserção do HTML para a Tabela de Sites Principais
  // =======================
  const modalHtml = `
  <div id="main-sites-modal" class="main-sites-modal hidden">
    <div class="main-sites-content">
      <button id="close-main-sites" aria-label="Fechar tabela">✖</button>
      <h2>🌐 Sites Principais</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planilha</td>
            <td></td>
            <td><a href="https://docs.google.com/spreadsheets/d/1LP_puQk_0zGPby3ABx1Slz0y-eaDc9UdsFZ2oHAiC08/edit?hl=pt-br&gid=0#gid=0" target="_blank">Acessar</a></td>
          </tr>
          <tr>
            <td>Zona Morta</td>
            <td></td>
            <td><a href="https://dualshock-tools.github.io/" target="_blank">Acessar</a></td>
          </tr>
          <tr>
            <td>Curso</td>
            <td>limpeza e formatação</td>
            <td><a href="https://members.kiwify.com/login?club=1b687864-2c63-4d76-aeb6-c72a34b5ab03" target="_blank">Acessar</a></td>
          </tr>
          <tr>
            <td>Cupom1</td>
            <td></td>
            <td><a href="https://www.cupom.org/" target="_blank">Acessar</a></td>
          </tr>
          <tr>
            <td>Cupom2</td>
            <td></td>
            <td><a href="https://pt.coupert.com/" target="_blank">Acessar</a></td>
          </tr>
             <td>MobyGames</td>
            <td></td>
            <td><a href="https://www.mobygames.com/" target="_blank">Acessar</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`;

  // Insere o HTML no fim do body
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Agora seleciona elementos do modal
  const mainSitesModal = document.getElementById("main-sites-modal");
  const closeMainSites = document.getElementById("close-main-sites");

  // Atalho ALT + Z para abrir/fechar
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      mainSitesModal.classList.toggle("hidden");
    }
  });

  // Botão de fechar
  closeMainSites.addEventListener("click", () => {
    mainSitesModal.classList.add("hidden");
  });

  /* =======================
     Elementos DOM
  ======================= */
  const siteHeader = document.getElementById('site-header');
  const themeToggle = document.getElementById('theme-toggle');
  const buttonsRow = document.getElementById('buttons-row');
  const tablesArea = document.getElementById('tables-area');

  const detailCard = document.getElementById("detail-card");
  const closeDetail = document.getElementById("close-detail");
  const detailTitle = document.getElementById("detail-title");
  const detailDescription = document.getElementById("detail-description");
  const showImagesBtn = document.getElementById("show-images");

  const carouselModal = document.getElementById("carousel-modal");
  const carouselLarge = document.getElementById("carousel-large");
  const closeCarousel = document.getElementById("close-carousel");
  const prevImgBtn = document.getElementById("prev-img");
  const nextImgBtn = document.getElementById("next-img");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  /* =======================
     Dados das tabelas
  ======================= */
  const tabelaDados = {
    "Jogos": {
      emoji: "🎮",
      headers: ["Site", "Sobre", "Link"],
      rows: [
        {
          produto: "SteamDB",
          sobre: {
            descricao: "O SteamDB é um site não oficial, bastante conhecido, usado principalmente para verificar o histórico de promoções dos jogos na Steam. Nele, você pode obter informações como: número de jogadores simultâneos, histórico de preços e até mesmo visualizar seus próprios dados (quanto gastou, por exemplo).",
            imagens: [
              "images/site/jogos/steamdb/menu.jpg",
              "images/site/jogos/steamdb/historico_preco.jpg",
              "images/site/jogos/steamdb/grafico_jogadores.jpg",
              "images/site/jogos/steamdb/dados_perfil.jpg"
            ]
          },
          link: "https://steamdb.info/"
        },
        {
          produto: "Can You Run It",
          sobre: {
            descricao: "Com esse site você consegue ver se seu computador roda tal jogo ou não, para facilitar sua vida (recomendavel baixar o programinha deles para ver seus componentes e realizar a comparação). Eu não diria que é com a maior precisão mas, pode te dar uma noção melhor",
            imagens: [
              "images/site/jogos/canyourunit/cyri_menu.png",
              "images/site/jogos/canyourunit/cyri_teste.png",
              "images/site/jogos/canyourunit/cyri_teste2.png"
            ]
          },
          link: "https://www.systemrequirementslab.com/cyri"
        }
      ]
    },
    "Aleatórios": {
      emoji: "👻",
      headers: ["Título", "Sobre", "Link"],
      rows: [
        {
          produto: "Conga",
          sobre: {
            descricao: "Perde a graça se dizer oque é",
            imagens: ["images/site/aleatorio/conga/trust_me.png"]
          },
          link: "https://matias.me/nsfw/"
        }
      ]
    }
  };

  /* =======================
     Variáveis do Carrossel
  ======================= */
  let currentImages = [];
  let currentIndex = 0;

  /* =======================
     Funções Auxiliares
  ======================= */
  function abrirDetalhes(titulo, descricao, imagens) {
    detailTitle.textContent = titulo;
    detailDescription.textContent = descricao;

    currentImages = imagens;
    currentIndex = 0;

    detailCard.classList.remove("hidden");
  }

  function fecharDetalhes() {
    detailCard.classList.add("hidden");
  }

  function abrirCarrossel() {
    if (!currentImages.length) return;
    renderCarousel();
    carouselModal.classList.remove("hidden");
  }

  function fecharCarrossel() {
    carouselModal.classList.add("hidden");
  }

  function renderCarousel() {
    // Renderiza imagem
    carouselLarge.innerHTML = "";
    const img = document.createElement("img");
    img.src = currentImages[currentIndex];
    carouselLarge.appendChild(img);

    // Renderiza indicadores
    indicatorsContainer.innerHTML = "";
    currentImages.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        renderCarousel();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  /* =======================
     Criação de Botões e Tabelas
  ======================= */
  Object.keys(tabelaDados).forEach((key, index) => {

    // --- Botão da categoria ---
    const btn = document.createElement("button");
    btn.classList.add("tab-btn");
    btn.dataset.target = `table-${index}`;
    btn.textContent = `${tabelaDados[key].emoji} ${key}`;
    buttonsRow.appendChild(btn);

    // --- Tabela ---
    const tableBox = document.createElement("div");
    tableBox.id = `table-${index}`;
    tableBox.classList.add("table-box", "hidden");

    const h3 = document.createElement("h3");
    h3.textContent = `${tabelaDados[key].emoji} ${key}`;
    tableBox.appendChild(h3);

    const table = document.createElement("table");

    // Cabeçalho
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    tabelaDados[key].headers.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Corpo
    const tbody = document.createElement("tbody");
    tabelaDados[key].rows.forEach(item => {
      const tr = document.createElement("tr");

      // Produto
      const tdProduto = document.createElement("td");
      tdProduto.textContent = item.produto;
      tr.appendChild(tdProduto);

      // Sobre -> link "ver"
      const tdSobre = document.createElement("td");
      const linkSobre = document.createElement("a");
      linkSobre.href = "#";
      linkSobre.textContent = "ver";
      linkSobre.addEventListener("click", e => {
        e.preventDefault();
        abrirDetalhes(item.produto, item.sobre.descricao, item.sobre.imagens);
      });
      tdSobre.appendChild(linkSobre);
      tr.appendChild(tdSobre);

      // Nota -> link externo
      const tdNota = document.createElement("td");
      const linkNota = document.createElement("a");
      linkNota.href = item.link;
      linkNota.target = "_blank";
      linkNota.textContent = "Acessar";
      tdNota.appendChild(linkNota);
      tr.appendChild(tdNota);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    tableBox.appendChild(table);
    tablesArea.appendChild(tableBox);
  });

  /* =======================
     Alternar Tabelas
  ======================= */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".table-box").forEach(tb => tb.classList.add("hidden"));
      const target = document.getElementById(btn.dataset.target);
      if (target) target.classList.remove("hidden");
    });
  });

  /* =======================
     Eventos de Modal e Carrossel
  ======================= */
  showImagesBtn.addEventListener("click", abrirCarrossel);
  closeDetail.addEventListener("click", fecharDetalhes);
  closeCarousel.addEventListener("click", fecharCarrossel);

  prevImgBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    renderCarousel();
  });

  nextImgBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    renderCarousel();
  });

  /* =======================
     Tema Claro/Escuro
  ======================= */
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  /* =======================
     Blur Header ao rolar
  ======================= */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) siteHeader.classList.add("scrolled");
    else siteHeader.classList.remove("scrolled");
  });
});

/* =======================
   Atalho ALT + Z - Tabela de Sites Principais
======================= */
const mainSitesModal = document.getElementById("main-sites-modal");
const closeMainSites = document.getElementById("close-main-sites");

document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key.toLowerCase() === "z") {
    e.preventDefault();
    mainSitesModal.classList.toggle("hidden");
  }
});

closeMainSites.addEventListener("click", () => {
  mainSitesModal.classList.add("hidden");
});

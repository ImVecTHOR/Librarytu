document.addEventListener('DOMContentLoaded', () => {
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
      headers: ["Site", "Sobre", "Link do Site"],
      rows: [
        {
          produto: "SteamDB",
          sobre: {
            descricao: "Um notebook potente para trabalho e games.",
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
            descricao: "Um smartphone moderno com câmera incrível.",
            imagens: [
              "https://via.placeholder.com/250x150/FF0000",
              "https://via.placeholder.com/250x150/00FF00"
            ]
          },
          link: "https://www.systemrequirementslab.com/cyri"
        }
      ]
    },
    "Games": {
      emoji: "🎮",
      headers: ["Título", "Sobre", "Nota"],
      rows: [
        {
          produto: "Jogo A",
          sobre: {
            descricao: "Um jogo de ação eletrizante.",
            imagens: ["https://via.placeholder.com/250x150/222222"]
          },
          link: "https://store.steampowered.com"
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

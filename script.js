document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('site-header');
  const themeToggle = document.getElementById('theme-toggle');
  const buttonsRow = document.getElementById('buttons-row');
  const tablesArea = document.getElementById('tables-area');

  const detailCard = document.getElementById("detail-card");
  const closeDetail = document.getElementById("close-detail");
  const detailTitle = document.getElementById("detail-title");
  const detailDescription = document.getElementById("detail-description");
  const carousel = document.getElementById("carousel");

  // --- Dados dinâmicos ---
  const tabelaDados = {
    "Tecnologia": {
      emoji: "💻",
      headers: ["Produto", "Sobre", "Nota"],
      rows: [
        {
          produto: "Notebook X",
          sobre: {
            descricao: "Um notebook potente para trabalho e games.",
            imagens: ["https://via.placeholder.com/250x150", "https://via.placeholder.com/250x150/0000FF"],
          },
          link: "https://www.dell.com"
        },
        {
          produto: "Smartphone Y",
          sobre: {
            descricao: "Um smartphone moderno com câmera incrível.",
            imagens: ["https://via.placeholder.com/250x150/FF0000", "https://via.placeholder.com/250x150/00FF00"],
          },
          link: "https://www.samsung.com"
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
            imagens: ["https://via.placeholder.com/250x150/222222"],
          },
          link: "https://store.steampowered.com"
        }
      ]
    }
  };

  // --- Criar botões e tabelas ---
  Object.keys(tabelaDados).forEach((key, index) => {
    // Botão
    const btn = document.createElement("button");
    btn.classList.add("tab-btn");
    btn.dataset.target = `table-${index}`;
    btn.textContent = `${tabelaDados[key].emoji} ${key}`;
    buttonsRow.appendChild(btn);

    // Tabela
    const tableBox = document.createElement("div");
    tableBox.id = `table-${index}`;
    tableBox.classList.add("table-box", "hidden");

    const h3 = document.createElement("h3");
    h3.textContent = `${tabelaDados[key].emoji} ${key}`;
    tableBox.appendChild(h3);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    tabelaDados[key].headers.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tabelaDados[key].rows.forEach((item, i) => {
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
      linkSobre.addEventListener("click", (e) => {
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

  // --- Alternar tabelas ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".table-box").forEach(tb => tb.classList.add("hidden"));
      const target = document.getElementById(btn.dataset.target);
      if (target) target.classList.remove("hidden");
    });
  });

  // --- Abrir detalhes ---
  function abrirDetalhes(titulo, descricao, imagens) {
    detailTitle.textContent = titulo;
    detailDescription.textContent = descricao;
    carousel.innerHTML = "";

    imagens.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      carousel.appendChild(img);
    });

    detailCard.classList.remove("hidden");
  }

  // --- Fechar detalhes ---
  closeDetail.addEventListener("click", () => {
    detailCard.classList.add("hidden");
  });

  // --- Tema ---
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // --- Blur Header ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  });
});

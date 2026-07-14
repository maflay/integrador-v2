const cells = Array.from(document.querySelectorAll(".cell-c"));
const hud = document.getElementById("total_result");
const btnReset = document.getElementById("reset-game");

// === PAREJAS EXACTAS QUE PASASTE ===
const PAIRS = [
  {
    key: "corazon-diamante",
    arts: ["ficha_corazon.png", "ficha_diamante.png"],
  },
  { key: "pica-trebol", arts: ["ficha_pica.png", "ficha_trebol.png"] },
  { key: "jinete-caballo", arts: ["ficha_jinete.png", "ficha_caballo.png"] },
  { key: "rey-reina", arts: ["ficha_rey.png", "ficha_reina.png"] },
  { key: "ruleta-pelita", arts: ["ficha_ruleta.png", "ficha_pelita.png"] },
  { key: "mymawi-slots", arts: ["ficha_mymawi.png", "ficha_slots.png"] },
];

// AJUSTA ESTA RUTA si tus imágenes no están en /resources/
// 1) Pasa a ruta relativa (mejor para local/subcarpetas)
const ASSET_BASE = "/eventos/generator_points/resource/";

// 2) Pinta la cara trasera con <img> (más robusto)
function setBackImage(cell, file) {
  const back = cell.querySelector(".back-c");
  if (!back) {
    console.warn("No existe .back dentro de", cell);
    return null;
  }

  const img_temp = document.querySelectorAll(".card-c");
  img_temp.forEach((img) => {
    setTimeout(() => {
      img.classList.add("is-flipped");
    }, 800);

    setTimeout(() => {
      img.classList.remove("is-flipped");
    }, 1800);
  });
  const src = ASSET_BASE + file;
  back.innerHTML = `<img src="${src}" alt="${file}">`; // <-- en lugar de background-image
  return src;
}

const totalPairs = cells.length / 2; // 12 celdas => 6 parejas

// ---- Estado del juego (una sola vez) ----
let lockBoard = false;
let firstCell = null;
let secondCell = null;
let moves = 0;
let matches = 0;

// ---- Utils ----
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ensureMarkup() {
  document.querySelectorAll(".cell-c").forEach((cell) => {
    if (!cell.querySelector(".card-c")) {
      cell.innerHTML = `
          <div class="card-c">
            <div class="face-c front-c"></div>
            <div class="face-c back-c"></div>
          </div>`;
    }
  });
}

function buildDeck() {
  // 6 parejas → 12 cartas (misma key, archivos distintos) y barajar
  const deck = PAIRS.flatMap((p) =>
    p.arts.map((file) => ({ key: p.key, file })),
  );
  return shuffle(deck);
}

function updateHud() {
  if (hud)
    hud.textContent = `Movimientos: ${moves} • Parejas: ${matches}/${totalPairs}`;
}

function resetTurn() {
  [firstCell, secondCell] = [null, null];
  lockBoard = false;
}

function onCellClick(e) {
  const cell = e.currentTarget;
  const card = cell.querySelector(".card-c");

  if (
    lockBoard ||
    cell.classList.contains("is-matched") ||
    card.classList.contains("is-flipped")
  )
    return;

  card.classList.add("is-flipped");

  if (!firstCell) {
    firstCell = cell;
    return;
  }

  secondCell = cell;
  lockBoard = true;
  moves++;
  updateHud();

  if (firstCell.dataset.key === secondCell.dataset.key) {
    firstCell.classList.add("is-matched");
    secondCell.classList.add("is-matched");
    matches++;
    resetTurn();
    updateHud();
    if (matches === totalPairs) {
      setTimeout(() => alert("¡Perfect match! 🎉"), 200);
    }
  } else {
    setTimeout(() => {
      firstCell.querySelector(".card-c").classList.remove("is-flipped");
      secondCell.querySelector(".card-c").classList.remove("is-flipped");
      resetTurn();
    }, 700);
  }
}

function deal() {
  ensureMarkup();
  const deck = buildDeck();

  document.querySelectorAll(".cell-c").forEach((cell, i) => {
    const { key, file } = deck[i];
    cell.dataset.key = key;

    const assigned = setBackImage(cell, file);
    // console.log('img asignada:', key, assigned);

    cell.classList.remove("is-matched");
    cell.querySelector(".card-c").classList.remove("is-flipped");
  });

  moves = 0;
  matches = 0;
  lockBoard = false;
  firstCell = null;
  secondCell = null;
  updateHud();
}

// ---- Listeners (una sola vez) ----
cells.forEach((cell) => {
  const card = cell.querySelector(".card-c"); // puede ser null si no pusiste markup
  // si aún no hay markup, lo añadió ensureMarkup() más tarde, pero el listener es en la celda (sirve igual)
  cell.addEventListener("click", onCellClick);
  // teclado accesible
  (card ?? cell).setAttribute("tabindex", "0");
  (card ?? cell).addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cell.click();
    }
  });
});

btnReset?.addEventListener("click", deal);

document.getElementById("allreset").addEventListener("click", () => {
  const casino = document.getElementById("casino");
  const categoria = document.getElementById("categoria");
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const bono = document.getElementById("bono");

  casino.value = "";
  categoria.value = "";
  nombre.value = "";
  cedula.value = "";
  bono.value = "";

  deal();
});

// ---- Go! ----
// preload (opcional, para evitar parpadeo)
PAIRS.flatMap((p) => p.arts).forEach((file) => {
  const im = new Image();
  im.src = ASSET_BASE + file;
});
deal();

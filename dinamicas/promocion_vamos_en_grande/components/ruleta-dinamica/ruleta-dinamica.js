window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const url =
  "https://script.google.com/macros/s/AKfycbyW9YT1N3DPIjJBLKhml0XxsQfngMs4VxiAQ_EeN7aJvv3u21MUKJHqwceV3ZQgRhk9nA/exec";

const num_rule = [
  "0",
  "28",
  "9",
  "26",
  "30",
  "11",
  "7",
  "20",
  "32",
  "17",
  "5",
  "22",
  "34",
  "15",
  "3",
  "24",
  "36",
  "13",
  "1",
  "00",
  "27",
  "10",
  "25",
  "29",
  "12",
  "8",
  "19",
  "31",
  "18",
  "6",
  "21",
  "33",
  "16",
  "4",
  "23",
  "35",
  "14",
  "2",
];

const board = document.querySelector(".board_reuleta");

let participantes38 = []; // exactamente 38
let ultimoResultado = null;

init();

function init() {
  getData().then(() => {
    renderRuletas(num_rule, participantes38);
  });
}

async function getData() {
  const res = await fetch(`${url}?hoja=finalista`, { cache: "no-store" });
  const data = await res.json();

  const all = Array.isArray(data) ? data : [];
  const uniq = [
    ...new Set(all.map((r) => String(r.Nombre || "").trim()).filter(Boolean)),
  ];

  const base = uniq.length
    ? uniq
    : Array.from({ length: 38 }, (_, i) => `Participante ${i + 1}`);

  participantes38 = ajustarA38(base);
}

function ajustarA38(arr) {
  const out = [];
  for (let i = 0; i < 38; i++) out.push(arr[i % arr.length]);
  return out.slice(0, 38);
}
const resultado = document.getElementById("resultado");

function renderRuletas(nums, nombres) {
  board.innerHTML = `
    <div class="ruletas-wrap">
      <div class="puntero"></div>
      <div id="ruletaNums" class="ruleta ruleta-numeros"></div>
      <div id="ruletaNames" class="ruleta ruleta-nombres"></div>
    </div>

    <div class="panel-accion">
      <button id="btnGirar" class="btn-spin-ruleta">Girar</button>
    </div>

    <div id="resultado" class="resultado-map"></div>
  `;

  const mapa38 = nums.map((n, i) => ({
    numero: n,
    nombre: nombres[i],
  }));

  console.log(mapa38);

  const ruletaNums = document.getElementById("ruletaNums");
  const ruletaNames = document.getElementById("ruletaNames");
  const btn = document.getElementById("btnGirar");

  construirSegmentosNumeros(ruletaNums, nums);
  construirSegmentosNombres(ruletaNames, nombres);

  let girando = false;
  let rotacionTotalNums = 0;
  let rotacionTotalNames = 0;

  btn.addEventListener("click", () => {
    if (girando) return;
    girando = true;
    resultado.textContent = "";

    const vueltas = randInt(6, 10);
    const extraDeg = randInt(0, 359);
    const dur = 4200;

    // ✅ acumulamos la rotación REAL (esto arregla el efecto y el cálculo)
    const delta = vueltas * 360 + extraDeg;
    rotacionTotalNums += delta; // números giran normal
    rotacionTotalNames -= delta; // nombres giran contrario

    // ✅ animación hacia la rotación total acumulada
    animarRotacion(ruletaNums, rotacionTotalNums, dur);
    animarRotacion(ruletaNames, rotacionTotalNames, dur);

    setTimeout(() => {
      // ✅ ganador REAL usando la rotación total (no extraDeg)
      const rotacionActual = ((rotacionTotalNums % 360) + 360) % 360;
      console.log(rotacionActual);
      const idx = indiceDesdeRotacion(rotacionActual, nums.length);

      console.log(idx,"idx");
      const numeroGanador = nums[idx];
      const nombreGanador = nombres[idx];

      // ✅ guardar resultado (ahora sí queda bien)
      ultimoResultado = {
        numero: numeroGanador,
        nombre: nombreGanador,
        fecha: new Date().toISOString(),
        idx,
      };

      // ✅ mapa ordenado como quedó la ruleta (posición 1 = arriba)
      const inicio = idx;
      const mapaOrdenado = [];
      for (let i = 0; i < nums.length; i++) {
        const j = (inicio + i) % nums.length;
        mapaOrdenado.push({
          posicion: i + 1,
          numero: nums[j],
          nombre: nombres[j],
        });
      }

      console.log(
        mapaOrdenado
          .map(
            (p) =>
              `${
                p.posicion == "37"
                  ? "0"
                  : p.posicion == "38"
                  ? "00"
                  : p.posicion
              }: ${p.numero} - ${p.nombre}`
          )
          .join(",")
      );
      // mostrar listado real post-giro
      resultado.innerHTML = `
      <div class="lista_parti">
        <b>Ganador:</b> ${numeroGanador} - ${nombreGanador}<br><br>
        ${mapaOrdenado
          .map(
            (p) =>
              `${
                p.posicion == "37"
                  ? "0"
                  : p.posicion == "38"
                  ? "00"
                  : p.posicion
              }: ${p.nombre} - ${p.numero}`
          )
          .join("<br>")}
      </div>
      `;

      console.log("Resultado guardado:", ultimoResultado);
      girando = false;
    }, dur + 80);
  });
}

function indiceDesdeRotacion(rotacion, total) {
  const angle = 360 / total;
  const normalized = (360 - rotacion + 360) % 360;
  return Math.floor(normalized / angle) % total;
}

function construirSegmentosNumeros(container, nums) {
  const N = nums.length;
  const angle = 360 / N;

  container.innerHTML = "";

  nums.forEach((val, i) => {
    const seg = document.createElement("div");
    seg.className = "segmento";
    seg.style.transform = `rotate(${i * angle}deg)`;

    const chip = document.createElement("div");
    chip.className = "chip " + colorRuletaAmericana(val, i);
    chip.textContent = val;

    seg.appendChild(chip);
    container.appendChild(seg);
  });
}

function construirSegmentosNombres(container, nombres) {
  const N = nombres.length;
  const angle = 360 / N;

  container.innerHTML = "";

  nombres.forEach((name, i) => {
    const seg = document.createElement("div");
    seg.className = "segmento";
    seg.style.transform = `rotate(${i * angle}deg)`;

    const span = document.createElement("span");
    span.textContent = name.length > 16 ? name.slice(0, 16) + "…" : name;

    span.style.transform = "translateX(45px)";

    seg.appendChild(span);
    container.appendChild(seg);
  });
}

function animarRotacion(el, deg, duration) {
  el.style.transition = "none";
  el.getBoundingClientRect(); // reflow
  el.style.transition = `transform ${duration}ms cubic-bezier(.12,.72,.2,1)`;
  el.style.transform = `rotate(${deg}deg)`;
}

function indiceGanador(extraDeg, total) {
  const angle = 360 / total;

  const normalized = (360 - (extraDeg % 360) + 360) % 360;
  const idx = Math.floor(normalized / angle) % total;
  return idx;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colorRuletaAmericana(val, idx) {
  if (val === "0" || val === "00") return "verde";
  return idx % 2 === 0 ? "rojo" : "negro";
}

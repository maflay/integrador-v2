window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const url =
  "https://script.google.com/macros/s/AKfycbyZV3Y8YB91ZQGdSY2O1yECcmSLKfbsggU7sTr-B70TCqN2mriwRPWZ4VYGABcTOpxO/exec";

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

const OFFSET_STEPS = 0;

const board = document.querySelector(".board_reuleta");

let participantes38 = [];
let ultimoResultado = null;

init();

function init() {
  board.innerHTML = `<div class="loader-overlay" id="loader">
                      <div class="spinner"></div>
                    </div>`;
  getData().then(() => {
    renderRuletas(num_rule, participantes38);
  });
}

async function getData() {
  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");

  const res = await fetch(
    `${url}?hoja=finalista&mesbus=${fecha_reg}&anobus=${anio_res}`,
    { cache: "no-store" },
  );
  const data = await res.json();

  if (data.length < 38) {
    Swal.fire({
      icon: "warning",
      title: "No se puede Generar la Ruleta",
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed) {
        // window.location.href = "/dinamicas/promocion_vamos_en_grande/vamosengrande.html";
        window.close();
      }
    });

    return;
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const all = Array.isArray(data) ? data : [];
  console.log(all);
  const normalized = all
    .map((r) => ({
      Nombre: String(r.Nombre || "").trim(),
      Cedula: String(r.Cedula ?? "").trim(),
      Casino: String(r.Casino ?? "").trim(),
      Usuario: String(r.Usuario ?? "").trim(),
      raw: r,
    }))
    .filter((r) => r.Nombre);

  const byKey = new Map();
  for (const r of normalized) {
    const key = `${r.Nombre}__${r.Cedula || "noid"}`;
    if (!byKey.has(key)) byKey.set(key, r);
  }

  const uniqRecords = [...byKey.values()];

  const baseRecords = uniqRecords.length
    ? uniqRecords
    : Array.from({ length: 38 }, (_, i) => ({
        Nombre: `Participante ${i + 1}`,
        Cedula: "",
        Casino: "",
        Usuario: "",
      }));

  const randomizada = shuffle(baseRecords);
  participantes38 = ajustarA38Records(randomizada);

  function ajustarA38Records(arr) {
    const out = [];
    for (let i = 0; i < 38; i++) out.push(arr[i % arr.length]);
    return out.slice(0, 38);
  }
}

function construirListadoNumeroRegistro(nums, registros, shift) {
  const N = nums.length;
  const out = [];

  for (let i = 0; i < N; i++) {
    const numIndex = (i + shift) % N;
    const r = registros[i] || {};

    out.push({
      posicion: i + 1,
      numero: nums[numIndex],

      // datos completos del participante:
      Nombre: r.Nombre || "",
      Cedula: r.Cedula || "",
      Casino: r.Casino || "",
      Usuario: r.Usuario || "",

      raw: r.raw,
    });
  }

  return out;
}

function ajustarA38(arr) {
  const out = [];
  for (let i = 0; i < 38; i++) out.push(arr[i % arr.length]);
  return out.slice(0, 38);
}
const resultado = document.getElementById("resultado");

function renderRuletas(nums, nombres) {
  const nombs = participantes38.map((r) => r.Nombre);
  const content_btn = document.getElementById("content_btn");
  board.innerHTML = `
    <div class="ruletas-wrap">
      <div class="puntero"></div>
      <div id="ruletaNums" class="ruleta ruleta-numeros"></div>
      <div id="ruletaNames" class="ruleta ruleta-nombres"></div>
    </div>
    <div id="resultado" class="resultado-map"></div>
  `;

  content_btn.innerHTML = ` <div class="panel-accion">
      <button id="btnGirar" class="btn-spin-ruleta">Girar</button>
    </div>`;

  // const mapa38 = nums.map((n, i) => ({
  //   numero: n,
  //   nombre: nombres[i],
  // }));

  const ruletaNums = document.getElementById("ruletaNums");
  const ruletaNames = document.getElementById("ruletaNames");
  const btn = document.getElementById("btnGirar");

  construirSegmentosNumeros(ruletaNums, nums);
  construirSegmentosNombres(ruletaNames, nombs);

  let girando = false;
  let rotacionTotalNums = 0;
  let rotacionTotalNames = 0;

  btn.addEventListener("click", () => {
    if (girando) return;
    girando = true;
    resultado.textContent = "";

    const N = nums.length;
    const step = 360 / N;

    const vueltas = randInt(16, 18);

    const kFinal = randInt(0, N - 1);

    const extraDeg = (kFinal * step) % 360;

    const dur = 4200;
    const delta = vueltas * 360 + extraDeg;

    rotacionTotalNums += delta;
    animarRotacion(ruletaNums, rotacionTotalNums, dur);

    setTimeout(() => {
      const baseShift = calcularShiftPorRotacion(rotacionTotalNums, N);
      const shift = (baseShift + OFFSET_STEPS) % N;

      const listado = construirListadoNumeroRegistro(
        nums,
        participantes38,
        shift,
      );

      const fechaCompleta = new Date().toLocaleString("es-CO", {
        timeZone: "America/Bogota",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const [fecha, hora] = fechaCompleta.split(", ");

      const fechaCompleta_validate_register = new Date().toLocaleString(
        "es-CO",
        {
          timeZone: "America/Bogota",
          year: "numeric",
          month: "long",
        },
      );

      const [fecha_reg, anio_res] =
        fechaCompleta_validate_register.split(" de ");

      const listadoOrdenado = [...listado].sort((a, b) => {
        const na = a.numero === "00" ? -1 : Number(a.numero);
        const nb = b.numero === "00" ? -1 : Number(b.numero);
        return na - nb;
      });

      resultado.innerHTML = `<div class="lista_parti">
                              <b>Listado (Número → Participante):</b><br><br>
                              ${listadoOrdenado.map((p) => `${p.numero} - ${p.Nombre}`).join("<br>")}
                              </div>`;

      resultado.innerHTML = `<div class="lista_parti">
                                <b>Cargando...</b>
                              </div>`;

      fetch(`${url}?hoja=finalistab`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipo: "finalistab",
          Nombre: "Prueba de Ruleta",
          Fecha: fecha + " - " + hora,
          Info: listadoOrdenado
            .map(
              (p) =>
                `${p.numero} - ${p.Nombre} - ${p.Casino} - ${p.Cedula} - ${p.raw.Fecha},`,
            )
            .join("<br>"),
          Par: listadoOrdenado
            .map((p) => `${p.numero} - ${p.Nombre},`)
            .join("<br>"),
          Mes_registro: fecha_reg,
          Ano_registro: anio_res,
        }),
      })
        .then((res) => res.text())
        .then(() => {
          const mitad = Math.ceil(listadoOrdenado.length / 2);

          const bloque1 = listadoOrdenado.slice(0, mitad);
          const bloque2 = listadoOrdenado.slice(mitad);

          resultado.innerHTML = `<div class="lista_parti doble">
                                  <div class="bloque_participantes">
                                    <b>Listado 1</b><br><br>
                                    ${bloque1.map((p) => `${p.numero} - ${p.Nombre}`).join("<br>")}
                                  </div>
                                  <div class="bloque_participantes">
                                    <b>Listado 2</b><br><br>
                                    ${bloque2.map((p) => `${p.numero} - ${p.Nombre}`).join("<br>")}
                                  </div>
                                </div>`;
        })
        .catch((erro) => {
          resultado.innerHTML = `<div class="lista_parti">
                                  <b>Error al asignar numeros...</b>
                                </div>`;
        });

      // for (let i = 0; i <= listado.length - 1; i++) {
      //   // console.log(listadoOrdenado[i], "listadoOrdenado");
      //   console.log(
      //     listadoOrdenado[i].Nombre,
      //     listadoOrdenado[i].posicion,
      //     listadoOrdenado[i].numero,
      //   );
      // }

      // console.log(listado);

      // console.log(listadoOrdenado[0].Nombre, "primer numero listadoOrdenado");
      // console.log(listadoOrdenado[0].numero, "primer numero listadoOrdenado");
      // console.log(listadoOrdenado[0].posicion, "primer numero listadoOrdenado");

      //   resultado.innerHTML = `
      //   <div class="lista_parti">
      //     <b>Listado (Nombre → Número):</b><br><br>
      //     ${listado.map((p) => `${p.posicion}: ${p.nombre} - ${p.numero}`).join("<br>")}
      //   </div>
      // `;

      girando = false;
    }, dur + 120);
  });
}

function indiceDesdeRotacion(rotacion, total) {
  const angle = 360 / total;
  const normalized = (360 - rotacion + 360) % 360;
  return Math.floor(normalized / angle) % total;
}

function calcularOffsetInicial(nums, nombreIndex0NumeroVisual) {
  return nums.indexOf(String(nombreIndex0NumeroVisual));
}

function construirSegmentosNumeros(container, nums) {
  const N = nums.length;
  const angle = 360 / N;
  container.innerHTML = "";

  nums.forEach((val, i) => {
    const seg = document.createElement("div");
    seg.className = "segmento";
    seg.dataset.index = i;
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
    seg.dataset.index = i;
    seg.style.transform = `rotate(${i * angle}deg)`;

    const span = document.createElement("span");
    span.textContent = name.length > 8 ? name.slice(0, 14) + "…" : name;
    span.style.transform = "translateX(45px)";

    seg.appendChild(span);
    container.appendChild(seg);
  });
}

function animarRotacion(el, deg, duration) {
  el.style.transition = "none";
  el.getBoundingClientRect();
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

function norm360(deg) {
  return ((deg % 360) + 360) % 360;
}

function shiftPasos(rotNumsDeg, offsetNamesDeg, total) {
  const angle = 360 / total;
  const diff = norm360(rotNumsDeg - offsetNamesDeg);
  return Math.round(diff / angle) % total;
}

function mapaNombreNumero(nums, nombres, rotNumsDeg, offsetNamesDeg = 0) {
  const N = nums.length;
  const shift = shiftPasos(rotNumsDeg, offsetNamesDeg, N);
  const out = [];
  for (let i = 0; i < N; i++) {
    const j = (i + shift) % N;
    // const j = (i - shift + N) % N;
    out.push({ posicion: i + 1, nombre: nombres[i], numero: nums[j] });
  }
  return out;
}

function angleOfElementFromCenter(el, centerX, centerY) {
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const ang = Math.atan2(y - centerY, x - centerX);
  return ang;
}

function norm2PI(a) {
  const two = Math.PI * 2;
  return ((a % two) + two) % two;
}

function calcularShiftDOM(ruletaNums, ruletaNames, total) {
  const angleStep = (Math.PI * 2) / total;
  const r = ruletaNums.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const segNum0 = ruletaNums.querySelector('.segmento[data-index="0"]');
  const segNam0 = ruletaNames.querySelector('.segmento[data-index="0"]');

  if (!segNum0 || !segNam0) return 0;

  const aNum = angleOfElementFromCenter(segNum0, cx, cy);
  const aNam = angleOfElementFromCenter(segNam0, cx, cy);
  const diff = norm2PI(aNum - aNam);
  return Math.round(diff / angleStep) % total;
}

function calcularShiftPorRotacion(rotacionTotalNums, total) {
  const step = 360 / total;
  const rot = ((rotacionTotalNums % 360) + 360) % 360;
  const rotCentro = (rot + step / 2) % 360;
  const k = Math.floor(rotCentro / step) % total;
  return (total - k) % total;
}

function construirListadoNombreNumero(nums, nombres, shift) {
  const N = nums.length;
  const out = [];

  for (let i = 0; i < N; i++) {
    const numIndex = (i + shift) % N;
    out.push({
      posicion: i + 1,
      nombre: nombres[i],
      numero: nums[numIndex],
    });
  }

  return out;
}

function colorRuletaAmericana(val, idx) {
  if (val === "0" || val === "00") return "verde";
  return idx % 2 === 0 ? "rojo" : "negro";
}

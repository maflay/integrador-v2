window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const loader = document.getElementById("loader");
const url =
  "https://script.google.com/macros/s/AKfycbwaYj7Q1kNc6cetU6eM758-zq9UWuMmCfr4j4vJrBfBeBH5i8hwpz0UW8Lf-NZXvnkI/exec";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosMisterioso";
const FECHA_KEY = "fechaMisterioso";
const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}
const promocion = "Halloween Misterioso";
const audioFicha = new Audio(
  "/dinamicas/promocion-halloween-misterioso/resources/Sonido_ficha.mp3",
);

let step1 = "";
let step2 = "";
let step3 = "";

const cells = Array.from(document.querySelectorAll(".cell-c"));
const chose_ficha_1 = document.querySelector(".chose_ficha_1");

const hud = document.getElementById("total_result");
const PAIRS = [
  { key: "esqueleto_uno", arts: ["esqueleto.png"] },
  { key: "esqueleto_dos", arts: ["esqueleto.png"] },
  { key: "esqueleto_tres", arts: ["esqueleto.png"] },
  { key: "esqueleto_cuatro", arts: ["esqueleto.png"] },
  { key: "esqueleto_cinco", arts: ["esqueleto.png"] },
  { key: "esqueleto_seis", arts: ["esqueleto.png"] },
  { key: "esqueleto_siete", arts: ["esqueleto.png"] },
  { key: "esqueleto_ocho", arts: ["esqueleto.png"] },
  { key: "calabaza_uno", arts: ["calabaza.png"] },
  { key: "calabaza_dos", arts: ["calabaza.png"] },
  { key: "calabaza_tres", arts: ["calabaza.png"] },
  { key: "momia_uno", arts: ["momia.png"] },
];

const ASSET_BASE = "/dinamicas/promocion-halloween-misterioso/resources/";
function setBackImage(cell, file) {
  const back = cell.querySelector(".back-c");
  if (!back) {
    console.warn("No existe .back dentro de", cell);
    return null;
  }

  const img_temp = document.querySelectorAll(".card-c");
  img_temp.forEach((img) => {
    document.querySelector(".board").classList.add("item_select");
    // setTimeout(() => {
    //   img.classList.add("is-flipped");
    // }, 800);

    // setTimeout(() => {
    //   img.classList.remove("is-flipped");
    // }, 1800);
    setTimeout(() => {
      document.querySelector(".board").classList.remove("item_select");
    }, 2000);
  });
  const src = ASSET_BASE + file;
  back.innerHTML = `<img src="${src}" alt="${file}">`;
  return src;
}

// const totalPairs = cells.length;
const totalPairs = 4;

let lockBoard = false;
let firstCell = null;
let secondCell = null;
let moves = 0;
let matches = 0;

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
          <div class="card-c ">
            <div class="face-c front-c"></div>
            <div class="face-c back-c"></div>
          </div>`;
    }
  });
}

function buildDeck() {
  const deck = PAIRS.flatMap((p) =>
    p.arts.map((file) => ({ key: p.key, file })),
  );
  return shuffle(deck);
}

function updateHud() {
  if (hud) hud.textContent = `Lanzamientos: ${moves} / 3 `;
}

function resetTurn() {
  [firstCell, secondCell] = [null, null];
  lockBoard = false;
}

function evaluateRevealedPairs(ultimoKey) {
  const flippedCells = document.querySelectorAll(".card-c.is-flipped");
  let board_act = document.querySelector(".board");
  let cupidoCount = 0;

  flippedCells.forEach((card) => {
    const cell = card.closest(".cell-c");
    const key = cell.dataset.key;
    if (key && key.toLowerCase().includes("cupido")) {
      cupidoCount++;
    }
  });

  if (ultimoKey && ultimoKey.toLowerCase().includes("cupido")) {
    const gifAnterior = board_act.querySelector(".img_gif");
    if (gifAnterior) {
      gifAnterior.remove();
    }
  }

  matches = cupidoCount.toString();
  updateHud();
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

  if (moves >= 3) {
    Swal.fire({
      icon: "warning",
      title: "Sin movimientos",
    });
    return;
  }
  audioFicha.currentTime = 0;
  audioFicha.play();

  moves++;
  card.classList.add("is-flipped");
  updateHud();

  const currentKey = cell.dataset.key;
  evaluateRevealedPairs(currentKey);

  const backDiv = cell.querySelector(".back-c");
  const imgElement = backDiv ? backDiv.querySelector("img") : null;
  const srcImagen = imgElement ? imgElement.src : "";

  const chose_ficha_1 = document.getElementById("chose_ficha_1");

  if (chose_ficha_1 && srcImagen) {
    const frontOriginal = cell.querySelector(".front-c");
    const contenidoFrontal = frontOriginal ? frontOriginal.innerHTML : "";

    const claseInicialFlipped = estadoGlobalGiro ? "is-flipped" : "";

    let nombreFicha = "";

    if (srcImagen.includes("momia")) {
      nombreFicha = "Momia";
    } else if (srcImagen.includes("esqueleto")) {
      nombreFicha = "Calavera";
    } else if (srcImagen.includes("calabaza")) {
      nombreFicha = "Calabaza";
    }

    if (moves === 1) {
      step1 = nombreFicha;
    } else if (moves === 2) {
      step2 = nombreFicha;
    } else if (moves === 3) {
      step3 = nombreFicha;
    }

    const nuevaFicha = document.createElement("div");
    nuevaFicha.className = "cell-c";
    nuevaFicha.innerHTML = `
      <div class="card-c ${claseInicialFlipped}">
        <div class="face-c front-c">
          ${contenidoFrontal}
        </div>
        <div class="face-c back-c">
          <img src="${srcImagen}" alt="ficha clonada">
        </div>
      </div>
    `;

    chose_ficha_1.appendChild(nuevaFicha);
    const card_end = document.querySelectorAll(".card-c");

    if (moves === 3) {
      confettiAl();
      Swal.fire({
        title: "Tu Combinación",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
        html: `Ficha 1 : ${step1} <br/>
            Ficha 2 : ${step2} <br/>
            Ficha 3 : ${step3}
            <img class="img_corona_rama" src="/dinamicas/promocion-9-portales/resources/corona_rama.png" alt="promoAladdin">`,
      }).then((res) => {
        if (res.isConfirmed) {
          card_end.forEach((item) => {
            item.classList.add("is-flipped");
          });
        }
      });
    }
  }

  resetTurn();
}

let intervaloRotacionFicha = null;

function activarRotacionContinua(elementoFicha) {
  if (intervaloRotacionFicha) {
    clearInterval(intervaloRotacionFicha);
  }

  const cardClonada = elementoFicha.querySelector(".card-c");
  if (!cardClonada) return;

  let mostrarFigura = true;

  intervaloRotacionFicha = setInterval(() => {
    mostrarFigura = !mostrarFigura;

    if (mostrarFigura) {
      cardClonada.classList.add("is-flipped");
    } else {
      cardClonada.classList.remove("is-flipped");
    }
  }, 3000);
}

let estadoGlobalGiro = true;

setInterval(() => {
  estadoGlobalGiro = !estadoGlobalGiro;

  const chose_ficha_1 = document.getElementById("chose_ficha_1");
  if (!chose_ficha_1) return;

  const todasLasTarjetas = chose_ficha_1.querySelectorAll(".card-c");
  todasLasTarjetas.forEach((card) => {
    if (estadoGlobalGiro) {
      card.classList.add("is-flipped");
    } else {
      card.classList.remove("is-flipped");
    }
  });
}, 3000);

function ensureMarkup() {
  document.querySelectorAll(".cell-c").forEach((cell, index) => {
    if (!cell.querySelector(".card-c")) {
      cell.innerHTML = `
          <div class="card-c">
            <div class="face-c front-c">
              <span class="card-number">${index + 1}</span>
            </div>
            <div class="face-c back-c"></div>
          </div>`;
    }
  });
}

function deal() {
  ensureMarkup();
  const deck = buildDeck();

  document.querySelectorAll(".cell-c").forEach((cell, i) => {
    const { key, file } = deck[i];
    cell.dataset.key = key;

    setBackImage(cell, file);

    const frontNum = cell.querySelector(".front-c");
    if (frontNum) {
      frontNum.innerHTML = `<span class="card-number">${i + 1}</span>`;
    }

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

cells.forEach((cell) => {
  const card = cell.querySelector(".card-c");
  cell.addEventListener("click", onCellClick);
  (card ?? cell).setAttribute("tabindex", "0");
  (card ?? cell).addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cell.click();
    }
  });
});

PAIRS.flatMap((p) => p.arts).forEach((file) => {
  const im = new Image();
  im.src = ASSET_BASE + file;
});

updateHud();

let categoria = document.getElementById("categoria");

const user = inforUser();

document.getElementById("_btn_start_h_n_").addEventListener("click", () => {
  if (categoria.value.trim() === "") {
    Swal.fire({
      icon: "warning",
      title: "Selecciona la Categoria",
    });
    return;
  }
  document.getElementById("_btn_start_h_n_").style.display = "none";
  document.getElementById("_btn_reiniciar_h_n_").style.display = "flex";
  document.querySelector(".board_port").style.display = "none";
  deal();
});

document.getElementById("btn_enviar").addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  let nombre = document.getElementById("nombre");
  let casino = document.getElementById("casino");

  if (categoria.value == "" || nombre.value == "" || casino.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  if (step1 == "" || step2 == "" || step3 == "") {
    Swal.fire({
      icon: "warning",
      title: "Sin juego completado",
    });
    return;
  }

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: "",
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: step1,
    valor_8: step2,
    valor_9: step3,
    valor_11: promocion,
    valor_12: user.Nombre,
    valBono: "",
  };

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));
  setTimeout(() => {
    loader.style.display = "none";
    if (typeof GetResgistroDia === "function") GetResgistroDia();

    Swal.fire({
      icon: "info",
      title: "Guardado local",
      html: `
      <div >
      <p>Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.</p>
      </div>
      `,
      allowOutsideClick: false,
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
  }, 3000);
}

document.getElementById("btn_send_secundario").addEventListener("click", () => {
  handleSendSec();
});

function handleSendSec() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let resultValor1_secundario = document.getElementById(
    "resultValor1_secundario",
  );
  let resultValor2_secundario = document.getElementById(
    "resultValor2_secundario",
  );
  let resultValor3_secundario = document.getElementById(
    "resultValor3_secundario",
  );

  if (
    casino_modal.value == "" ||
    categoria_modal.value == "" ||
    hora_modal.value == "" ||
    fecha_modal.value == "" ||
    nombre_modal.value == "" ||
    bono_modal.value == "" ||
    resultValor1_secundario.value == "" ||
    resultValor2_secundario.value == "" ||
    resultValor3_secundario.value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora_modal.value,
    valor_2: fecha_modal.value,
    valor_3: nombre_modal.value,
    valor_4: "",
    valor_5: casino_modal.value,
    valor_6: categoria_modal.value,
    valor_7: resultValor1_secundario.value,
    valor_8: resultValor2_secundario.value,
    valor_9: resultValor3_secundario.value,
    valor_10: bono_modal.value,
    valor_11: promocion,
    valor_12: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      casino_modal.value = "";
      categoria_modal.value = "";
      hora_modal.value = "";
      fecha_modal.value = "";
      nombre_modal.value = "";
      bono_modal.value = "";
      resultValor1_secundario.value = "";
      resultValor2_secundario.value = "";
      resultValor3_secundario.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "warning",
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
}

document
  .getElementById("btn_envia_observacion")
  .addEventListener("click", () => {
    handleSendObs();
  });

function handleSendObs() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );

  if (casino_observacion.value == "" || descripcion_observacion.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  let data = {
    tipo: "envio_2",
    valor_1: hora,
    valor_2: fecha,
    valor_3: casino_observacion.value,
    valor_4: descripcion_observacion.value,
    valor_5: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
}

function GetResgistroDia() {
  const content_registro_dia = document.getElementById("result_dia_acumula");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();
  const loader = document.getElementById("loader");

  const filtrados = valCasino
    ? registros.filter((item) => item.valor_5)
    : registros;

  if (filtrados.length === 0) {
    content_registro_dia.innerHTML = `<p class="color-gray">No hay registros ${
      valCasino ? "para este casino." : "aún."
    }</p>`;
    info_result_dia.innerHTML = "";
    return;
  }
  const isBlank = (v) =>
    v == null || (typeof v === "string" && v.trim() === "");
  const hayBonoVacio = filtrados.some((item) => isBlank(item.valBono));
  notificacion_registro_dia.style.display = hayBonoVacio ? "flex" : "none";

  info_result_dia.innerHTML = `<small class="color-gray"><spam style="color: red">*</spam> Estos registros son temporales (se reinicia a las 00:00), por favor tener en cuenta.</small>`;

  // Render de la tabla (nota: input ahora usa CLASE, no ID repetido)
  content_registro_dia.innerHTML = `
    <div class="table-wrapper">
      <table class="styled-table table-scrolld ajuste_table_result">
        <thead>
          <tr>
            <th># Registro</th>
            <th>Casino</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Bono</th>
            <th>Acciones</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${filtrados
            .map((r, i) => {
              const bono = r.valBono ? r.valBono : "";
              const accion =
                bono === ""
                  ? `<button
                    class="table_btn_enviar_bono"
                    data-casino="${r.valor_5}"
                    data-categoria="${r.valor_6}"
                    data-nombre="${r.valor_3}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.valor_2}"
                    data-hora="${r.valor_1}"
                    data-resultado1="${r.valor_7}"
                    data-resultado2="${r.valor_8}"
                    data-resultado3="${r.valor_9}"
                    data-id="${r.id}"
                 >Enviar</button>`
                  : `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;

              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.valor_5}</td>
                <td>${r.valor_6}</td>
                <td>${r.valor_3}</td>
                <td>${
                  bono ||
                  `<input class="table_input_bono_portal" type="text" placeholder="#Bono">`
                }</td>
                <td>${accion}</td>
                <td>${r.valor_2} ${r.valor_1}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    `;

  function getRegs() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      localStorage.setItem(LS_KEY, "[]");
      return [];
    }
  }

  function updateLocalBono(
    {
      casino,
      categoria,
      nombre,
      cedula,
      fecha,
      hora,
      resultado1,
      resultado2,
      resultado3,
    },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_9).trim() === String(resultado3).trim() &&
        String(r.valor_8).trim() === String(resultado2).trim() &&
        String(r.valor_7).trim() === String(resultado1).trim() &&
        String(r.valor_6).trim() === String(categoria).trim() &&
        String(r.valor_5).trim() === String(casino).trim() &&
        String(r.valor_3).trim() === String(nombre).trim() &&
        String(r.valor_2).trim() === String(fecha).trim() &&
        String(r.valor_1).trim() === String(hora).trim(),
    );
    if (idx === -1) return false;

    regs[idx].valBono = valBono;
    regs[idx].bonoAsignado = true;
    localStorage.setItem(LS_KEY, JSON.stringify(regs));
    return true;
  }

  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );
  }

  if (content_registro_dia._clickHandler) {
    content_registro_dia.removeEventListener(
      "click",
      content_registro_dia._clickHandler,
    );
  }

  content_registro_dia._clickHandler = async (e) => {
    const btn = e.target.closest(".table_btn_enviar_bono");
    if (!btn) return;

    // Toma el input de la MISMA FILA
    const tr = btn.closest("tr");
    const bonoInput = tr?.querySelector(".table_input_bono_portal");
    const valBonoregistr = bonoInput?.value?.trim() || "";
    if (!valBonoregistr) {
      Swal.fire({
        icon: "warning",
        title: "Falta el bono",
        text: "Ingresa el # de bono antes de enviar.",
        allowOutsideClick: false,
      });
      return;
    }

    const {
      resultado = "0",
      casino = "",
      categoria = "",
      nombre = "",
      cedula = "",
      fecha = "",
      hora = "",
      resultado1 = "",
      resultado2 = "",
      resultado3 = "",
    } = btn.dataset;

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_4: cedula,
      valor_5: casino,
      valor_6: categoria,
      valor_7: resultado1,
      valor_8: resultado2,
      valor_9: resultado3,
      valor_10: valBonoregistr,
      valor_11: promocion,
      valor_12: user.Nombre,
    };

    // Clave única por registro para evitar duplicados
    const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
    if (IN_FLIGHT.has(key)) return;
    IN_FLIGHT.add(key);

    // Evita doble click en el mismo botón
    if (btn.dataset.sending === "1") return;
    btn.dataset.sending = "1";

    const prevText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando…";
    if (loader?.style) loader.style.display = "flex";

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
      });

      const ok = updateLocalBono(
        {
          casino,
          categoria,
          nombre,
          cedula,
          fecha,
          hora,
          resultado1,
          resultado2,
          resultado3,
        },
        valBonoregistr,
      );

      if (tr) {
        const tdBono = tr.querySelector("td:nth-child(6)");
        const tdAcc = tr.querySelector("td:nth-child(7)");
        if (tdBono) tdBono.innerHTML = escapeHtml(valBonoregistr);
        if (tdAcc)
          tdAcc.innerHTML = `<small class="table_ya_tiene_bono">Ya contiene Bono.</small>`;
      }

      Swal.fire({
        icon: ok ? "success" : "info",
        title: ok ? "Bono asignado" : "Registro no encontrado",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
        html: `<div>
            <p>${
              ok
                ? "Se envió la información de manera correcta."
                : "No se pudo localizar el registro en localStorage."
            }</p>
             
            </div>
            `,
        allowOutsideClick: false,
      });
      btn.textContent = prevText;
      GetResgistroDia();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
        html: `
      <div >
      <p>Ha ocurrido un error en el envió.</p>
     
      </div>
      `,
        allowOutsideClick: false,
      });
      btn.textContent = prevText;
    } finally {
      IN_FLIGHT.delete(key);

      if (loader?.style) loader.style.display = "none";

      // El TR pudo re-renderizarse; valida que el botón aún exista
      if (document.body.contains(btn)) {
        btn.disabled = false;
        btn.textContent = prevText;
        delete btn.dataset.sending;
      }
    }

    // setTimeout(() => {
    //   btn.textContent = "Error en el envio.";
    // }, 4500);

    // setTimeout(() => {
    //   btn.textContent = prevText;
    // }, 6000);
  };
  content_registro_dia.addEventListener(
    "click",
    content_registro_dia._clickHandler,
  );
}
GetResgistroDia();

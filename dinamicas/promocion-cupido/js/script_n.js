window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const cells = Array.from(document.querySelectorAll(".cell-c"));
const hud = document.getElementById("total_result");
const btnReset = document.getElementById("reset-game");
const categoria = document.getElementById("categoria");
const loader = document.getElementById("loader");

const promocion = "El Flechazo de Cupido";
const url = "https://script.google.com/macros/s/AKfycbxjswGydhyTqgMuFf9OuWfgPDyuvWWU-nWQlkHuYaRx0FzYSq6Dz7lHWcohLJVRcrcm/exec";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosFlechazoCupido";
const FECHA_KEY = "fechaFlechazoCupido";
const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}
const user = inforUser();

const PAIRS = [
  { key: "cupido-clasico", arts: ["cupido-clasico.png"] },
  { key: "cupido-suerte", arts: ["cupido-suerte.png"] },
  { key: "cupido-urbano", arts: ["cupido-urbano.png"] },
  { key: "cupido-vintage", arts: ["cupido-vintage.png"] },
  { key: "cinturon_castidad", arts: ["cinturon_castidad.png"] },
  { key: "El_cura", arts: ["El_cura.png"] },
  { key: "escudo_anti_amor", arts: ["escudo_anti_amor.png"] },
  { key: "La_monja", arts: ["La_monja.png"] },
  { key: "olafo_amargado", arts: ["olafo_amargado.png"] },
];

document.getElementById("start_game").style.display = "none";
document.querySelector(".board").classList.add("item_select");
categoria.addEventListener("change", () => {
  if (categoria.value == "" || categoria.value == "ADICIONAL") {
    document.getElementById("start_game").style.display = "none";
  } else {
    document.getElementById("start_game").style.display = "flex";
  }
});

const ASSET_BASE = "/dinamicas/promocion-cupido/resources/";

const PRIZES = {
  0: {
    GENIUS: "$130.000",
    TITANIO: "$120.000",
    LEGENDARIO: "$110.000",
    GOLD: "$100.000",
    SILVER: "$90.000",
    BRONCE: "$80.000",
    SUPERIOR: "$100.000",
    ESTANDAR: "$80.000",
  },
  1: {
    GENIUS: "$150.000",
    TITANIO: "$140.000",
    LEGENDARIO: "$130.000",
    GOLD: "$120.000",
    SILVER: "$110.000",
    BRONCE: "$100.000",
    SUPERIOR: "$120.000",
    ESTANDAR: "$100.000",
  },
  2: {
    GENIUS: "$600.000",
    TITANIO: "$500.000",
    LEGENDARIO: "$400.000",
    GOLD: "$300.000",
    SILVER: "$250.000",
    BRONCE: "$200.000",
    SUPERIOR: "$300.000",
    ESTANDAR: "$200.000",
  },
};

function getPrize(categoria, matches) {
  return PRIZES[matches]?.[categoria] || null;
}

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
  if (hud)
    hud.textContent = `Lanzamientos: ${moves} • Cupidos: ${matches}/${totalPairs}`;
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

    let img_gif = document.createElement("img");
    img_gif.classList.add("img_gif");
    img_gif.src = `/dinamicas/promocion-cupido/resources/Fichas/${ultimoKey}.gif`;
    board_act.appendChild(img_gif);
    
    setTimeout(() => {
      img_gif.remove();
    }, 6000);
  }

  matches = cupidoCount.toString();
  updateHud();
}

function onCellClick(e) {
  const cell = e.currentTarget;
  const card = cell.querySelector(".card-c");
  const card_end = document.querySelectorAll(".card-c");

  if (
    lockBoard ||
    cell.classList.contains("is-matched") ||
    card.classList.contains("is-flipped")
  )
    return;

  if (moves >= 4) {
    Swal.fire({
      icon: "warning",
      title: "Sin movimientos",
    });
    return;
  }

  moves++;
  card.classList.add("is-flipped");
  updateHud();

  const currentKey = cell.dataset.key;
  evaluateRevealedPairs(currentKey);

  if (!firstCell) {
    firstCell = cell;
    return;
  }

  secondCell = cell;
  lockBoard = true;

  if (firstCell.dataset.key === secondCell.dataset.key) {
    firstCell.classList.add("is-matched");
    secondCell.classList.add("is-matched");
    resetTurn();
    evaluateRevealedPairs(secondCell.dataset.key);
  } else {
    resetTurn();
  }

  if (moves >= 4) {
    const amount = getPrize(categoria.value, matches);
    setTimeout(() => {
      if (matches == 4) {
        confettiAl();
      }
      Swal.fire({
        position: "top-start",
        title: `Con categoria ${categoria.value}`,
        html: `<div class="swal-premio">
                <img id="swal-logo" src="/dinamicas/promocion-cupido/resources/logo.png" alt="Logo premio">
                <p>
                  Obtuviste un premio de <b style="font-size: 2rem">${amount} en Dinero Promocional</b>, 
                  con <b style="font-size: 2rem">${matches}</b> Cupidos... 
                  y <b style="font-size: 2rem">${moves}</b> Lanz...
                </p>
              </div>
            `,
        allowOutsideClick: false,
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
        didOpen: () => {
          const logo = document.getElementById("swal-logo");
          if (logo) {
            logo.classList.add("logo-animate");
          }
        },
      }).then((res) => {
        if (res.isConfirmed) {
          card_end.forEach((item) => {
            item.classList.add("is-flipped");
          });
        }
      });
    }, 100);
  }
}

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

btnReset?.addEventListener("click", deal);

PAIRS.flatMap((p) => p.arts).forEach((file) => {
  const im = new Image();
  im.src = ASSET_BASE + file;
});

document.getElementById("start_game").addEventListener("click", () => {
  document.getElementById("board_2").style.display = "none";
  document.getElementById("start_game").style.display = "none";
  document.getElementById("restart_game").style.display = "flex";
  deal();
});

const btn_enviar = document.getElementById("btn_enviar");
btn_enviar.addEventListener("click", () => {
  handleSubmit();
});


function handleSubmit() {
  let nombre = document.getElementById("nombre");
  let casino = document.getElementById("casino");

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

  if (!nombre.value || !casino.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: categoria.value == "ADICIONAL" ? "0 FLECHAZO" : matches + " FLECHAZO",
    valBono: categoria.value == "ADICIONAL" ? "0" : "",
    ...(categoria.value == "ADICIONAL" ? { valor_8: "0" } : ""),
    valor_9: promocion,
    valor_10: user.Nombre,
  };

  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));
  loader.style.display = "flex";
  if (typeof GetResgistroDia === "function") GetResgistroDia();
  if (categoria.value == "ADICIONAL") {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        loader.style.display = "none";
        nombre.value = "";
        casino.value = "";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso",
        });
      })
      .catch((error) => {
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error en el Envío",
        });
      });
  } else {
    setTimeout(() => {
      loader.style.display = "none";
      nombre.value = "";
      casino.value = "";
      Swal.fire({
        icon: "info",
        title: "Guardado local",
        html: `<div>
      <p>Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.</p>
      </div>`,
        allowOutsideClick: false,
        confirmButtonColor: "#dc3545",
      });
    }, 3000);
  }
}

const btn_send_secundario = document.getElementById("btn_send_secundario");
btn_send_secundario.addEventListener("click", () => {
  handleSeSubmit();
});

function handleSeSubmit() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let valor_promo_modal = document.getElementById("valor_promo_modal");

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

  if (categoria_modal.value == "ADICIONAL") {
    valor_promo_modal.value = "0";
    bono_modal.value = "0";
  }

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value ||
    !valor_promo_modal.value
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre_modal.value,
    valor_4: "",
    valor_5: casino_modal.value,
    valor_6: categoria_modal.value,
    valor_7: valor_promo_modal.value + " FLECHAZO",
    valor_8: bono_modal.value,
    valor_9: promocion,
    valor_10: user.Nombre,
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
      casino_modal.value = "";
      categoria_modal.value = "";
      nombre_modal.value = "";
      valor_promo_modal.value = "";
      bono_modal.value = "";
      hora_modal.value = "";
      fecha_modal.value = "";
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
}

const btn_envia_observacion = document.getElementById("btn_envia_observacion");
btn_envia_observacion.addEventListener("click", () => {
  handleSubmitObs();
});

function handleSubmitObs() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );

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
    .catch((erro) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envio",
      });
    });
}


function GetResgistroDia() {
  const content_registro_dia = document.getElementById("result_dia_acumula");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

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
                    data-resultado="${r.valor_7}"
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
    { casino, categoria, nombre, cedula, fecha, hora, resultado },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_7).trim() === String(resultado).trim() &&
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
      casino = "",
      categoria = "",
      nombre = "",
      cedula = "",
      fecha = "",
      hora = "",
      resultado = "",
    } = btn.dataset;

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_5: casino,
      valor_6: categoria,
      valor_7: resultado,
      valor_8: valBonoregistr,
      valor_9: promocion,
      valor_10: user.Nombre,
    };

    const key = [casino, categoria, nombre, cedula, fecha, hora].join("|");
    if (IN_FLIGHT.has(key)) return;
    IN_FLIGHT.add(key);

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
          resultado,
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
          popup: "",
          title: "",
          confirmButton: "",
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
        html: `<div >
                <p>Ha ocurrido un error en el envió.</p>
              </div>`,
        allowOutsideClick: false,
      });
      btn.textContent = prevText;
    } finally {
      IN_FLIGHT.delete(key);

      if (loader?.style) loader.style.display = "none";

      if (document.body.contains(btn)) {
        btn.disabled = false;
        btn.textContent = prevText;
        delete btn.dataset.sending;
      }
    }
  };
  content_registro_dia.addEventListener(
    "click",
    content_registro_dia._clickHandler,
  );
}
GetResgistroDia();
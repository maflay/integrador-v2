window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const categoria = document.getElementById("categoria");
const casino = document.getElementById("casino");
const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
// btn modal
const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");
const close_modal_icon = document.getElementById("close_modal_icon");

const btn_submit = document.getElementById("btn_submit");
const btn_submit_secundario = document.getElementById("btn_submit_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia"
);
notificacion_registro_dia.style.display = "none";

const url =
  "https://script.google.com/macros/s/AKfycbwkU4mjIXr1bxU08Jdj-gpqQ-b94IBU7Fw9oby2tzoebABhWw-Twie1itJma_x-B4Rs/exec";

const promocion = "Dado de Póker";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosDadosdePoker";
const FECHA_KEY = "fechaDadosdePoker";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
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

// view modal
const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion"
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

const opciones_DP = document.getElementById("opciones_DP");

const user = inforUser();
const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

// Tabla base (puedes tenerla en otro archivo o módulo)
const tablaPremios = [
  {
    combinacion: "Quintilla",
    bronce: 500000,
    silver: 1000000,
    gold: 1300000,
    legendario: 1500000,
    titanio: 1800000,
    genius: 2000000,
    estandar: 500000,
    superior: 1000000,
  },
  {
    combinacion: "Póker",
    bronce: 200000,
    silver: 250000,
    gold: 300000,
    legendario: 350000,
    titanio: 400000,
    genius: 450000,
    estandar: 200000,
    superior: 250000,
  },
  {
    combinacion: "Full House",
    bronce: 140000,
    silver: 160000,
    gold: 180000,
    legendario: 200000,
    titanio: 220000,
    genius: 240000,
    estandar: 140000,
    superior: 160000,
  },
  {
    combinacion: "Terna",
    bronce: 120000,
    silver: 140000,
    gold: 160000,
    legendario: 180000,
    titanio: 200000,
    genius: 220000,
    estandar: 120000,
    superior: 140000,
  },
  {
    combinacion: "Dos Pares",
    bronce: 100000,
    silver: 120000,
    gold: 140000,
    legendario: 160000,
    titanio: 180000,
    genius: 200000,
    estandar: 100000,
    superior: 120000,
  },
  {
    combinacion: "Par",
    bronce: 80000,
    silver: 100000,
    gold: 120000,
    legendario: 140000,
    titanio: 160000,
    genius: 180000,
    estandar: 80000,
    superior: 100000,
  },
];

//   reiniciar

const reiniciar_tbl_m = document.getElementById("reiniciar_tbl_m");

reiniciar_tbl_m.addEventListener("click", () => {
  Swal.fire({
    title: "Seguro de Reiniciar?",
    text: "Se reiniciara todo el  tablero!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si quiero!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Correcto!",
        text: "Se reiniciara el tablero.",
        icon: "success",
      }).then((res) => {
        if (res.isConfirmed) {
          resetBoxes();
        }
      });
    }
  });
});

const reiniciar_tbl = document.getElementById("reiniciar_tbl");

reiniciar_tbl.addEventListener("click", () => {
  Swal.fire({
    title: "Seguro de Reiniciar?",
    text: "Se reiniciara todo en pantalla!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si quiero!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Correcto!",
        text: "Se reiniciara la pantalla.",
        icon: "success",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    }
  });
});

//   botones Tablero
const btn_un_par = document.getElementById("btn_un_par");
const btn_dos_pares = document.getElementById("btn_dos_pares");
const btn_terna = document.getElementById("btn_terna");
const btn_full_house = document.getElementById("btn_full_house");
const btn_poker = document.getElementById("btn_poker");
const btn_quintilla = document.getElementById("btn_quintilla");

// dados
const dado_1 = document.getElementById("dado_1");
const dado_2 = document.getElementById("dado_2");
const dado_3 = document.getElementById("dado_3");
const dado_4 = document.getElementById("dado_4");
const dado_5 = document.getElementById("dado_5");

// msj
const msj_combi = document.getElementById("msj_combi");

// categoria.addEventListener("change", () => {
//   validateBtn();
// });

// validateBtn();

function validateBtn() {
  if (categoria.value == "" || categoria.value == "ADICIONAL") {
    btn_un_par.classList.add("disable_btn_board");
    btn_dos_pares.classList.add("disable_btn_board");
    btn_terna.classList.add("disable_btn_board");
    btn_full_house.classList.add("disable_btn_board");
    btn_poker.classList.add("disable_btn_board");
    btn_quintilla.classList.add("disable_btn_board");
  } else {
    btn_un_par.classList.remove("disable_btn_board");
    btn_dos_pares.classList.remove("disable_btn_board");
    btn_terna.classList.remove("disable_btn_board");
    btn_full_house.classList.remove("disable_btn_board");
    btn_poker.classList.remove("disable_btn_board");
    btn_quintilla.classList.remove("disable_btn_board");
  }
}

function diabledBtn() {
  btn_un_par.classList.add("disable_btn_board");
  btn_dos_pares.classList.add("disable_btn_board");
  btn_terna.classList.add("disable_btn_board");
  btn_full_house.classList.add("disable_btn_board");
  btn_poker.classList.add("disable_btn_board");
  btn_quintilla.classList.add("disable_btn_board");
}

btn_un_par.addEventListener("click", () => {
  if (categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Categoria no Seleccionada",
      html: "Por favor, selecciona una categoria antes de iniciar.",
    });
    return;
  }
  dado_1.classList.add("par");
  dado_2.classList.add("par");
  dado_3.classList.add("no_figura");
  dado_4.classList.add("no_figura");
  dado_5.classList.add("no_figura");
  msj_combi.textContent = "Felicidades Sacaste Un Par!!";
  diabledBtn();
  obtenerPremio("Par", categoria.value);
});

btn_dos_pares.addEventListener("click", () => {
  if (categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Categoria no Seleccionada",
      html: "Por favor, selecciona una categoria antes de iniciar.",
    });
    return;
  }
  dado_1.classList.add("par");
  dado_2.classList.add("par");
  dado_3.classList.add("par-full-house");
  dado_4.classList.add("par-full-house");
  dado_5.classList.add("no_figura");
  msj_combi.textContent = "Felicidades Sacaste Dos Pares!!";
  diabledBtn();
  obtenerPremio("Dos Pares", categoria.value);
});

btn_terna.addEventListener("click", () => {
  if (categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Categoria no Seleccionada",
      html: "Por favor, selecciona una categoria antes de iniciar.",
    });
    return;
  }
  dado_1.classList.add("par");
  dado_2.classList.add("par");
  dado_3.classList.add("par");
  dado_4.classList.add("no_figura");
  dado_5.classList.add("no_figura");
  msj_combi.textContent = "Felicidades Sacaste Una Terna!!";
  diabledBtn();
  obtenerPremio("Terna", categoria.value);
});

btn_full_house.addEventListener("click", () => {
  if (categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Categoria no Seleccionada",
      html: "Por favor, selecciona una categoria antes de iniciar.",
    });
    return;
  }
  dado_1.classList.add("par");
  dado_2.classList.add("par");
  dado_3.classList.add("par");
  dado_4.classList.add("par-full-house");
  dado_5.classList.add("par-full-house");
  msj_combi.textContent = "Felicidades Sacaste Un Full House!!";
  diabledBtn();
  obtenerPremio("Full House", categoria.value);
});

btn_poker.addEventListener("click", () => {
  if (categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Categoria no Seleccionada",
      html: "Por favor, selecciona una categoria antes de iniciar.",
    });
    return;
  }
  dado_1.classList.add("par");
  dado_2.classList.add("par");
  dado_3.classList.add("par");
  dado_4.classList.add("par");
  dado_5.classList.add("no_figura");
  msj_combi.textContent = "Felicidades Sacaste Un Póker!!";
  diabledBtn();
  obtenerPremio("Póker", categoria.value);
});

btn_quintilla.addEventListener("click", () => {
  if (categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Categoria no Seleccionada",
      html: "Por favor, selecciona una categoria antes de iniciar.",
    });
    return;
  }
  dado_1.classList.add("par");
  dado_2.classList.add("par");
  dado_3.classList.add("par");
  dado_4.classList.add("par");
  dado_5.classList.add("par");
  msj_combi.textContent = "Felicidades Sacaste Una Quintilla!!";
  diabledBtn();
  obtenerPremio("Quintilla", categoria.value);
});

opciones_DP.addEventListener("click", () => {
  document.getElementById("modal_opciones_DP").style.display = "flex";
});

close_modal_icon.addEventListener("click", () => {
  document.getElementById("modal_opciones_DP").style.display = "none";
  view_guardar_registro.style.display = "flex";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.add("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_guardar_registro.classList.add("select_menu");

view_guardar_registro.style.display = "flex";
view_envio_secundario.style.display = "none";
view_envia_observacion.style.display = "none";
view_tabla_premios.style.display = "none";
view_registro_dia.style.display = "none";

btn_guardar_registro.addEventListener("click", () => {
  view_guardar_registro.style.display = "flex";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.add("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_envio_secundario.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_observacion.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_tabla_premios.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_tabla_premios.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_registro_dia.addEventListener("click", () => {
  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";

  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");
});

let valorPremio = "";
let valorCombi = "";
function obtenerPremio(combinacion, cate) {
  const fila = tablaPremios.find(
    (item) => item.combinacion.toLowerCase() === combinacion.toLowerCase()
  );
  if (!fila) return "❌ Combinación no encontrada";

  const premio = fila[cate.toLowerCase()];
  if (premio === undefined) return "❌ Categoría no encontrada";
  console.log(premio);

  valorPremio = premio;
  valorCombi = combinacion;
  Swal.fire({
    icon: "success",
    title: `Combinación: ${combinacion}`,
    html: `Ganaste un premio de ${formatoCOP.format(
      premio
    )} en Dinero Promocional, con categoría  ${cate}`,
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.2 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.8 },
  });

  msj_combi.innerHTML = `<p class="title_msg_premio">Combinación: ${combinacion}, ganaste un premio de ${formatoCOP.format(
    premio
  )} en Dinero Promocional, con categoría  ${cate}</p>`;

  return `$ ${premio.toLocaleString()}`;
}

function resetBoxes() {
  categoria.value = "";
  casino.value = "";
  nombre.value = "";
  cedula.value = "";

  dado_1.classList.remove("par");
  dado_2.classList.remove("par");
  dado_3.classList.remove("no_figura", "par", "par-full-house");
  dado_4.classList.remove("no_figura", "par", "par-full-house");
  dado_5.classList.remove("no_figura", "par", "par-full-house");

  msj_combi.textContent = "";

  // validateBtn();
}

btn_submit.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  let categoriaValue = categoria.value;
  let casinoValue = casino.value;
  let nombreValue = nombre.value;
  let cedulaValue = cedula.value;

  if (categoriaValue == "" || casinoValue == "" || nombreValue == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: `Por favor, completa la información antes de enviar`,
    });
    return;
  }

  let data = {};

  if (categoriaValue == "ADICIONAL") {
    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombreValue,
      valor_4: cedulaValue,
      valor_5: casinoValue,
      valor_6: categoriaValue,
      valor_7: "0",
      valor_8: "0",
      valBono: "0",
      valor_9: promocion,
      valor_10: user.Nombre,
    };
  } else {
    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombreValue,
      valor_4: cedulaValue,
      valor_5: casinoValue,
      valor_6: categoriaValue,
      valor_7: valorCombi,
      valor_9: promocion,
      valBono: "",
    };
    if (valorPremio == 0) {
      Swal.fire({
        icon: "warning",
        title: "Antes de continuar",
        html: `Por favor, completar el minijuego antes de enviar.`,
      });
      return;
    }
  }

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));

  if (typeof GetResgistroDia === "function") GetResgistroDia();

  if (categoriaValue == "ADICIONAL") {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
        nombre.value = "";
        cedula.value = "";
        categoria.value = "";
        casino.value = "";
        setTimeout(() => {
          loader.style.display = "none";
          Swal.fire({
            icon: "success",
            html: `<div class="content_swal_premio">
              <div class="swal_premio_portal">
              <br/>
              </div>
              <h2>Con ${categoriaValue}</h2>
              La información se envio de manera correcta
              </div>`,
            allowOutsideClick: false,
            customClass: {
              popup: "mi-popup",
              title: "mi-titulo",
            },
          });
        }, 2500);
        return;
      });
    return;
  }

  setTimeout(() => {
    nombre.value = "";
    cedula.value = "";
    casino.value = "";
    categoria.value = "";
  }, 1500);

  setTimeout(() => {
    loader.style.display = "none";
    resetBoxes();
    Swal.fire({
      icon: "info",
      title: `Guardado Local`,
      html: ` <div>
                    <p>Se guardó el registro sin # de bono. Puedes asignarlo y enviarlo después.</p>
                </div>
            `,
      allowOutsideClick: false,
    });
  }, 3000);
}

function GetResgistroDia() {
  const content_registro_dia = document.getElementById("result_dia_dados");
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
  console.log(hayBonoVacio);
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
                    class="table_btn_enviar_bono btn btn-success"
                    data-casino="${r.valor_5}"
                    data-categoria="${r.valor_6}"
                    data-nombre="${r.valor_3}"
                    data-bono="${bono || "0"}"
                    data-fecha="${r.valor_2}"
                    data-hora="${r.valor_1}"
                    data-resultado="${r.valor_7}"
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
                  `<input class="table_input_bono_dado" type="text" placeholder="#Bono">`
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
    valBono
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_7).trim() === String(resultado).trim() &&
        String(r.valor_6).trim() === String(categoria).trim() &&
        String(r.valor_5).trim() === String(casino).trim() &&
        String(r.valor_3).trim() === String(nombre).trim() &&
        String(r.valor_2).trim() === String(fecha).trim() &&
        String(r.valor_1).trim() === String(hora).trim()
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
        }[m])
    );
  }

  if (content_registro_dia._clickHandler) {
    content_registro_dia.removeEventListener(
      "click",
      content_registro_dia._clickHandler
    );
  }

  content_registro_dia._clickHandler = async (e) => {
    const btn = e.target.closest(".table_btn_enviar_bono");
    if (!btn) return;

    // Toma el input de la MISMA FILA
    const tr = btn.closest("tr");
    const bonoInput = tr?.querySelector(".table_input_bono_dado");
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

    // Clave única por registro para evitar duplicados
    const key = [casino, categoria, nombre, fecha, hora].join("|");
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
          resultado,
        },
        valBonoregistr
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
    content_registro_dia._clickHandler
  );
}
GetResgistroDia();

btn_submit_secundario.addEventListener("click", () => {
  handleEnvioSecundario();
});
function handleEnvioSecundario() {
  const casino_secundario = document.getElementById("casino_secundario");
  const categoria_secundario = document.getElementById("categoria-secundario");
  const cedula_secundario = document.getElementById("cedula_secundario");
  const nombre_secundario = document.getElementById("nombre_secundario");
  const fecha_secundario = document.getElementById("fecha_secundario");
  const hora_secundario = document.getElementById("hora_secundario");
  const bono_secundario = document.getElementById("bono_secundario");
  const resultado_secundario = document.getElementById("resultado_secundario");

  let casino = casino_secundario.value;
  let categoria = categoria_secundario.value;
  let cedula = cedula_secundario.value;
  let nombre = nombre_secundario.value;
  let fecha = fecha_secundario.value;
  let hora = hora_secundario.value;
  let bono = bono_secundario.value;
  let resultado = resultado_secundario.value;

  const fechaFormateada = new Date(fecha).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (categoria == "ADICIONAL") {
    (bono = "0"), (resultado = "0");
  }

  if (
    casino == "" ||
    categoria == "" ||
    nombre == "" ||
    fecha == "" ||
    hora == "" ||
    bono == "" ||
    resultado == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!.",
      html: "Por favor, Completa la información antes de enviar.",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fechaFormateada,
    valor_3: nombre,
    valor_4: cedula,
    valor_5: casino,
    valor_6: categoria,
    valor_7: resultado,
    valor_8: bono,
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
      casino_secundario.value = "";
      categoria_secundario.value = "";
      cedula_secundario.value = "";
      nombre_secundario.value = "";
      fecha_secundario.value = "";
      hora_secundario.value = "";
      bono_secundario.value = "";
      resultado_secundario.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso",
          html: "La información se envio correctamente",
        });
      }, 1500);
    })
    .catch((error) => {
      console.war(error);
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleEnvioObs();
});

function handleEnvioObs() {
  const casino = document.getElementById("casino_observacion");
  const descripcion = document.getElementById("descripcion_observacion");

  let casinoV = casino.value;
  let descripcionV = descripcion.value;

  if (casinoV == "" || descripcionV == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: "Por favor, completa la información antes de enviar",
    });
    return;
  }

  let data = {
    tipo: "envio_2",
    valor_1: casinoV,
    valor_2: descripcionV,
    valor_3: casinoV,
    valor_4: descripcionV,
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
      casino.value = "";
      descripcion.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso",
          html: "La Observación se envio de manera correcta.",
        });
      }, 2000);
    });
}

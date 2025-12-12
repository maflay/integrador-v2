window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

const casino = document.getElementById("casino");
const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const cedula = document.getElementById("cedula");
const resultado = document.getElementById("resultado");
const btn_send = document.getElementById("btn_send");
const btn_validar = document.getElementById("btn_validar");
const opciones_acumula = document.getElementById("opciones_acumula");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const close_modal_opciones_acumula = document.getElementById(
  "cerrarmodaleopciones"
);

const loader = document.getElementById("loader");

const promocion = "Acumula y Gana";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosAcumulaYGana";
const FECHA_KEY = "fechaAcumulaYGana";
const url =
  "https://script.google.com/macros/s/AKfycbzWZCf4OIgSj1qji3aLlEbwPL8Jfycn6meoGkUJn_QIdAsjkB-n2Fxzld4I5Q9s4ihV/exec";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

opciones_acumula.addEventListener("click", () => {
  document.getElementById("modal_opciones_acumula").style.display = "flex";
});

close_modal_opciones_acumula.addEventListener("click", () => {
  document.getElementById("modal_opciones_acumula").style.display = "none";
});

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia"
);

notificacion_registro_dia.style.display = "none";

const user = inforUser();

//   menu modal btn
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_envio_observacion = document.getElementById("btn_envio_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registros_dia = document.getElementById("btn_registros_dia");

//   menu modal view
const view_envio_segundario = document.getElementById("view_envio_segundario");
const view_envio_observacion = document.getElementById(
  "view_envio_observacion"
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

view_envio_segundario.style.display = "none";
view_envio_observacion.style.display = "flex";
view_tabla_premios.style.display = "none";
view_registro_dia.style.display = "none";
btn_envio_observacion.classList.add("select_menu");

btn_send.style.display = "none";
btn_envio_secundario.style.display = "none";

categoria.addEventListener("change", () => {
  if (categoria.value === "ADICIONAL") {
    btn_validar.style.display = "none";
    btn_send.style.display = "block";
  } else {
    btn_validar.style.display = "block";
    btn_send.style.display = "none";
  }
});

btn_envio_secundario.addEventListener("click", () => {
  btn_envio_secundario.classList.add("select_menu");
  btn_envio_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registros_dia.classList.remove("select_menu");
  view_envio_segundario.style.display = "flex";
  view_envio_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_envio_observacion.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_envio_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registros_dia.classList.remove("select_menu");
  view_envio_segundario.style.display = "none";
  view_envio_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_tabla_premios.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_envio_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registros_dia.classList.remove("select_menu");
  view_envio_segundario.style.display = "none";
  view_envio_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";
});

btn_registros_dia.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_envio_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registros_dia.classList.add("select_menu");
  view_envio_segundario.style.display = "none";
  view_envio_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";
});

const casinoTbl1Set = new Set([
  "A19",
  "A50",
  "A70",
  "A38",
  "A35",
  "A36",
  "A39",
  "A88",
  "A48",
  "A49",
  "A781",
  "A100",
  "A12-MESAS",
  "A15-MESAS",
  "A36-MESAS",
  "A48-MESAS",
  "A108-MESAS",
]);
const casinoTbl2Set = new Set([
  "A05",
  "A07",
  "A08",
  "A09",
  "A12",
  "A15",
  "A16",
]);

const casinoTbl3Set = new Set(["A43", "A53", "MP108", "A108"]);

const tabla_de_premios_1 = {
  ESTANDAR: {
    1: 50000,
    2: 80000,
    3: 100000,
    4: 150000,
  },
  SUPERIOR: {
    1: 50000,
    2: 80000,
    3: 100000,
    4: 150000,
  },
};

const tabla_de_premios_2 = {
  BRONCE: { 1: 50000, 2: 70000, 3: 100000, 4: 150000 },
  SILVER: { 1: 60000, 2: 80000, 3: 110000, 4: 160000 },
  GOLD: { 1: 70000, 2: 90000, 3: 120000, 4: 170000 },
  LEGENDARIO: { 1: 80000, 2: 100000, 3: 130000, 4: 180000 },
  TITANIO: { 1: 90000, 2: 110000, 3: 140000, 4: 190000 },
  GENIUS: { 1: 100000, 2: 120000, 3: 150000, 4: 200000 },
};

const tabla_de_premios_3 = {
  BRONCE: { 1: 80000, 2: 100000, 3: 120000, 4: 150000 },
  SILVER: { 1: 90000, 2: 110000, 3: 130000, 4: 160000 },
  GOLD: { 1: 100000, 2: 120000, 3: 140000, 4: 170000 },
  LEGENDARIO: { 1: 110000, 2: 130000, 3: 150000, 4: 180000 },
  TITANIO: { 1: 120000, 2: 140000, 3: 160000, 4: 190000 },
  GENIUS: { 1: 130000, 2: 150000, 3: 170000, 4: 200000 },
};

function validatePremio(casinoV, categoriaV, resultadoV) {
  // Normalizar valores (por seguridad)
  const casino = casinoV.trim().toUpperCase();
  const categoria = categoriaV.trim().toUpperCase();
  const resultado = resultadoV.trim();

  if (casinoTbl1Set.has(casino)) {
    const tbl1 = tabla_de_premios_1[categoria];
    if (!tbl1) return "Categoría no válida";

    return tbl1[resultado] ? tbl1[resultado] : "Sin premio asignado";
  } else if (casinoTbl2Set.has(casino)) {
    const tbl2 = tabla_de_premios_2[categoria];
    if (!tbl2) return "Categoría no válida";

    return tbl2[resultado] ? tbl2[resultado] : "Sin premio asignado";
  } else if (casinoTbl3Set.has(casino)) {
    const tbl3 = tabla_de_premios_3[categoria];
    if (!tbl3) return "Categoría no válida";
    return tbl3[resultado] ? tbl3[resultado] : "Sin premio asignado";
  } else {
    return "Casino no encontrado";
  }
}

btn_validar.addEventListener("click", () => {
  const casinoValue = casino.value;
  const categoriaValue = categoria.value;
  const resultadoValue = resultado.value;
  const opcionSeleccionada = resultado.options[resultado.selectedIndex];
  const valorData = opcionSeleccionada.dataset.valor;

  if (casinoValue === "" || categoriaValue === "" || resultadoValue === "") {
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      html: "Por favor completa todos los campos para validar el premio.",
    });
    return;
  }

  const premio = validatePremio(casinoValue, categoriaValue, valorData);

  const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  console.log(premio);

  if (premio === "Categoría no válida" || premio === "Casino no encontrado") {
    Swal.fire({
      icon: "error",
      title:
        "El premio no pudo ser validado, con el casino y categoría seleccionados",
      html: premio,
    });
    return;
  } else {
    let mensaje = "";
    if (typeof premio === "number") {
      const premioU = formatoPesos_monto_efectivo.format(premio);
      mensaje = `Ganaste un premio de <b>${premioU}</b> en Dinero Promocional.`;
    } else {
      mensaje = premio; // será "Sin premio asignado" o mensaje similar
    }

    Swal.fire({
      icon: "success",
      title: "Premio Validado",
      html: mensaje,
    });
    btn_validar.style.display = "none";
    btn_send.style.display = "block";
  }
});

btn_send.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  const casinoValue = casino.value;
  const nombreValue = nombre.value;
  const categoriaValue = categoria.value;
  const cedulaValue = cedula.value;
  const resultadoValue = resultado.value;

  const opcionSeleccionada = resultado.options[resultado.selectedIndex];
  const valorData = opcionSeleccionada.dataset.valor;

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
      valBono: "0",
      valor_8: "0",
      valor_9: promocion,
      valor_10: user.Nombre,
    };
    if (casinoValue === "" || nombreValue === "" || categoriaValue === "") {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        html: "Por favor completa todos los campos del formulario.",
      });
      return;
    }
  } else {
    data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombreValue,
      valor_4: cedulaValue,
      valor_5: casinoValue,
      valor_6: categoriaValue,
      valor_7: resultadoValue,
      valor_9: promocion,
      valBono: "",
    };
    if (
      casinoValue === "" ||
      nombreValue === "" ||
      categoriaValue === "" ||
      resultadoValue === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        html: "Por favor completa todos los campos del formulario.",
      });
      return;
    }
  }

  console.log(data);

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
      .then((result) => {
        nombre.value = "";
        cedula.value = "";
        resultado.value = "";
        categoria.value = "";
        casino.value = "";
        btn_validar.style.display = "block";
        btn_send.style.display = "none";
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
    resultado.value = "";
    categoria.value = "";
    casino.value = "";
  }, 1500);

  setTimeout(() => {
    loader.style.display = "none";
    btn_validar.style.display = "block";
    btn_send.style.display = "none";
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
                    class="table_btn_enviar_bono"
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

btn_envia_observacion.addEventListener("click", () => {
  const casino_observacion = document.getElementById("casino_observacion");
  const descripcion_observacion = document.getElementById(
    "descripcion_observacion"
  );

  const fechaCompletaObs = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [fechaObs, horaObs] = fechaCompletaObs.split(", ");

  if (casino_observacion.value == "" || descripcion_observacion.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: "Completa la información antes de enviar.",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  let data = {
    tipo: "envio_2",
    valor_1: horaObs,
    valor_2: fechaObs,
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
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Exito",
        html: "La observación se envió de manera correcta.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    });
});

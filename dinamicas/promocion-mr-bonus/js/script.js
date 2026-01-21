window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const user = getCookie("__Secure_1nf0_US3R");
const promocion = "Mr. Bonus";
const url =
  "https://script.google.com/macros/s/AKfycbwg-Z7_H0W5k55EhwPBbxdqhPmZDerTWFhERL7IcFKS0GyZrD4f17l-4jl82N71JsfbJA/exec";

const IN_FLIGHT = new Set();
const LS_KEY = "registrosMrBonus";
const FECHA_KEY = "fechaMrBonus";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

// datos form
const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const nombre = document.getElementById("nombre");
const sorteo = document.getElementById("sorteo");
const loader = document.getElementById("loader");
const bono = document.getElementById("bono");

const btn_enviar_form = document.getElementById("btn_enviar_form");
const btn_validate_premio = document.getElementById("btn_validate_premio");

const btn_send_secundario = document.getElementById("btn_send_secundario");

const btn_envia_observacion = document.getElementById("btn_envia_observacion");

const btn_opciones = document.getElementById("btn_opciones");
const close_modal_icon = document.getElementById("close_modal_icon");

// modal

const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");
const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia"
);

const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion"
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");

view_envio_secundario.style.display = "none";
view_envia_observacion.style.display = "none";
view_tabla_premios.style.display = "none";
view_registro_dia.style.display = "none";

btn_opciones.addEventListener("click", () => {
  document.getElementById("modal_opciones_mrbonus").style.display = "flex";
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

close_modal_icon.addEventListener("click", () => {
  document.getElementById("modal_opciones_mrbonus").style.display = "none";
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_envio_secundario.addEventListener("click", () => {
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_observacion.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_tabla_premios.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";
});

btn_registro_dia.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";
});

document.getElementById("show_form").addEventListener("click", () => {
  if (document.getElementById("content_form_promo").style.display == "none") {
    document.getElementById("content_form_promo").style.display = "flex";
  } else {
    document.getElementById("content_form_promo").style.display = "none";
  }
});

function getPremio(categoriaKey, local, numSorteos) {
  const tablaPorCategoria = {
    ESTANDAR: "tabla-mrbonus-estandar",
    SUPERIOR: "tabla-mrbonus-superior",
    "VERSION 7": "tabla-mrbonus-otros",
  };

  const tablaId = tablaPorCategoria[categoriaKey];
  if (!tablaId) {
    return null;
  }

  const tabla = document.getElementById(tablaId);
  if (!tabla) {
    return null;
  }

  const tbody = tabla.tBodies[0];
  if (!tbody) return null;

  let filaEncontrada = null;
  for (const tr of tbody.rows) {
    const localTexto = tr.cells[0].textContent.trim();
    if (localTexto === local) {
      filaEncontrada = tr;
      break;
    }
  }

  if (!filaEncontrada) {
    // console.warn(
    //   "No se encontró el local:",
    //   local,
    //   "en categoría:",
    //   categoriaKey
    // );
    return null;
  }

  const colIndex = 1 + numSorteos; // numSorteos = 1..7
  const cell = filaEncontrada.cells[colIndex];
  if (!cell) {
    return null;
  }

  const texto = cell.textContent.trim();

  if (texto === "N/A" || texto === "") {
    return null;
  }

  const numero = parseInt(texto.replace(/\D/g, ""), 10);
  return isNaN(numero) ? null : numero;
}

btn_validate_premio.addEventListener("click", () => {
  validatePremio();
});

const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

function validatePremio() {
  const casinoValue = casino.value;
  const categoriaValue = categoria.value;
  const sorteoValue = sorteo.value;

  if (!casinoValue || !categoriaValue || !sorteoValue) {
    Swal.fire({
      icon: "warning",
      title: "Faltan datos",
      text: "Selecciona casino, categoría y sorteo.",
    });
    return;
  }

  const partes = sorteoValue.split(" ");
  const numSorteos = parseInt(partes[1], 10);

  const valorPremio = getPremio(categoriaValue, casinoValue, numSorteos);

  if (valorPremio == null) {
    Swal.fire({
      icon: "info",
      title: "Sin premio",
      text: "Para esa combinación no hay valor (N/A o no definido).",
    });
    return;
  }

  const textoPremio = formatoCOP.format(valorPremio);

  Swal.fire({
    icon: "success",
    title: "Premio ",
    html: `
      <p><strong>Tu premio es de:</strong> ${textoPremio} en Dinero Promocional</p>
    `,
    allowOutsideClick: false,
  });
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
  });

  btn_validate_premio.style.display = "none";
  btn_enviar_form.style.display = "flex";

  // Aquí podrías guardar ese valor para enviarlo al Apps Script:
  // premioSeleccionado = valorPremio;
}

categoria.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    btn_validate_premio.style.display = "none";
    bono.style.display = "none";
    btn_enviar_form.style.display = "flex";
  } else {
    btn_validate_premio.style.display = "flex";
    bono.style.display = "flex";
    btn_enviar_form.style.display = "none";
  }
});

btn_enviar_form.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  let casinoValue = casino.value;
  let nombreValue = nombre.value;
  let categoriaValue = categoria.value;
  let sorteoValue = categoria.value == "ADICIONAL" ? "0" : sorteo.value;
  let bonoValue = categoria.value == "ADICIONAL" ? "0" : bono.value;

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

  if (
    !casinoValue ||
    !nombreValue ||
    !categoriaValue ||
    !sorteoValue ||
    !bonoValue
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      text: "Completa la información para poder enviar.",
    });
    return;
  }

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombreValue,
    Casino: casinoValue,
    Categoria: categoriaValue,
    Sorteo: sorteoValue,
    Bono: bonoValue,
    Promocion: promocion,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";

  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));

  if (typeof GetRegistroDia === "function") GetRegistroDia();

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      nombre.value = "";
      casino.value = "";
      categoria.value = "";
      sorteo.value = "";
      bono.value = "";
      loader.style.display = "none";
      btn_validate_premio.style.display = "flex";
      btn_enviar_form.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envio exitoso",
        text: "La información se envió de manera correcta",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envió",
        text: "Ha Ocurrido un error en el envió, Comunícate con el administrador.",
      });
    });
}

btn_send_secundario.addEventListener("click", () => {
  handleSubmitSecu();
});

document.getElementById("categoria-modal").addEventListener("change", () => {
  if (document.getElementById("categoria-modal").value == "ADICIONAL") {
    document.getElementById("bono-modal").style.display = "none";
    document.getElementById("sorteo-modal").style.display = "none";
  } else {
    document.getElementById("bono-modal").style.display = "flex";
    document.getElementById("sorteo-modal").style.display = "flex";
  }
});

function handleSubmitSecu() {
  let casinoS = document.getElementById("casino-modal");
  let categoriaS = document.getElementById("categoria-modal");
  let bonoS = document.getElementById("bono-modal");
  let nombreS = document.getElementById("nombre-modal");
  let horaS = document.getElementById("hora-modal");
  let fechaS = document.getElementById("fecha-modal");
  let sorteoS = document.getElementById("sorteo-modal");

  let casinoV = casinoS.value;
  let categoriaV = categoriaS.value;
  let bonoV = categoriaS.value == "ADICIONAL" ? "0" : bonoS.value;
  let nombreV = nombreS.value;
  let horaV = horaS.value;
  let fechaV = fechaS.value;
  let sorteoV = categoriaS.value == "ADICIONAL" ? "0" : sorteoS.value;

  if (
    !casinoV ||
    !categoriaV ||
    !bonoV ||
    !nombreV ||
    !horaV ||
    !fechaV ||
    !sorteoV
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      text: "Completa la información para poder enviar.",
    });
    return;
  }

  let data = {
    tipo: "dinamica",
    Hora: horaV,
    Fecha: fechaV,
    Nombre: nombreV,
    Casino: casinoV,
    Categoria: categoriaV,
    Sorteo: sorteoV,
    Bono: bonoV,
    Promocion: promocion,
    Usuario: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      horaS.value = "";
      fechaS.value = "";
      nombreS.value = "";
      casinoS.value = "";
      categoriaS.value = "";
      bonoS.value = "";
      sorteoS.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
        text: "La información se envió correctamente.",
      });
    })
    .catch((error) => {
      console.warn(error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        text: "La información no se envió, contacta el área de comunicaciones.",
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleObservacion();
});

function handleObservacion() {
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion"
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

  if (casino_observacion.value == "" || descripcion_observacion.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      text: "Completa la información para poder enviar.",
    });
    return;
  }

  let data = {
    tipo: "observacion",
    Hora: hora,
    Fecha: fecha,
    Casino: casino_observacion.value,
    Observacion: descripcion_observacion.value,
    Usuario: user.Nombre,
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
        title: "Envió Correcto",
        text: "Observación enviada correctamente.",
      });
    })
    .catch((error) => {
      console.warn(error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        text: "La Observación no se envió, si el error persiste contacta el área de comunicaciones.",
      });
    });
}

GetRegistroDia();

function GetRegistroDia() {
  const content_registro_dia = document.getElementById("result_dia_mr");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();
  const loader = document.getElementById("loader");

  const filtrados = valCasino
    ? registros.filter((item) => item.Casino)
    : registros;

  if (registros.length === 0) {
    content_registro_dia.innerHTML = `<p class="color-gray">No hay registros ${
      valCasino ? "para este casino." : "aún."
    }</p>`;
    info_result_dia.innerHTML = "";
    return;
  }

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
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${filtrados
            .map((r, i) => {
              return `
              <tr>
                <td>${i + 1}</td>
                <td>${r.Casino}</td>
                <td>${r.Categoria}</td>
                <td>${r.Nombre}</td>
                <td>${r.Bono}</td>
                <td>${r.Fecha} ${r.Hora}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    `;
}

document.getElementById("expandir").addEventListener("click", () => {
  document
    .getElementById("content_modal_mrbonus")
    .classList.toggle("item_full_screen");
});

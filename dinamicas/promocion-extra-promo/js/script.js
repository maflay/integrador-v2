window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const loader = document.getElementById("loader");
const promocion = "Extra Promo";
const url =
  "https://script.google.com/macros/s/AKfycbzOSzHrxbpBCqrgZRmi_Nsk7YoHFW9nKqiRsuAc1aRsO2dUWUZ_5VxEa_HpSY0I1p7Y6w/exec";
const IN_FLIGHT = new Set();
const LS_KEY = "registrosExtraPromo";
const FECHA_KEY = "fechaExtraPromo";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

const btn_opciones = document.getElementById("btn_opciones");
const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia"
);

const user = inforUser("user");

// datos envio
const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const nombre = document.getElementById("nombre");
const valor = document.getElementById("valor");
const motivo = document.getElementById("motivo");
const bono = document.getElementById("bono");
const autorizo = document.getElementById("autorizo");
const btn_send = document.getElementById("btn_send");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");

// botones modal
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_registro_dia = document.getElementById("btn_registro_dia");
const btn_informacion = document.getElementById("btn_informacion");
const close_modal_icon = document.getElementById("close_modal_icon");

// vista modal
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion"
);
const view_informacion = document.getElementById("view_informacion");
const view_registro_dia = document.getElementById("view_registro_dia");

document.getElementById("expandir").addEventListener("click", () => {
  document
    .getElementById("content_modal_extrapromo")
    .classList.toggle("item_full_screen");
});

btn_opciones.addEventListener("click", () => {
  document.getElementById("modal_opciones_extrapromo").style.display = "flex";
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_informacion.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_registro_dia.style.display = "none";
  view_informacion.style.display = "none";
});

close_modal_icon.addEventListener("click", () => {
  document.getElementById("modal_opciones_extrapromo").style.display = "none";
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_informacion.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");

  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_registro_dia.style.display = "none";
  view_informacion.style.display = "none";
});

btn_envio_secundario.addEventListener("click", () => {
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_informacion.classList.remove("select_menu");

  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_registro_dia.style.display = "none";
  view_informacion.style.display = "none";
});

btn_observacion.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_informacion.classList.remove("select_menu");
  view_informacion.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_registro_dia.style.display = "none";
});

btn_informacion.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_informacion.classList.add("select_menu");
  view_informacion.style.display = "flex";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_registro_dia.addEventListener("click", () => {
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");
  btn_informacion.classList.remove("select_menu");
  view_informacion.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_registro_dia.style.display = "flex";
});

btn_send.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  let casinoV = casino.value;
  let categoriaV = categoria.value;
  let nombreV = nombre.value;
  let valorV = valor.value;
  let motivoV = motivo.value;
  let bonoV = bono.value;
  let autorizoV = autorizo.checked;

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

  if (!casinoV || !categoriaV || !nombreV || !valorV || !motivoV || !bonoV) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombreV,
    Casino: casinoV,
    Categoria: categoriaV,
    Motivo: motivoV,
    Valor: valorV,
    Bono: bonoV,
    Promocion: promocion,
    Autorizado: autorizoV == true ? "Si" : "No",
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
      loader.style.display = "none";
      casino.value = "";
      categoria.value = "";
      nombre.value = "";
      valor.value = "";
      motivo.value = "";
      bono.value = "";
      autorizo.checked = false;
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
        text: "La información se envió de manera correcta",
      });
    })
    .catch((error) => {
      console.warn(error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
        text: "Error en el envio, contacta al area de Mercadeo / Comunicaciones",
      });
    });
}

btn_send_secundario.addEventListener("click", () => {
  handleSecondSubmit();
});

function handleSecondSubmit() {
  let casinoS = document.getElementById("casino-modal");
  let categoriaS = document.getElementById("categoria-modal");
  let horaS = document.getElementById("hora-modal");
  let fechaS = document.getElementById("fecha-modal");
  let nombreS = document.getElementById("nombre-modal");
  let bonoS = document.getElementById("bono-modal");
  let valorS = document.getElementById("valor-modal");
  let motivoS = document.getElementById("motivo-modal");
  let autorizoS = document.getElementById("autorizado-modal");

  if (
    casinoS.value == "" ||
    categoriaS.value == "" ||
    horaS.value == "" ||
    fechaS == "" ||
    nombreS.value == "" ||
    bonoS.value == "" ||
    valorS.value == "" ||
    motivoS.value == "" ||
    autorizoS.value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "dinamica",
    Hora: horaS.value,
    Fecha: fechaS.value,
    Nombre: nombreS.value,
    Casino: casinoS.value,
    Categoria: categoriaS.value,
    Motivo: motivoS.value,
    Valor: valorS.value,
    Bono: bonoS.value,
    Promocion: promocion,
    Autorizado: autorizoS.value,
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
      loader.style.display = "none";
      horaS.value = "";
      fechaS.value = "";
      nombreS.value = "";
      casinoS.value = "";
      categoriaS.value = "";
      motivoS.value = "";
      valorS.value = "";
      bonoS.value = "";
      autorizoS.value = "";
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
      });
    })
    .catch((error) => {
      console.warn(error);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        text: "Error contácta al area de Mercadeo / Comunicaciones",
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleObservacion();
});

function handleObservacion() {
  let casinoO = document.getElementById("casino_observacion");
  let descripcionO = document.getElementById("descripcion_observacion");

  if (casinoO.value == "" || descripcionO.value == "") {
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
    tipo: "observacion",
    Hora: hora,
    Fecha: fecha,
    Casino: casinoO.value,
    Observacion: descripcionO.value,
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
      casinoO.value = "";
      descripcionO.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      console.warn(error);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        text: "Error contácta al area de Mercadeo / Comunicaciones",
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

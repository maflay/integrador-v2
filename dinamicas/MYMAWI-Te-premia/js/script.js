window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

const toggleBtn = document.getElementById("toggleBtn");
const formBox = document.getElementById("formBox");
const logo = document.getElementById("prueba");
const btnEnviar = document.getElementById("enviarForm");

const user = inforUser();

// toggleBtn.addEventListener("click", () => {
//   formBox.classList.toggle("hidden");

//   const oculto = formBox.classList.contains("hidden");
//   toggleBtn.textContent = oculto ? "Mostrar" : "Ocultar";

//   if (oculto) {
//     logo.classList.add("logo-centrado");
//   } else {
//     logo.classList.remove("logo-centrado");
//   }
// });

// btn de la modal
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");

// view modal

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

// abrir modal

const btn_opciones = document.getElementById("modal_opciones");
const btn_close_opciones = document.getElementById("close_modal_icon");

document.getElementById("expandir").addEventListener("click", () => {
  document
    .getElementById("content_modal_MTP")
    .classList.toggle("item_full_screen");
});

btn_opciones.addEventListener("click", () => {
  document.getElementById("modal_opciones_mtp").style.display = "flex";
  btn_envio_secundario.classList.add("select_menu");
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
});

btn_close_opciones.addEventListener("click", () => {
  document.getElementById("modal_opciones_mtp").style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_envio_secundario.addEventListener("click", () => {
  view_envio_secundario.style.display = "block";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_observacion.addEventListener("click", () => {
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";

  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_tabla_premios.addEventListener("click", () => {
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";

  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
});

btn_registro_dia.addEventListener("click", () => {
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";

  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");

  mostrarRegistros();
});

function mostrarPremio(categoria) {
  const valganado = document.getElementById("valganado");
  const categoriaEl = document.getElementById("categoria");
  const cate = categoriaEl.value.trim().toUpperCase();
  const casino = document.getElementById("casino");

  let premios = {};
  if (
    casino.value == "A43" ||
    casino.value == "MP53" ||
    casino.value == "A53"
  ) {
    premios = {
      GENIUS: 150000,
      TITANIO: 130000,
      LEGENDARIO: 120000,
      GOLD: 100000,
      SILVER: 90000,
      BRONCE: 80000,
      SUPERIORALADDIN: 100000,
      SUPERIORMARCOPOLO: 100000,
      ESTANDARALADDIN: 50000,
      ESTANDARMARCOPOLO: 80000,
    };
  } else if (
    casino.value == "A12-MESAS" ||
    casino.value == "MP15-MESAS" ||
    casino.value == "MP108-MESAS" ||
    casino.value == "A36-MESAS" ||
    casino.value == "A36" ||
    casino.value == "A781"
  ) {
    premios = {
      GENIUS: 150000,
      TITANIO: 130000,
      LEGENDARIO: 110000,
      GOLD: 90000,
      SILVER: 70000,
      BRONCE: 50000,
      SUPERIORALADDIN: 100000,
      SUPERIORMARCOPOLO: 100000,
      ESTANDARALADDIN: 80000,
      ESTANDARMARCOPOLO: 80000,
    };
  } else {
    premios = {
      GENIUS: 150000,
      TITANIO: 130000,
      LEGENDARIO: 110000,
      GOLD: 90000,
      SILVER: 70000,
      BRONCE: 50000,
      SUPERIORALADDIN: 100000,
      SUPERIORMARCOPOLO: 100000,
      ESTANDARALADDIN: 50000,
      ESTANDARMARCOPOLO: 50000,
    };
  }

  if (premios[categoria]) {
    Swal.fire({
      icon: "success",
      title: "Felicidades eres un ganador.",
      text: `Felicidades ganaste un premio de $${premios[
        categoria
      ].toLocaleString()} en Dinero Promocional.`,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
    });
    valganado.innerHTML = `<div style="text-align: center; font-size: 16px">Felicidades ganaste un premio de $${premios[
      categoria
    ].toLocaleString()} en Dinero Promocional, con categoria ${cate}</div>`;

    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

categoria.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    document.getElementById("validatepremio").style.display = "none";
    document.getElementById("send_adicional").style.display = "flex";
  } else {
    document.getElementById("validatepremio").style.display = "flex";
    document.getElementById("send_adicional").style.display = "none";
  }
});

function validatePremio() {
  const casinoEl = document.getElementById("casino");
  const categoriaEl = document.getElementById("categoria");
  const nombreEl = document.getElementById("nombre");
  const cedulaEl = document.getElementById("cedula");
  const casino = casinoEl.value.trim();
  const categoria = categoriaEl.value.trim().toUpperCase();
  const nombre = nombreEl.value.trim();
  const cedula = cedulaEl.value.trim();
  const loader = document.getElementById("loader");
  const valBono = document.getElementById("bono");

  // Validacion
  if (!casino || !categoria || !nombre) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos antes de continuar.",
      confirmButtonColor: "#efb810",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
    mostrarPremio(categoria);
    valBono.innerHTML =
      '<div style="display: flex;gap: 30px;"><div class="content-btn-enviar"><button onclick="reiniciar()" class="btn-dados">Reiniciar</button></div><div class="content-btn-enviar"><input class="form-control" id="valBono" type="text" placeholder="# bono." /></div><div class="content-btn-enviar"><button onclick="HandleSend()" id="enviarForm" class="btn-dados">Enviar</button></div></div>';
  }, 2000);
}

function reiniciar() {
  const casinoEl = document.getElementById("casino");
  const categoriaEl = document.getElementById("categoria");
  const nombreEl = document.getElementById("nombre");
  const cedulaEl = document.getElementById("cedula");
  const valBonoEl = document.getElementById("valBono");
  const valBonoF = document.getElementById("bono");
  const valganado = document.getElementById("valganado");

  casinoEl.value = "";
  categoriaEl.value = "";
  nombreEl.value = "";
  cedulaEl.value = "";
  valBonoEl.value = "";
  valBonoF.innerHTML = "";
  valganado.innerHTML = ``;
}

function HandleSend() {
  const casinoEl = document.getElementById("casino");
  const categoriaEl = document.getElementById("categoria");
  const nombreEl = document.getElementById("nombre");
  const cedulaEl = document.getElementById("cedula");
  const loader = document.getElementById("loader");
  const valBonoEl = !document.getElementById("valBono")
    ? "0"
    : document.getElementById("valBono");
  const valBonoF = document.getElementById("bono");
  const valganado = document.getElementById("valganado");

  const casino = casinoEl.value.trim();
  const categoria =
    categoriaEl.value.trim().toUpperCase() == "SUPERIORMARCOPOLO"
      ? "SUPERIOR"
      : categoriaEl.value.trim().toUpperCase() == "ESTANDARMARCOPOLO"
      ? "ESTANDAR"
      : categoriaEl.value.trim().toUpperCase() == "SUPERIORALADDIN"
      ? "SUPERIOR"
      : categoriaEl.value.trim().toUpperCase() == "ESTANDARALADDIN"
      ? "ESTANDAR"
      : categoriaEl.value.trim().toUpperCase();
  const nombre = nombreEl.value.trim();
  const cedula = cedulaEl.value.trim();
  const valBono = valBonoEl == "0" ? "0" : valBonoEl.value.trim();

  const hoy = new Date().toDateString(); // "Mon Jul 07 2025"
  const ultimaFecha = localStorage.getItem("fecha");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registros", JSON.stringify([]));
    localStorage.setItem("fecha", hoy);
  }

  // Validacion
  if (!casino || !categoria || !nombre) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos antes de continuar.",
      confirmButtonColor: "#efb810",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  if (valBono == "") {
    Swal.fire({
      icon: "warning",
      title: "Falta # de Bono",
      text: "Por favor, digitá el # de Bono.",
      confirmButtonColor: "#efb810",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  const promocion = "MYMAWI Te premia.";

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

  loader.style.display = "flex";

  const url =
    "https://script.google.com/macros/s/AKfycby8YNp-O9bV3MUgnBXCUOlLsCAIirGPH992ARPl3QI6JPhEoGUKBgDi9UK-gwdCr3gOfQ/exec";

  const data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre,
    valor_4: cedula,
    valor_5: casino,
    valor_6: categoria,
    valor_7: promocion,
    valor_8: categoria.value == "ADICIONAL" ? "0" : valBono,
    valor_9: user.Nombre,
  };

  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.push(data);
  localStorage.setItem("registros", JSON.stringify(registros));

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      document.getElementById("validatepremio").style.display = "flex";
      document.getElementById("send_adicional").style.display = "none";
      casinoEl.value = "";
      categoriaEl.value = "";
      nombreEl.value = "";
      cedulaEl.value = "";
      valBonoEl.value = "";
      valBonoF.innerHTML = "";
      valganado.innerHTML = "";

      // Mostrar mensaje segun categoria
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Exitoso.",
          text: `El envio de la informacion fue exitoso.`,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
      }, 2000);
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la informacion. Intenta nuevamente.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    });
}

document.getElementById("btn_send_secundario").addEventListener("click", () => {
  HandleSecondSubmit();
});

function HandleSecondSubmit() {
  const casinoEl = document.getElementById("casino-modal").value;
  const categoriaEl = document.getElementById("categoria-modal").value;
  const nombreEl = document.getElementById("nombre-modal").value;
  const cedulaEl = document.getElementById("cedula-modal").value;
  const horaEl = document.getElementById("hora-modal").value;
  const fechaEl = document.getElementById("fecha-modal").value;
  const promocionEl = "MYMAWI Te premia.";
  const bonoEl = document.getElementById("bono-modal").value;
  const loader = document.getElementById("loader");

  const casino = document.getElementById("casino-modal");
  const categoria = document.getElementById("categoria-modal");
  const cedula = document.getElementById("cedula-modal");
  const nombre = document.getElementById("nombre-modal");
  const hora = document.getElementById("hora-modal");
  const fecha = document.getElementById("fecha-modal");
  const bono = document.getElementById("bono-modal");

  if (
    casinoEl == "" ||
    categoriaEl == "" ||
    nombreEl == "" ||
    horaEl == "" ||
    fechaEl == "" ||
    bonoEl == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Alerta",
      text: "Debe enviar información.",
      confirmButtonColor: "#224fa1",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  }

  loader.style.display = "flex";

  const url =
    "https://script.google.com/macros/s/AKfycby8YNp-O9bV3MUgnBXCUOlLsCAIirGPH992ARPl3QI6JPhEoGUKBgDi9UK-gwdCr3gOfQ/exec";

  const data = {
    tipo: "envio_1",
    valor_1: horaEl,
    valor_2: fechaEl,
    valor_3: nombreEl,
    valor_4: cedulaEl,
    valor_5: casinoEl,
    valor_6:
      categoriaEl == "SUPERIORMARCOPOLO"
        ? "SUPERIOR"
        : categoriaEl == "ESTANDARMARCOPOLO"
        ? "ESTANDAR"
        : categoriaEl == "SUPERIORALADDIN"
        ? "SUPERIOR"
        : categoriaEl == "ESTANDARALADDIN"
        ? "ESTANDAR"
        : categoriaEl,
    valor_7: promocionEl,
    valor_8: bonoEl,
    valor_9: user.Nombre,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      casino.value = "";
      categoria.value = "";
      cedula.value = "";
      nombre.value = "";
      hora.value = "";
      fecha.value = "";
      bono.value = "";

      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envio Secundario Exitoso.",
          text: `El envio de la informacion fue exitoso.`,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn btn-danger",
          },
        });
        // document.getElementById("datos-modal").style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la informacion. Intenta nuevamente.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn btn-danger",
        },
      });
    });
}

document
  .getElementById("btn_envia_observacion")
  .addEventListener("click", () => {
    handledObservacion();
  });

function handledObservacion() {
  let casino = document.getElementById("casino_observacion");
  let descripcion = document.getElementById("descripcion_observacion");
  const loader = document.getElementById("loader");

  const url =
    "https://script.google.com/macros/s/AKfycby8YNp-O9bV3MUgnBXCUOlLsCAIirGPH992ARPl3QI6JPhEoGUKBgDi9UK-gwdCr3gOfQ/exec";

  if (casino.value == "" || descripcion.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Antes de enviar",
      html: "Completa la información antes de enviar",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
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
    valor_3: casino.value,
    valor_4: descripcion.value,
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
      casino.value = "";
      descripcion.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Correcto",
        html: "La información se envio de manera correcta",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
        },
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        html: "Ha ocurrido un error, inténtalo nuevamente",
      });
    });
}

function abrirModal() {
  // document.getElementById("datos-modal").style.display = "flex";
  document.getElementById("modal_opciones_mtp").style.display = "flex";
}

function cerrarModal() {
  // document.getElementById("datos-modal").style.display = "none";
  document.getElementById("modal_opciones_mtp").style.display = "none";
}

function abrirModal2() {
  const valCasino = document.getElementById("casino").value;

  if (valCasino == "") {
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      text: "Seleccione un casino.",
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn btn-danger",
      },
    });
    return;
  } else {
    mostrarRegistros();
    document.getElementById("modal-ultimos-registros").style.display = "flex";
  }
}

function cerrarModal2() {
  document.getElementById("modal-ultimos-registros").style.display = "none";
}

function mostrarRegistros() {
  const ultimosRegistros = document.getElementById("ultimos-registros");
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const casinoNumero = document.getElementById("casino-numero");
  const valInfo = document.getElementById("Info");
  const valCasino = document.getElementById("casino").value;
  const filtrados = valCasino
    ? registros.filter((item) => item.valor_5)
    : registros;
  casinoNumero.innerHTML = valCasino;

  if (filtrados.length === 0) {
    ultimosRegistros.innerHTML = `<p class="color-gray">No hay registros para este casino.</p>`;
    valInfo.innerHTML = ``;
  } else {
    valInfo.innerHTML = `<small class="color-gray">* Estos registros son temporales (se reinicia a las 00:00), por favor tener en
                          cuenta.</small>`;
    ultimosRegistros.innerHTML = `
  <div class="table-result">
    <table class="styled-table">
      <thead>
        <tr>
          <th># Registro</th>
          <th>Casino</th>
          <th>Categoria</th>
          <th>Nombre</th>
          <th>Bono</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        ${filtrados
          .reverse()
          .map(
            (registro, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${registro.valor_5}</td>
                <td>${registro.valor_6}</td>
                <td>${registro.valor_3}</td>
                <td>${registro.valor_8}</td>
                <td>${registro.valor_2} ${registro.valor_1}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;
  }
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fecha");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registros", JSON.stringify([]));
    localStorage.setItem("fecha", hoy);
  }
}
verificarResetRegistro();

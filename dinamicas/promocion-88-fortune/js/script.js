window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const user = inforUser();

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const loader = document.getElementById("loader");
const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const IN_FLIGHT = new Set();
const LS_KEY = "registros88fortune";
const FECHA_KEY = "fecha88fortune";
const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}
const promocion = "88 Fortune";
const url =
  "https://script.google.com/macros/s/AKfycbx_eEJj86mtg44qwxoOdT7U_5q-Yc6E-cqwc9HPu7N2Iu5XCTxLUV75DKCQtnrgYpF7FA/exec";

const btn_validar = document.getElementById("btn_validar");
const btn_reset = document.getElementById("btn_reset");
const btn_enviar = document.getElementById("btn_enviar");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");

// select
const ficha_1 = document.getElementById("ficha_1");
const ficha_2 = document.getElementById("ficha_2");
const ficha_3 = document.getElementById("ficha_3");

// imgs
const seleccion_1 = document.getElementById("seleccion_1");
const seleccion_2 = document.getElementById("seleccion_2");
const seleccion_3 = document.getElementById("seleccion_3");

casino.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    return;
  }

  if (casino.value != "" && categoria.value != "") {
    ficha_1.classList.remove("item_disable");
  } else {
    ficha_1.classList.add("item_disable");
  }
});

categoria.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    document.querySelector(".board_88").classList.add("item_disable");
    ficha_1.classList.add("item_disable");
    return;
  } else {
    document.querySelector(".board_88").classList.remove("item_disable");
  }

  if (casino.value != "" && categoria.value != "") {
    ficha_1.classList.remove("item_disable");
  } else {
    ficha_1.classList.add("item_disable");
  }
});

ficha_1.addEventListener("change", () => {
  if (casino.value == "" || categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      text: "Seleccione un Casino o Categoría Valida",
    });
    ficha_1.value = "";
    return;
  }

  if (ficha_1.value == "") {
    seleccion_1.src =
      "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
  } else if (ficha_1.value == "aguila") {
    seleccion_1.src =
      "/dinamicas/promocion-88-fortune/resources/aguila_ficha_1.png";
  } else if (ficha_1.value == "tortuga") {
    seleccion_1.src =
      "/dinamicas/promocion-88-fortune/resources/tortuga_ficha_1.png";
  } else if (ficha_1.value == "barco") {
    seleccion_1.src =
      "/dinamicas/promocion-88-fortune/resources/barco_ficha_1.png";
  } else if (ficha_1.value == "comodin") {
    let minNum = 1;
    let maxNum = 3;
    let comodinAleatorio =
      Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    seleccion_1.src = `/dinamicas/promocion-88-fortune/resources/comodin_ficha_${comodinAleatorio}.png`;
  }

  ficha_1.classList.add("item_disable");
  casino.classList.add("item_disable");
  categoria.classList.add("item_disable");
  ficha_2.classList.remove("item_disable");
});

ficha_2.addEventListener("change", () => {
  if (casino.value == "" || categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      text: "Seleccione un Casino o Categoría Valida",
    });
    ficha_2.value = "";
    return;
  }
  if (ficha_2.value == "") {
    seleccion_2.src =
      "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
  } else if (ficha_2.value == "aguila") {
    seleccion_2.src =
      "/dinamicas/promocion-88-fortune/resources/aguila_ficha_2.png";
  } else if (ficha_2.value == "tortuga") {
    seleccion_2.src =
      "/dinamicas/promocion-88-fortune/resources/tortuga_ficha_2.png";
  } else if (ficha_2.value == "barco") {
    seleccion_2.src =
      "/dinamicas/promocion-88-fortune/resources/barco_ficha_2.png";
  }
  ficha_2.classList.add("item_disable");
  ficha_3.classList.remove("item_disable");
});

ficha_3.addEventListener("change", () => {
  if (casino.value == "" || categoria.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      text: "Seleccione un Casino o Categoría Valida",
    });
    ficha_3.value = "";
    return;
  }
  if (ficha_3.value == "") {
    seleccion_3.src =
      "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
  } else if (ficha_3.value == "aguila") {
    seleccion_3.src =
      "/dinamicas/promocion-88-fortune/resources/aguila_ficha_3.png";
  } else if (ficha_3.value == "tortuga") {
    seleccion_3.src =
      "/dinamicas/promocion-88-fortune/resources/tortuga_ficha_3.png";
  } else if (ficha_3.value == "barco") {
    seleccion_3.src =
      "/dinamicas/promocion-88-fortune/resources/barco_ficha_3.png";
  }

  ficha_3.classList.add("item_disable");
});

const btn_validate = document.getElementById("btn_validate");

btn_validate.addEventListener("click", () => {
  validatePremio();
});

function obtenerPremio(casinoID, ficha1, ficha2, ficha3, categoria) {
  const id = casinoID.toUpperCase();
  const cat = categoria.toUpperCase();
  const fichas = [
    ficha1.toUpperCase(),
    ficha2.toUpperCase(),
    ficha3.toUpperCase(),
  ];

  // 1. Definición de los grupos de casinos según las tablas de las imágenes
  const gruposCasinos = {
    grupo1: [
      "A19",
      "A50",
      "A38",
      "A35",
      "A39",
      "A88",
      "A48",
      "A48-MESAS",
      "A49",
      "A100",
      "A12-MESAS",
    ],
    grupo2: [
      "A36",
      "A781",
      "A108-MESAS",
      "A127-MESAS",
      "A15-MESAS",
      "A36-MESAS",
    ],
    grupo3: ["A05", "A07", "A08", "A09", "A12", "A15", "A70", "A16"],
    grupo4: ["A43", "A53", "A108", "A127"],
  };

  // 2. Base de datos de premios por grupo
  const tablas = {
    grupo1: {
      ESTANDAR: {
        T_AGUILA: 150000,
        T_BARCO: 100000,
        T_TORTUGA: 90000,
        D_AGUILA: 70000,
        D_BARCO: 60000,
        D_TORTUGA: 50000,
      },
      SUPERIOR: {
        T_AGUILA: 250000,
        T_BARCO: 120000,
        T_TORTUGA: 110000,
        D_AGUILA: 90000,
        D_BARCO: 80000,
        D_TORTUGA: 70000,
      },
    },
    grupo2: {
      ESTANDAR: {
        T_AGUILA: 150000,
        T_BARCO: 120000,
        T_TORTUGA: 110000,
        D_AGUILA: 100000,
        D_BARCO: 90000,
        D_TORTUGA: 80000,
      },
      SUPERIOR: {
        T_AGUILA: 250000,
        T_BARCO: 140000,
        T_TORTUGA: 130000,
        D_AGUILA: 120000,
        D_BARCO: 110000,
        D_TORTUGA: 100000,
      },
    },
    grupo3: {
      BRONCE: {
        T_AGUILA: 150000,
        T_BARCO: 100000,
        T_TORTUGA: 90000,
        D_AGUILA: 70000,
        D_BARCO: 60000,
        D_TORTUGA: 50000,
      },
      SILVER: {
        T_AGUILA: 200000,
        T_BARCO: 110000,
        T_TORTUGA: 100000,
        D_AGUILA: 80000,
        D_BARCO: 70000,
        D_TORTUGA: 60000,
      },
      GOLD: {
        T_AGUILA: 250000,
        T_BARCO: 120000,
        T_TORTUGA: 110000,
        D_AGUILA: 90000,
        D_BARCO: 80000,
        D_TORTUGA: 70000,
      },
      LEGENDARIO: {
        T_AGUILA: 300000,
        T_BARCO: 130000,
        T_TORTUGA: 120000,
        D_AGUILA: 100000,
        D_BARCO: 90000,
        D_TORTUGA: 80000,
      },
      TITANIO: {
        T_AGUILA: 350000,
        T_BARCO: 140000,
        T_TORTUGA: 130000,
        D_AGUILA: 110000,
        D_BARCO: 100000,
        D_TORTUGA: 90000,
      },
      GENIUS: {
        T_AGUILA: 400000,
        T_BARCO: 150000,
        T_TORTUGA: 140000,
        D_AGUILA: 120000,
        D_BARCO: 110000,
        D_TORTUGA: 100000,
      },
    },

    grupo4: {
      BRONCE: {
        T_AGUILA: 150000,
        T_BARCO: 120000,
        T_TORTUGA: 110000,
        D_AGUILA: 100000,
        D_BARCO: 90000,
        D_TORTUGA: 80000,
      },
      SILVER: {
        T_AGUILA: 200000,
        T_BARCO: 130000,
        T_TORTUGA: 120000,
        D_AGUILA: 110000,
        D_BARCO: 100000,
        D_TORTUGA: 90000,
      },
      GOLD: {
        T_AGUILA: 250000,
        T_BARCO: 140000,
        T_TORTUGA: 130000,
        D_AGUILA: 120000,
        D_BARCO: 110000,
        D_TORTUGA: 100000,
      },
      LEGENDARIO: {
        T_AGUILA: 300000,
        T_BARCO: 150000,
        T_TORTUGA: 140000,
        D_AGUILA: 130000,
        D_BARCO: 120000,
        D_TORTUGA: 110000,
      },
      TITANIO: {
        T_AGUILA: 350000,
        T_BARCO: 160000,
        T_TORTUGA: 150000,
        D_AGUILA: 140000,
        D_BARCO: 130000,
        D_TORTUGA: 120000,
      },
      GENIUS: {
        T_AGUILA: 400000,
        T_BARCO: 170000,
        T_TORTUGA: 160000,
        D_AGUILA: 150000,
        D_BARCO: 140000,
        D_TORTUGA: 130000,
      },
    },
  };

  let grupoPertenece = Object.keys(gruposCasinos).find((key) =>
    gruposCasinos[key].includes(id),
  );
  if (!grupoPertenece || !tablas[grupoPertenece]) return "Casino no registrado";

  const premios = tablas[grupoPertenece][cat];
  if (!premios) return "Categoría no válida para este casino";

  const comodines = fichas.filter((f) => f === "COMODIN").length;

  const base = ["AGUILA", "BARCO", "TORTUGA"];

  let mejorPremio = 0;

  base.forEach((tipo) => {
    const cantidad = fichas.filter((f) => f === tipo).length + comodines;

    if (cantidad >= 3) {
      if (tipo === "AGUILA")
        mejorPremio = Math.max(mejorPremio, premios.T_AGUILA);
      if (tipo === "BARCO")
        mejorPremio = Math.max(mejorPremio, premios.T_BARCO);
      if (tipo === "TORTUGA")
        mejorPremio = Math.max(mejorPremio, premios.T_TORTUGA);
    }
  });

  // 🔥 2. Si ya ganó tripleta, salir
  if (mejorPremio > 0) return mejorPremio;

  // 🔥 3. Evaluar DOBLES con comodín
  base.forEach((tipo) => {
    const cantidad = fichas.filter((f) => f === tipo).length + comodines;

    if (cantidad >= 2) {
      if (tipo === "AGUILA")
        mejorPremio = Math.max(mejorPremio, premios.D_AGUILA);
      if (tipo === "BARCO")
        mejorPremio = Math.max(mejorPremio, premios.D_BARCO);
      if (tipo === "TORTUGA")
        mejorPremio = Math.max(mejorPremio, premios.D_TORTUGA);
    }
  });

  return mejorPremio;
}

function validatePremio() {
  let premioLocal = obtenerPremio(
    casino.value,
    ficha_1.value,
    ficha_2.value,
    ficha_3.value,
    categoria.value,
  );

  if (premioLocal == 0) {
    Swal.fire({
      html: `<div class="_alert_intentar">
      <img src="/dinamicas/promocion-88-fortune/resources/decepcion.png" alt="Aladdin" >
      <p>Combinación sin Premio, Inténtalo Nuevamente</p>
      </div>`,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        ficha_1.value = "";
        seleccion_1.src =
          "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
        ficha_1.classList.remove("item_disable");
        ficha_2.value = "";
        seleccion_2.src =
          "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
        ficha_2.classList.remove("item_disable");
        ficha_3.value = "";
        seleccion_3.src =
          "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
        ficha_3.classList.remove("item_disable");
      }
    });
    return;
  }

  confettiAl();
  let mensaje_win = ` Ganaste con Categoría ${categoria.value},
    Un Premio de ${formatoPesos_monto_efectivo.format(premioLocal)} en Dinero Promocional
    `;

  document.getElementById("_text_premio").innerHTML = mensaje_win;
  Swal.fire({
    html: `
    <div class="content_alert_ganador">
    <img src="/dinamicas/promocion-88-fortune/resources/ganador.png" alt="Aladdin" >
    <div>
   ${mensaje_win}
    </div>
    </div>
    `,
    customClass: {
      popup: "_alert_ganador",
      title: "mi-titulo",
    },
  });
}

btn_enviar.addEventListener("click", () => {
  handleSendFortune();
});

function handleSendFortune() {
  let nombre = document.getElementById("nombre");
  let _ficha_1;
  let _ficha_2;
  let _ficha_3;

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

  if (!nombre.value || !casino.value || !categoria.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  if (categoria.value != "ADICIONAL") {
    if (ficha_2.value == "" || ficha_1.value == "" || ficha_3.value == "") {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
      });
      return;
    }
  }

  data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: "",
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: categoria.value == "ADICIONAL" ? "0" : ficha_1.value,
    valBono: categoria.value == "ADICIONAL" ? "0" : "",
    ...(categoria.value == "ADICIONAL" ? { valor_8: "0" } : ""),
    valor_9: categoria.value == "ADICIONAL" ? "0" : ficha_2.value,
    valor_10: categoria.value == "ADICIONAL" ? "0" : ficha_3.value,
    valor_11: promocion,
    valor_12: user.Nombre,
  };

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));

  if (typeof GetResgistroDia === "function") GetResgistroDia();

  if (categoria.value == "ADICIONAL") {
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
        ficha_1.value = "";
        ficha_2.value = "";
        ficha_3.value = "";
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Envió Exitoso",
        });
      })
      .catch((err) => {
        console.log(err);
        loader.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "Error en el Envió",
        });
      });
    return;
  }

  setTimeout(() => {
    casino.value = "";
    categoria.value = "";
    nombre.value = "";
  }, 1500);

  setTimeout(() => {
    loader.style.display = "none";
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

btn_send_secundario.addEventListener("click", () => {
  handleSSubmitFortune();
});

function handleSSubmitFortune() {
  let casino_modal = document.getElementById("casino_modal");
  let categoria_modal = document.getElementById("categoria_modal");
  let hora_modal = document.getElementById("hora_modal");
  let fecha_modal = document.getElementById("fecha_modal");
  let nombre_modal = document.getElementById("nombre_modal");
  let bono_modal = document.getElementById("bono_modal");
  let ficha1_modal = document.getElementById("ficha1_modal");
  let ficha2_modal = document.getElementById("ficha2_modal");
  let ficha3_modal = document.getElementById("ficha3_modal");

  if (
    !casino_modal.value ||
    !categoria_modal.value ||
    !hora_modal.value ||
    !fecha_modal.value ||
    !nombre_modal.value ||
    !bono_modal.value
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
    valor_7: categoria_modal.value == "ADICIONAL" ? "0" : ficha1_modal.value,
    valor_8: categoria_modal.value == "ADICIONAL" ? "0" : bono_modal.value,
    valor_9: categoria_modal.value == "ADICIONAL" ? "0" : ficha2_modal.value,
    valor_10: categoria_modal.value == "ADICIONAL" ? "0" : ficha3_modal.value,
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
      ficha1_modal.value = "";
      ficha2_modal.value = "";
      ficha3_modal.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

btn_envia_observacion.addEventListener("click", () => {
  handleObsFortune();
});

function handleObsFortune() {
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

  if (!casino_observacion.value || !descripcion_observacion.value) {
    Swal.fire({
      icon: "warning",
      title: "Campo en Blanco",
    });
    return;
  }

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
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      loader.style.display = "none";
      getDataObs();
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

btn_reset.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  document.getElementById("_text_premio").innerHTML = "";
  document.getElementById("nombre").value = "";
  casino.value = "";
  casino.classList.remove("item_disable");
  categoria.value = "";
  categoria.classList.remove("item_disable");
  ficha_1.value = "";
  seleccion_1.src =
    "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
  ficha_2.value = "";
  seleccion_2.src =
    "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
  ficha_3.value = "";
  seleccion_3.src =
    "/dinamicas/promocion-88-fortune/resources/cuadro_blanco.png";
}

GetResgistroDia();
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
                    data-ficha1="${r.valor_7}"
                    data-ficha2="${r.valor_9}"
                    data-ficha3="${r.valor_10}"
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
    { casino, categoria, nombre, cedula, fecha, hora, ficha1, ficha2, ficha3 },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_10).trim() === String(ficha3).trim() &&
        String(r.valor_9).trim() === String(ficha2).trim() &&
        String(r.valor_7).trim() === String(ficha1).trim() &&
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
      ficha1 = "",
      ficha2 = "",
      ficha3 = "",
    } = btn.dataset;

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_5: casino,
      valor_6: categoria,
      valor_7: ficha1,
      valor_8: valBonoregistr,
      valor_9: ficha2,
      valor_10: ficha3,
      valor_11: promocion,
      valor_12: user.Nombre,
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
          ficha1,
          ficha2,
          ficha3,
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

getDataObs();
function getDataObs() {
  const container = document.getElementById("result_observaciones_dinamica");
  container.innerHTML = "Cargando...";
  fetch(`${url}?hoja=observaciones`)
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = `
          <div class="table-result table-scrolld">
            <table class="styled-table">
              <thead>
                <tr>
                  <th># Registro</th>
                  <th>Usuario</th>
                  <th>Hora</th>
                  <th>Fecha</th>
                  <th>Observación</th>
                  <th>Casino</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
               ${data
                 .reverse()
                 .map((registro, i) => {
                   // Formateamos la hora aquí mismo
                   const horaFormateada = new Date(
                     registro.Hora,
                   ).toLocaleTimeString("es-CO", {
                     hour: "2-digit",
                     minute: "2-digit",
                   });

                   return `
            <tr>
              <td>${i + 1}</td>
              <td>${registro.Usuario}</td>
              <td>${horaFormateada}</td> 
              <td>${registro.Fecha.substring(0, 10)}</td>
              <td>${registro.Observacion}</td>
              <td>${registro.Casino}</td>
              ${registro.Estado == "" ? `<td class="pendi_obs">Pendiente</td>` : `<td class="corre_obs">Corregido</td>`}
              
            </tr>
          `;
                 })
                 .join("")}
              </tbody>
            </table>
          </div>
        `;
    });
}

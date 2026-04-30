window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const user = inforUser();
const IN_FLIGHT = new Set();
const LS_KEY = "registrosBoladorada";
const FECHA_KEY = "fechaBoladorada";
const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}
const promocion = "Bola Dorada";
const url =
  "https://script.google.com/macros/s/AKfycbxhWjd-SEwpaL3UXMGZLbqKs1HoGyeeQ55kyPLOxAtW-o2I95RzH4ImfAs70qMzyZZ3Pw/exec";

const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");
const nombre = document.getElementById("nombre");
const bono = document.getElementById("bono");
const numero = document.getElementById("numero");

const btn_enviar = document.getElementById("btn_enviar");
const btn_validar = document.getElementById("btn_validar");

const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const btn_send_secundario = document.getElementById("btn_send_secundario");

let valorMulti = "0";

const grupos_x = {
  grupo_x2: [
    "19",
    "20",
    "21",
    "22",
    "1",
    "2",
    "25",
    "26",
    "27",
    "28",
    "5",
    "6",
    "7",
    "8",
    "31",
    "32",
    "15",
    "16",
    "35",
    "36",
    "11",
    "12",
  ],
  grupo_x3: ["3", "4", "13", "14", "33", "34"],
  grupo_x4: ["9", "10", "23", "24"],
  grupo_x5: ["29", "30"],
  grupo_x6: ["17", "18"],
  grupo_x10: ["0", "00"],
};

categoria.addEventListener("change", () => {
  if (categoria.value == "ADICIONAL") {
    btn_validar.style.display = "none";
    btn_enviar.style.display = "flex";
    numero.style.display = "none";
    bono.style.display = "none";
  } else {
    btn_validar.style.display = "flex";
    btn_enviar.style.display = "none";
    numero.style.display = "flex";
    bono.style.display = "flex";
  }
});

btn_validar.addEventListener("click", () => {
  validarPremio();
});

const premiosVal = {
  X2: {
    BRONCE: 80000,
    SILVER: 80000,
    ESTANDAR: 80000,
    SUPERIOR: 100000,
    GOLD: 100000,
    LEGENDARIO: 100000,
    TITANIO: 120000,
    GENIUS: 120000,
  },
  X3: {
    BRONCE: 120000,
    SILVER: 120000,
    ESTANDAR: 120000,
    SUPERIOR: 150000,
    GOLD: 150000,
    LEGENDARIO: 150000,
    TITANIO: 180000,
    GENIUS: 180000,
  },
  X4: {
    BRONCE: 160000,
    SILVER: 160000,
    ESTANDAR: 160000,
    SUPERIOR: 200000,
    GOLD: 200000,
    LEGENDARIO: 200000,
    TITANIO: 240000,
    GENIUS: 240000,
  },
  X5: {
    BRONCE: 200000,
    SILVER: 200000,
    ESTANDAR: 200000,
    SUPERIOR: 250000,
    GOLD: 250000,
    LEGENDARIO: 250000,
    TITANIO: 300000,
    GENIUS: 300000,
  },
  X6: {
    BRONCE: 240000,
    SILVER: 240000,
    ESTANDAR: 240000,
    SUPERIOR: 300000,
    GOLD: 300000,
    LEGENDARIO: 300000,
    TITANIO: 360000,
    GENIUS: 360000,
  },
  X10: {
    BRONCE: 400000,
    SILVER: 400000,
    ESTANDAR: 400000,
    SUPERIOR: 500000,
    GOLD: 500000,
    LEGENDARIO: 500000,
    TITANIO: 600000,
    GENIUS: 600000,
  },
};

function validarPremio() {
  if (!casino.value || !categoria.value || !nombre.value || !numero.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  if (categoria.value != "ADICIONAL") {
    if (numero.value > 36) {
      Swal.fire({
        icon: "warning",
        title: "Número Invalido",
        text: "Digíta un Número valido",
      });
      return;
    }
  }

  let grupoPertenece = Object.keys(grupos_x).find((key) =>
    grupos_x[key].includes(numero.value),
  );

  let multi = grupoPertenece.split("_")[1].toUpperCase();
  let categoriaPremio = categoria.value;

  const valPremio = premiosVal[String(multi)][String(categoriaPremio)];

  valorMulti = multi;

  confettiAl();
  let mensaje_win = `Ganaste con Categoría ${categoria.value},
    Un Premio de ${formatoPesos_monto_efectivo.format(valPremio)} con un multiplicador de ${multi} en Dinero Promocional
    `;
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
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      btn_validar.style.display = "none";
      btn_enviar.style.display = "flex";
    }
  });
}

btn_enviar.addEventListener("click", () => {
  handleSendBDorada();
});

function handleSendBDorada() {
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
  if (!casino.value || !categoria.value || !nombre.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  if (categoria.value != "ADICIONAL") {
    if (bono.value == "") {
      Swal.fire({
        icon: "warning",
        title: "Digíta un Número de Bono",
      });
      return;
    }
  }

  let numeroRul = numero.value == "00" ? "38" : numero.value;

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: "",
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: categoria.value == "ADICIONAL" ? "0" : valorMulti,
    valor_8: categoria.value == "ADICIONAL" ? "0" : bono.value,
    valor_9: categoria.value == "ADICIONAL" ? "0" : numeroRul,
    valor_10: promocion,
    valor_11: user.Nombre,
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
      casino.value = "";
      categoria.value = "";
      nombre.value = "";
      bono.value = "";
      numero.value = "";
      loader.style.display = "none";
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

btn_envia_observacion.addEventListener("click", () => {
  handleSObsDorada();
});

function handleSObsDorada() {
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
      title: "Campos en  Blancos",
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
      loader.style.display = "none";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      getDataObs();
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

GetRegistroDia();

function GetRegistroDia() {
  const content_registro_dia = document.getElementById("result_dia_acumula");
  const info_result_dia = document.getElementById("Info_result_dia");
  const registros = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const valCasino = (document.getElementById("casino")?.value || "").trim();

  const filtrados = valCasino
    ? registros.filter((item) => item.valor_5)
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
                <td>${r.valor_5}</td>
                <td>${r.valor_6}</td>
                <td>${r.valor_3}</td>
                <td>${r.valor_8}</td>
                <td>${r.valor_2} ${r.valor_1}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    `;
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
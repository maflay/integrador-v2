window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const user = inforUser();
const url_cp =
  "https://script.google.com/macros/s/AKfycbxMFBLiegyd-MJtkpkgDlL4gzaLUCEfbO9sHzu4oAXz4yF9B3WcPjlpren64dZX07HO/exec";
const url_golazo =
  "https://script.google.com/macros/s/AKfycbyXg7q_m12113ihIfVn6VOx_nVXQK5YwkvMU_rvQ5AiyM-MVchfRbfGW2WaZkPKethcWg/exec";
const equipo_local = document.getElementById("equipo_local");
const equipo_visitante = document.getElementById("equipo_visitante");
const _img_equipo_local_ = document.getElementById("_img_equipo_local_");
const _img_equipo_visitante_ = document.getElementById(
  "_img_equipo_visitante_",
);
const _equipo_local_ = document.getElementById("_equipo_local_");
const _equipo_visitante_ = document.getElementById("_equipo_visitante_");
const _modal_cosas_pasan_ = document.getElementById("_modal_cosas_pasan_");
const btn_validar_marcador = document.getElementById("btn_validar_marcador");
const _content_table_cp_ = document.getElementById("_content_table_cp_");
const btn_envio_que_paso = document.getElementById("btn_envio_que_paso");
const _close_cp_ = document.getElementById("_close_cp_");
const nombre_cp = document.getElementById("nombre_cp");
const accion_cp = document.getElementById("accion_cp");
const casino_cp = document.getElementById("casino_cp");
const categoria_cp = document.getElementById("categoria_cp");
const loader = document.getElementById("loader");
const nombre_golazo = document.getElementById("nombre_golazo");
const casino_golazo = document.getElementById("casino_golazo");
const categoria_golazo = document.getElementById("categoria_golazo");
const bono_golazo = document.getElementById("bono_golazo");
const btn_enviar_golazo = document.getElementById("btn_enviar_golazo");
const btn_update_score_golazo = document.getElementById(
  "btn_update_score_golazo",
);
const content_acerto_cp = document.getElementById("content_acerto_cp");
const acerto_cp = document.getElementById("acerto_cp");
const _main_view_ = document.getElementById("_main_view_");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const _btn_send_result_ = document.getElementById("_btn_send_result_");

let scoreLocalFinal;
let scoreVisiFinal;

const FECHA_KEY = "fecha_millonario_cosas";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(FECHA_KEY, hoy);
}

itemsAdmin();
function itemsAdmin() {
  let items_admin = document.querySelectorAll(".admin_promo_item");

  console.log(user.Nivel);
  if (user.Nivel == 1 || user.Nivel == 2) {
    items_admin.forEach((item) => {
      item.style.display = "flex";
    });
  }
}

const paises = {
  ca: "Canadá",
  mx: "México",
  us: "Estados Unidos",

  ar: "Argentina",
  br: "Brasil",
  co: "Colombia",
  ec: "Ecuador",
  py: "Paraguay",
  uy: "Uruguay",

  de: "Alemania",
  at: "Austria",
  be: "Bélgica",
  ba: "Bosnia y Herzegovina",
  hr: "Croacia",
  cz: "Chequia",
  "gb-eng": "Inglaterra",
  fr: "Francia",
  nl: "Países Bajos",
  no: "Noruega",
  pt: "Portugal",
  "gb-sct": "Escocia",
  es: "España",
  se: "Suecia",
  ch: "Suiza",
  tr: "Turquía",

  au: "Australia",
  iq: "Irak",
  ir: "Irán",
  jp: "Japón",
  jo: "Jordania",
  kr: "Corea del Sur",
  qa: "Qatar",
  sa: "Arabia Saudita",
  uz: "Uzbekistán",

  dz: "Argelia",
  cv: "Cabo Verde",
  cd: "RD Congo",
  ci: "Costa de Marfil",
  eg: "Egipto",
  gh: "Ghana",
  ma: "Marruecos",
  sn: "Senegal",
  za: "Sudáfrica",
  tn: "Túnez",

  cw: "Curazao",
  ht: "Haití",
  pa: "Panamá",

  nz: "Nueva Zelanda",
};

_equipo_local_
  ? _equipo_local_.addEventListener("input", () => {
      if (_equipo_local_.value.length > 2) {
        _equipo_local_.value = _equipo_local_.value.slice(0, 2);
      }
    })
  : "";

_equipo_local_
  ? _equipo_local_.addEventListener("input", (e) => {
      const LIMITE = 2;

      if (e.target.value.length > LIMITE) {
        e.target.value = e.target.value.slice(0, LIMITE);
      }

      if (e.target.value !== "") {
        let scoreLocal = Number(e.target.value);
        localStorage.setItem("scoreLocal", scoreLocal);
      } else {
        localStorage.removeItem("scoreLocal");
      }
    })
  : "";

_equipo_visitante_
  ? _equipo_visitante_.addEventListener("input", () => {
      if (_equipo_visitante_.value.length > 2) {
        _equipo_visitante_.value = _equipo_visitante_.value.slice(0, 2);
      }
    })
  : "";

_equipo_visitante_
  ? _equipo_visitante_.addEventListener("input", (e) => {
      const LIMITE = 2;

      if (e.target.value.length > LIMITE) {
        e.target.value = e.target.value.slice(0, LIMITE);
      }

      if (e.target.value !== "") {
        let scoreVisi = Number(e.target.value);
        localStorage.setItem("scoreVisi", scoreVisi);
      } else {
        localStorage.removeItem("scoreVisi");
      }
    })
  : "";

let cp_data = "cp_data";

_main_view_ ? scorePresistencia() : "";
function scorePresistencia() {
  let teamL = localStorage.getItem("equipo_local");
  let teamV = localStorage.getItem("equipo_visitante");

  if (teamL) {
    equipo_local.value = teamL;
    _img_equipo_local_.src = `/eventos/resources/${equipo_local.value}.png`;
  }

  if (teamV) {
    equipo_visitante.value = teamV;
    _img_equipo_visitante_.src = `/eventos/resources/${equipo_visitante.value}.png`;
  }

  equipo_local
    ? equipo_local.addEventListener("change", () => {
        if (equipo_local.value) {
          _img_equipo_local_.src = `/eventos/resources/${equipo_local.value}.png`;
          localStorage.setItem(
            "equipo_local",
            document.getElementById("equipo_local").value,
          );
        } else {
          _img_equipo_local_.src = "/eventos/resources/bandera_adivina.png";
          localStorage.removeItem("equipo_local");
        }
      })
    : "";

  equipo_visitante
    ? equipo_visitante.addEventListener("change", () => {
        if (equipo_visitante.value) {
          _img_equipo_visitante_.src = `/eventos/resources/${equipo_visitante.value}.png`;
          localStorage.setItem(
            "equipo_visitante",
            document.getElementById("equipo_visitante").value,
          );
        } else {
          _img_equipo_visitante_.src = "/eventos/resources/bandera_adivina.png";
          localStorage.removeItem("equipo_visitante");
        }
      })
    : "";
}

const premiosCP = [
  {
    accion: "Acerto el marcador.",
    premio: "$ 150.000 Si no acierta $100.000",
    ganador: "",
    casino: "",
  },
  {
    accion: "Primer fuera de lugar.",
    premio: "$ 100.000",
    ganador: "",
    casino: "",
  },
  {
    accion: "Primer saque de banda.",
    premio: "$ 80.000",
    ganador: "",
    casino: "",
  },
  {
    accion: "Primera Amarilla.",
    premio: "$ 80.000",
    ganador: "",
    casino: "",
  },
  {
    accion: "Primer Gol .",
    premio: "$ 100.000",
    ganador: "",
    casino: "",
  },
];

_main_view_ ? chargeInfo() : "";
function chargeInfo() {
  const dataStorage = JSON.parse(localStorage.getItem(cp_data)) || premiosCP;
  let scoreLocal = localStorage.getItem("scoreLocal");
  let scoreVisi = localStorage.getItem("scoreVisi");

  if (scoreLocal) {
    _equipo_local_.value = scoreLocal;
  }

  if (scoreVisi) {
    _equipo_visitante_.value = scoreVisi;
  }

  let html = `
            <table class="styled-table-rally">
            <thead>
            <tr>
            <th>Acción</th>
            <th>Premio</th>
            <th>Ganador</th>
            <th>Casino</th>
            <button id="_btn_limpiar_tabla_" class="btn btn-danger _btn_limpiar_tabla_">Limpiar</button>
            </tr>
            </thead>
            <tbody>
            `;
  dataStorage.forEach((item) => {
    html += `
    <tr data-accion="${item.accion}" data-premio="${item.premio}">
      <td>${item.accion}</td>
      <td>${item.premio}</td>
      <td>
        ${
          item.ganador
            ? item.ganador
            : `<button class="_btn_envio_cp_ btn btn-primary">Enviar</button>`
        }
      </td>
      <td>
        ${item.casino || "<p>Sin registro</p>"}
      </td>
    </tr>
  `;
  });

  html += `</tbody></table>`;

  _content_table_cp_.innerHTML = html;
  const _btn_limpiar_tabla_ = document.getElementById("_btn_limpiar_tabla_");

  _btn_limpiar_tabla_.addEventListener("click", () => {
    Swal.fire({
      title: "Seguro de reiniciar?",
      text: "Se borrará todo en  pantalla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si Quiero!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Exito!",
          text: "Reinicio Exitoso.",
          icon: "success",
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            localStorage.removeItem("cp_data");
            localStorage.removeItem("equipo_local");
            localStorage.removeItem("equipo_visitante");
            localStorage.removeItem("scoreLocal");
            localStorage.removeItem("scoreVisi");
            location.reload();
            // chargeInfo();
            // equipo_local.value = "";
            // equipo_visitante.value = "";
            // _img_equipo_local_.src = "/eventos/resources/bandera_adivina.png";
            // _img_equipo_visitante_.src = "/eventos/resources/bandera_adivina.png";
            // _equipo_local_.value = "";
            // _equipo_visitante_.value = "";
          }
        });
      }
    });
  });

  _content_table_cp_.addEventListener("click", (event) => {
    if (event.target.classList.contains("_btn_envio_cp_")) {
      const fila = event.target.closest("tr");
      let validatScoreVal = "Acerto el marcador.";
      let premioApuntado = "";

      const datosData = {
        accion: fila.dataset.accion,
        premio: fila.dataset.premio,
      };

      const celdas = fila.querySelectorAll("td");
      const datosTexto = {
        accion: celdas[0].innerText,
        premio: celdas[1].innerText,
        ganador: celdas[2].innerText,
        casino: celdas[3].innerText,
      };

      let modalInfo = document.createElement("p");

      modalInfo.innerHTML = ``;
      _content_table_cp_.appendChild(modalInfo);

      // console.log("Datos desde el texto de la fila:", datosTexto);
      _modal_cosas_pasan_.style.display = "flex";
      accion_cp.value = datosTexto.accion;
      accion_cp.disabled = true;

      if (datosTexto.accion == validatScoreVal) {
        content_acerto_cp.style.display = "inline";
      } else {
        content_acerto_cp.style.display = "none";
      }

      btn_envio_que_paso.onclick = () => {
        const accion = celdas[0];
        const premio = celdas[1];
        const ganador = celdas[2];
        const casino = celdas[3];

        if (acerto_cp.value == 1) {
          premioApuntado = "100000";
        } else if (acerto_cp.value == 2) {
          premioApuntado = "50000";
        }

        // console.log(accion);
        // console.log(premio);
        // console.log(ganador);
        // console.log(casino);

        if (!nombre_cp.value || !casino_cp.value || !categoria_cp.value) {
          Swal.fire({
            icon: "warning",
            title: "Campos en Blanco",
          });
          return;
        }

        if (!equipo_local.value || !equipo_visitante.value) {
          Swal.fire({
            icon: "warning",
            title: "Selecciona los equipos",
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

        let soloNumeros = datosTexto.premio.replace(/\D/g, '');
        let numeroPremio = parseInt(soloNumeros, 10);

        let data_cp = {
          tipo: "dinamica",
          Hora: hora,
          Fecha: fecha,
          Nombre: nombre_cp.value,
          Casino: casino_cp.value,
          Categoria: categoria_cp.value,
          Accion: accion_cp.value,
          Premio:
            datosTexto.accion == validatScoreVal
              ? premioApuntado
              : numeroPremio,
          Promocion:
            datosTexto.accion == validatScoreVal
              ? "Marca Gol"
              : "Cosas que Pasan",
          Usuario: user.Nombre,
          Partido:
            paises[equipo_local.value] +
            " vs " +
            paises[equipo_visitante.value],
        };

        loader.style.display = "flex";

        fetch(url_cp, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data_cp),
        })
          .then((res) => res.text())
          .then(() => {
            // ganador.innerHTML = nombre_cp.value;
            // casino.innerHTML = casino_cp.value;
            const saved =
              JSON.parse(localStorage.getItem(cp_data)) || premiosCP;
            const item = saved.find((x) => x.accion === accion_cp.value);
            item.ganador = nombre_cp.value;
            item.casino = casino_cp.value;
            localStorage.setItem(cp_data, JSON.stringify(saved));
            chargeInfo();
            _modal_cosas_pasan_.style.display = "none";
            setTimeout(() => {
              loader.style.display = "none";
              nombre_cp.value = "";
              casino_cp.value = "";
              categoria_cp.value = "";
              Swal.fire({
                icon: "success",
                title: "Envió Exitoso",
              });
            }, 1000);
          })
          .catch((error) => {
            loader.style.display = "none";
            Swal.fire({
              icon: "error",
              title: "Error en el Envió",
            });
          });
      };
    }
  });

  _close_cp_.addEventListener("click", () => {
    _modal_cosas_pasan_.style.display = "none";
  });
}

_main_view_ ? getScorepartido() : "";
function getScorepartido() {
  fetch(`${url_golazo}?hoja=resultado`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        console.error("no tiene resultado");
        return;
      }

      let dataResul = data[0];

      if (dataResul.Local == "" && dataResul.Visitante == "") {
        btn_validar_marcador.style.display = "none";
      } else {
        btn_validar_marcador.style.display = "inline";
        scoreLocalFinal = dataResul.Local;
        scoreVisiFinal = dataResul.Visitante;
      }
    });
}

btn_validar_marcador
  ? btn_validar_marcador.addEventListener("click", () => {
      if (!_equipo_local_.value || !_equipo_visitante_.value) {
        Swal.fire({
          icon: "warning",
          title: "Marcador en Blanco",
        });
        return;
      }

      if (!equipo_local.value || !equipo_visitante.value) {
        Swal.fire({
          icon: "warning",
          title: "Selecciona equipos validos",
        });
        return;
      }

      if (
        scoreLocalFinal == _equipo_local_.value &&
        scoreVisiFinal == _equipo_visitante_.value
      ) {
        Swal.fire({
          customClass: "_content_alerta_",
          allowOutsideClick: false,
          html: `<div class="_content_card_golazo_">
              <h2>Marcador Acertado</h2>
              <p>Encuentro Final</p>
              <p><img src="/eventos/resources/${equipo_local.value}.png" > - <img src="/eventos/resources/${equipo_visitante.value}.png" ></p>
              <p>${paises[equipo_local.value]} - ${paises[equipo_visitante.value]}</p>
              <p>${scoreLocalFinal} - ${scoreVisiFinal}</p>
              <h2>Obtuviste un premio de $ 100.000</h2>
            </div>`,
        });
      } else {
        Swal.fire({
          customClass: "_content_alerta_",
          allowOutsideClick: false,
          html: `<div class="_content_card_golazo_">
              <h2>Marcador <span>No</span> acertado</h2>
              <p>Encuentro Final</p>
              <p><img src="/eventos/resources/${equipo_local.value}.png" > - <img src="/eventos/resources/${equipo_visitante.value}.png" ></p>
              <p>${paises[equipo_local.value]} - ${paises[equipo_visitante.value]}</p>
              <p>${scoreLocalFinal} - ${scoreVisiFinal}</p>
              <h2>Obtuviste un premio de $ 50.000</h2>
            </div>`,
        });
      }
      confettiAl();
    })
  : "";

btn_enviar_golazo
  ? btn_enviar_golazo.addEventListener("click", () => {
      handleInfoGolazo();
    })
  : "";

function handleInfoGolazo() {
  if (
    !nombre_golazo.value ||
    !casino_golazo.value ||
    !categoria_golazo.value ||
    !bono_golazo.value
  ) {
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

  let data_golazo = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre_golazo.value,
    Casino: casino_golazo.value,
    Categoria: categoria_golazo.value,
    Promocion: "Golazo Millonario",
    Usuario: user.Nombre,
    Partido:
      paises[equipo_local.value] + " vs " + paises[equipo_visitante.value],
    Marcador: _equipo_local_.value + " vs " + _equipo_visitante_.value,
    Bono: bono_golazo.value,
  };

  loader.style.display = "flex";
  fetch(`${url_golazo}?hoja=resultado`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data_golazo),
  })
    .then((res) => res.text())
    .then(() => {
      nombre_golazo.value = "";
      casino_golazo.value = "";
      categoria_golazo.value = "";
      bono_golazo.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envio Exitoso",
      });
    })
    .catch((err) => {
      console.error(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

btn_update_score_golazo
  ? btn_update_score_golazo.addEventListener("click", () => {
      UpdateScoreGolazo();
    })
  : "";

_btn_send_result_
  ? _btn_send_result_.addEventListener("click", () => {
      UpdateScoreGolazo();
    })
  : "";

function UpdateScoreGolazo() {
  let score_local_f = document.getElementById("score_local_f");
  let score_visi_f = document.getElementById("score_visi_f");

  let data = {
    tipo: "update_result",
    sheetName: "resultado",
    match: {
      Numero: "23321312",
    },
    updates: {
      Local: score_local_f.value,
      Visitante: score_visi_f.value,
    },
  };

  loader.style.display = "flex";

  fetch(`${url_golazo}`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      score_local_f.value = "";
      score_visi_f.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((err) => {
      console.error(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envio",
      });
    });
}

btn_envia_observacion
  ? btn_envia_observacion.addEventListener("click", () => {
      handleSendObs();
    })
  : "";

function handleSendObs() {
  let chose_promocion = document.getElementById("chose_promocion");
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );
  let sendPackage;

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
    !chose_promocion.value ||
    !casino_observacion.value ||
    !descripcion_observacion.value
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "observaciones",
    Hora: hora,
    Fecha: fecha,
    Casino: casino_observacion.value,
    Observacion: descripcion_observacion.value,
    Usuario: user.Nombre,
  };

  if (chose_promocion.value == "cosas") {
    sendPackage = url_cp;
  } else if (chose_promocion.value == "golazo") {
    sendPackage = url_golazo;
  }

  loader.style.display = "flex";

  fetch(`${sendPackage}`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      chose_promocion.value = "";
      casino_observacion.value = "";
      descripcion_observacion.value = "";
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Erroe en el Envió",
      });
    });
}

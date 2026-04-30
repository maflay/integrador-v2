window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// --------------------------------------------------------------------------

const btn_actualizar_score = document.getElementById("btn_actualizar_score");
const btn_actualizar_score_32_fase = document.getElementById(
  "btn_actualizar_score_32_fase",
);
const inputs_register = document.querySelectorAll("._input_register");

function buildPronosticosPayload() {
  const user = getCookie("user_quiniela"); // {Nombre, Numero}
  if (!user) throw new Error("No hay sesión");

  // toma TODOS los inputs type=number dentro del contenedor de la quiniela
  const container = document.getElementById("View_inputs_quiniela");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};
  inputs.forEach((inp) => {
    // guarda por id (ej: "mex_partido_1")
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  // return {
  //   tipo: "quiniela_resultado",
  //   Fecha: new Date().toLocaleDateString("es-CO", {
  //     timeZone: "America/Bogota",
  //   }),
  //   Hora: new Date().toLocaleTimeString("es-CO", {
  //     timeZone: "America/Bogota",
  //   }),
  //   Nombre: user.Nombre,
  //   Numero: user.Numero,
  //   ...pronosticos, // columnas dinámicas
  // };

  return {
    tipo: "update_result",
    sheetName: "quiniela_resultado",
    match: {
      Numero: user[0].Numero,
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayload32() {
  const user = getCookie("user_quiniela");
  if (!user) throw new Error("No hay sesión");

  const container = document.getElementById("_seccion_32_equipo_");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "quiniela_resultado",
    match: {
      Numero: user[0].Numero,
    },
    updates: {
      ...pronosticos,
    },
  };
}

const btn_cerrar_session = document.getElementById("btn_cerrar_session");
const fecha_match = document.getElementById("fecha_match");
const user_logeado = document.getElementById("user_logeado");

const loader = document.getElementById("loader");
const btn_start = document.getElementById("btn_iniciar");
const btn_register = document.getElementById("btn_register");
const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const View_iniciar_quiniela = document.getElementById("View_iniciar_quiniela");
const View_inputs_quiniela = document.getElementById("View_inputs_quiniela");
const url =
  "https://script.google.com/macros/s/AKfycbyonIixrGiF1sTtbkzWdjLiMWI28S_40QyFjSVy1bxXKB_Z3RLtr_ttjnGkwHyRUZlw/exec";
const _seccion_32_equipo_ = document.getElementById("_seccion_32_equipo_");
const _seccion_octavos_final_ = document.getElementById(
  "_seccion_octavos_final_",
);
const _seccion_cuartos_final_ = document.getElementById(
  "_seccion_cuartos_final_",
);
const _seccion_semifinal = document.getElementById("_seccion_semifinal");
const _seccion_tercer_lugar = document.getElementById("_seccion_tercer_lugar");
const _seccion_final_ = document.getElementById("_seccion_final_");

function setCookie(name, value, opts = {}) {
  const {
    hours = 4,
    path = "/",
    sameSite = "Lax", // recomendado
    secure = location.protocol === "https:", // true si estás en https
  } = opts;

  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  const encoded = encodeURIComponent(JSON.stringify(value));
  let cookie = `${name}=${encoded}; Expires=${expires}; Path=${path}; SameSite=${sameSite}`;
  if (secure) cookie += `; Secure`;
  document.cookie = cookie;
}

function getCookie(name) {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    const [k, ...rest] = part.split("=");
    if (k === name) {
      const val = rest.join("=");
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        return decodeURIComponent(val);
      }
    }
  }
  return null;
}

btn_cerrar_session.addEventListener("click", () => {
  Swal.fire({
    title: "Seguro de salir?",
    text: "Se olvidara el usuario y la contraseña",
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
        text: "Tu usuario has sido olvidado.",
        icon: "success",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          document.cookie = "user_quiniela=; max-age=0; path=/;";
          location.reload();
        }
      });
    }
  });
});

btn_start.addEventListener("click", () => {
  validateUser();
});

function validateUser() {
  if (!codigo.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  loader.style.display = "flex";

  fetch(`${url}?hoja=quiniela&numero=${codigo.value}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.length === 0 || data == []) {
        loader.style.display = "none";
        Swal.fire({
          icon: "warning",
          title: "El Usuario no exite",
          html: "Quieres registrar tu usuario",
        }).then((res) => {
          if (res.isConfirmed) {
            btn_start.style.display = "none";
            btn_register.style.display = "flex";
            btn_cerrar_session.style.display = "none";
            fecha_match.style.display = "none";
            inputs_register.forEach((input) => {
              input.style.display = "flex";
            });
          }
        });
      } else {
        View_iniciar_quiniela.style.display = "none";
        View_inputs_quiniela.style.display = "flex";
        _seccion_32_equipo_.style.display = "flex";
        _seccion_octavos_final_.style.display = "flex";
        _seccion_cuartos_final_.style.display = "flex";
        _seccion_semifinal.style.display = "flex";
        _seccion_tercer_lugar.style.display = "flex";
        _seccion_final_.style.display = "flex";
        let body_qui = data;
        setCookie("user_quiniela", body_qui);
        window.location.reload();
      }
    });
}

const userQui = getCookie("user_quiniela");
if (userQui) {
  View_iniciar_quiniela.style.display = "none";
  View_inputs_quiniela.style.display = "flex";
  _seccion_32_equipo_.style.display = "flex";
  _seccion_octavos_final_.style.display = "flex";
  _seccion_cuartos_final_.style.display = "flex";
  _seccion_semifinal.style.display = "flex";
  _seccion_tercer_lugar.style.display = "flex";
  _seccion_final_.style.display = "flex";
  btn_cerrar_session.style.display = "flex";
  fecha_match.style.display = "flex";
  user_logeado.textContent = "Usuario Conectado : " + userQui[0].Nombre;
  validateCampoScore();
  // matchDay();
} else {
  View_iniciar_quiniela.style.display = "flex";
  View_inputs_quiniela.style.display = "none";
  _seccion_32_equipo_.style.display = "none";
  _seccion_octavos_final_.style.display = "none";
  _seccion_cuartos_final_.style.display = "none";
  _seccion_semifinal.style.display = "none";
  _seccion_tercer_lugar.style.display = "none";
  _seccion_final_.style.display = "none";

  document.getElementById("volver_resultados").style.display = "block";
  const userAla = getCookie("__Secure_1nf0_US3R");
  if (!userAla) {
    document.getElementById("volver_resultados").style.display = "none";
  }
}

btn_register.addEventListener("click", () => {
  createUser();
});

function createUser() {
  if (!codigo.value || !nombre.value || !telefono.value || !correo.value) {
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

  let UbiCreate;
  const userAla = getCookie("__Secure_1nf0_US3R");
  if (!userAla) {
    UbiCreate = "No Casino";
  } else {
    UbiCreate = "Si Casino";
  }
  let data = {
    tipo: "quiniela_iniciar",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Numero: codigo.value,
    Telefono: telefono.value,
    Correo: correo.value,
    Creado: UbiCreate,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipo: "puntajes",
          Hora: hora,
          Fecha: fecha,
          Nombre: nombre.value,
          Numero: codigo.value,
        }),
      });
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipo: "quiniela_resultado",
          Hora: hora,
          Fecha: fecha,
          Nombre: nombre.value,
          Numero: codigo.value,
        }),
      }).then((res) => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Usuario creado con exito",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      });
      // let body_qui = {
      //   Nombre: nombre.value,
      //   Numero: codigo.value,
      // };
      // setCookie("user_quiniela", body_qui);
      // loader.style.display = "none";
      nombre.value = "";
      codigo.value = "";
      // View_iniciar_quiniela.style.display = "none";
      // View_inputs_quiniela.style.display = "flex";
    })
    .catch((erro) => {
      console.log(erro);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error al crear Usuario, Intentalo mas tarde",
      });
    });
}

btn_actualizar_score.addEventListener("click", () => {
  UpdateScore();
});

function UpdateScore() {
  loader.style.display = "flex";
  const result = buildPronosticosPayload();
  // console.log(result);

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(result),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    });
}

btn_actualizar_score_32_fase.addEventListener("click", () => {
  UpdateScore32Fase();
});

function UpdateScore32Fase() {
  loader.style.display = "flex";

  let result = buildPronosticosPayload32();

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  })
    .then((res) => res.text())
    .then((data) => {
      loader.style.display = "none";

      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      }).then(() => window.location.reload());
    })
    .catch((error) => {
      loader.style.display = "none";

      Swal.fire({
        icon: "error",
        title: "Error al enviar",
        text: error.message,
      });
    });
}

fecha_match.addEventListener("change", () => {
  matchDay(fecha_match.value);
});

function matchDay(fechaS) {
  const fechaExample = fechaS; // Tu fecha de prueba
  const fechasMatch = document.querySelectorAll(".fecha_partido_26");
  const content_card_marcador = document.querySelectorAll(
    ".content_card_marcador",
  );
  const mensajeNoPartidos = document.getElementById("no-partidos-msg");

  let hayPartidosHoy = false;

  fechasMatch.forEach((itemFecha, index) => {
    let contentMatch = itemFecha.textContent.trim();

    if (contentMatch === fechaExample) {
      content_card_marcador[index].style.display = "flex";
      hayPartidosHoy = true;
    } else {
      content_card_marcador[index].style.display = "none";
      if (fechaExample === "") {
        content_card_marcador[index].style.display = "flex";
        mensajeNoPartidos.style.display = "none";
      }
    }
  });

  if (hayPartidosHoy) {
    mensajeNoPartidos.style.display = "none";
    btn_actualizar_score.style.display = "flex";
  } else if (fechaExample === "") {
    mensajeNoPartidos.style.display = "none";
  } else {
    mensajeNoPartidos.style.display = "block";
    btn_actualizar_score.style.display = "none";
  }
}

function validateCampoScore() {
  View_inputs_quiniela.classList.add("item_disable");
  _seccion_32_equipo_.classList.add("item_disable");
  _seccion_octavos_final_.classList.add("item_disable");
  _seccion_cuartos_final_.classList.add("item_disable");
  _seccion_semifinal.classList.add("item_disable");
  _seccion_tercer_lugar.classList.add("item_disable");
  _seccion_final_.classList.add("item_disable");

  fetch(`${url}?hoja=quiniela_resultado&numero=${userQui[0].Numero}`)
    .then((res) => res.json())
    .then((data) => {
      const registro = Array.isArray(data) ? data[0] : data;

      if (!registro) {
        console.error("No se encontró el registro");
        return;
      }

      // console.log("CAMPOS DEL REGISTRO:", Object.keys(registro));

      const entradas = Object.entries(registro);
      View_inputs_quiniela.classList.remove("item_disable");
      _seccion_32_equipo_.classList.remove("item_disable");
      _seccion_octavos_final_.classList.remove("item_disable");
      _seccion_cuartos_final_.classList.remove("item_disable");
      _seccion_semifinal.classList.remove("item_disable");
      _seccion_tercer_lugar.classList.remove("item_disable");
      _seccion_final_.classList.remove("item_disable");

      const conDatos = Object.fromEntries(
        entradas.filter(([key, value]) => {
          const valStr = String(value ?? "").trim();
          return valStr !== "" && key.toLowerCase().includes("partido");
        }),
      );

      const vacios = entradas
        .filter(([key, value]) => {
          const valStr = String(value ?? "").trim();
          return valStr === "" && key.toLowerCase().includes("partido");
        })
        .map(([key]) => key);

      Object.entries(conDatos).forEach(([key, value]) => {
        document.getElementById(`${key}`).value = `${value}`;
        document.getElementById(`${key}`).classList.add("item_disable");
      });
    });
}

function getResultsMatch() {
  fetch(`${url}?hoja=encuentros_fase_grupo&numero=5869569`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

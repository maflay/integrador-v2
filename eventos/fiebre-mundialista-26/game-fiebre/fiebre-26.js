window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const btn_update_score = document.getElementById("btn_update_score");
const btn_actualizar_score_32_fase = document.getElementById(
  "btn_actualizar_score_32_fase",
);
const btn_env_resultados = document.getElementById("btn_env_resultados");
const btn_actualizar_score_16_fase = document.getElementById(
  "btn_actualizar_score_16_fase",
);
const btn_actualizar_score_8_fase = document.getElementById(
  "btn_actualizar_score_8_fase",
);
const btn_actualizar_score_4_fase = document.getElementById(
  "btn_actualizar_score_4_fase",
);
const btn_actualizar_score_semis = document.getElementById(
  "btn_actualizar_score_semis",
);
const btn_actualizar_score_final = document.getElementById(
  "btn_actualizar_score_final",
);

const btn_update_name = document.querySelectorAll(".btn_update_name");

const encabezados =
  `mex_partido_1	suda_partido_1	corea_partido_1	cequia_partido_1	canada_partido_1	bosnia_partido_1	usa_partido_1	paraguay_partido_1	catar_partido_1	suiza_partido_1	brasil_partido_1	marruecos_partido_1	haiti_partido_1	escocia_partido_1	australia_partido_1	turquia_partido_1	alemania_partido_1	curazao_partido_1	paises_bajos_partido_1	japon_partido_1	costa_de_marfil_partido_1	ecuador_partido_1	suecia_partido_1	tunez_partido_1	espania_partido_1	cabo_verde_partido_1	belgica_partido_1	egipto_partido_1	arabia_saudi_partido_1	uruguay_partido_1	iran_partido_1	nueva_zelanda_partido_1	francia_partido_1	senegal_partido_1	irak_partido_1	noruega_partido_1	argentina_partido_1	argelia_partido_1	austria_partido_1	jordania_partido_1	portugal_partido_1	congo_partido_1	inglaterra_partido_1	croacia_partido_1	ghana_partido_1	panama_partido_1	uzbekistan_partido_1	colombia_partido_1`.split(
    "\t",
  );

const loader = document.getElementById("loader");
const url =
  "https://script.google.com/macros/s/AKfycbylamc9MOmQwyD2O3Y0o6d-ZcFXrwsUh6kZOKIZgvl-hgZqgTuJO0InceEeMu9gKwMA/exec";

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

const View_inputs_quiniela = document.getElementById("View_inputs_quiniela");
const _seccion_32_equipo_ = document.getElementById("_seccion_32_equipo_");
const _seccion_octavos_final_ = document.getElementById(
  "_seccion_octavos_final_",
);
const _seccion_cuartos_final_ = document.getElementById(
  "_seccion_cuartos_final_",
);
const _seccion_tercer_lugar = document.getElementById("_seccion_tercer_lugar");
const _seccion_semifinal = document.getElementById("_seccion_semifinal");

btn_update_score.addEventListener("click", () => {
  cargaData();
});

btn_env_resultados.addEventListener("click", () => {
  handleSendResults();
});

btn_actualizar_score_32_fase.addEventListener("click", () => {
  let resultado32fase = buildPronosticosPayload32();
  loader.style.display = "flex";
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(resultado32fase),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
});

btn_actualizar_score_16_fase.addEventListener("click", () => {
  let resultado16fase = buildPronosticosPayload16();
  loader.style.display = "flex";
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(resultado16fase),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
});

btn_actualizar_score_8_fase.addEventListener("click", () => {
  let resultado8fase = buildPronosticosPayload8();
  loader.style.display = "flex";
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(resultado8fase),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
});

btn_actualizar_score_4_fase.addEventListener("click", () => {
  let resultado4fase = buildPronosticosPayload4();
  loader.style.display = "flex";
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(resultado4fase),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
});

btn_actualizar_score_semis.addEventListener("click", () => {
  let resultadoSemisfase = buildPronosticosPayloadSemis();
  loader.style.display = "flex";
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(resultadoSemisfase),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
});

btn_actualizar_score_final.addEventListener("click", () => {
  let resultadoFinalfase = buildPronosticosPayloadFinal();
  loader.style.display = "flex";
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(resultadoFinalfase),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
});

function buildPronosticosPayload() {
  const user = getCookie("user_quiniela"); // {Nombre, Numero}

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
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayload32() {
  const container = document.getElementById("_seccion_32_equipo_");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayload16() {
  const container = document.getElementById("_seccion_octavos_final_");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayload8() {
  const container = document.getElementById("_seccion_cuartos_final_");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayload4() {
  const container = document.getElementById("_seccion_tercer_lugar");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayloadSemis() {
  const container = document.getElementById("_seccion_semifinal");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function buildPronosticosPayloadFinal() {
  const container = document.getElementById("_seccion_final_");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "update_result",
    sheetName: "encuentros_fase_grupo",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

function getNameTeam() {
  const container = document.getElementById("allNames");
  const inputs = container.querySelectorAll('input[type="text"]');
  const inputs_result = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};

  inputs.forEach((inp) => {
    pronosticos[inp.id] = inp.value === "" ? "" : String(inp.value);
  });

  inputs_result.forEach((item) => {
    item.placeholder = "Resultado";
  });

  return {
    tipo: "update_result",
    sheetName: "equipos_clasificados",
    match: {
      Numero: "5869569",
    },
    updates: {
      ...pronosticos,
    },
  };
}

const names_update = document.querySelectorAll(
  '.card_marcador input[type="text"]',
);
names_update.forEach((item) => {
  item.addEventListener("keyup", () => {
    item.value = item.value.toLowerCase();
  });
});

btn_update_name.forEach((item) => {
  item.addEventListener("click", () => {
    handleUpdateName();
  });
});

function handleUpdateName() {
  let nombre_ = getNameTeam();
  loader.style.display = "flex";
  fetch(`${url}?hoja=equipos_clasificados`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(nombre_),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Equipos actualizados",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
      });
    });
}

function handleSendResults() {
  loader.style.display = "flex";
  let pruebaresultado = buildPronosticosPayload();
  fetch(`${url}?hoja=encuentros_fase_grupo`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(pruebaresultado),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "Resultados enviados",
      }).then((resMe) => {
        if (resMe.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envio",
      });
    });
}

async function cargaData() {
  loader.style.display = "flex";

  try {
    const [res1, res2] = await Promise.all([
      fetch(`${url}?hoja=quiniela_resultado`),
      fetch(`${url}?hoja=encuentros_fase_grupo`),
    ]);

    const data_resultado_cli = await res1.json();
    const data_fase_grupo = await res2.json();

    const usuario = data_resultado_cli[0];
    const resultados = data_fase_grupo[0];

    // console.log(usuario);

    const resultadoFinal = compararResultados(usuario, resultados, encabezados);

    const ranking = data_resultado_cli.map((usuario) => {
      const res = evaluarUsuario(usuario, resultados, encabezados);

      return {
        nombre: usuario.Nombre,
        numero: usuario.Numero,
        ...res,
      };
    });

    // console.log(ranking);

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

    for (const user of ranking) {
      await fetch(`${url}?hoja=puntajes`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          tipo: "update_result",
          sheetName: "puntajes",
          match: {
            Numero: user.numero,
          },
          updates: {
            Hora: hora,
            Fecha: fecha,
            Nombre: user.nombre,
            Numero: user.numero,
            Puntos: user.puntos,
            Marcador: user.marcador,
            Resultado: user.resultado,
            Fallos: user.fallos,
          },
        }),
      });
    }
    
    consultarScoreMund();
  } catch (error) {
    console.error("Error en las peticiones", error);
  }
}

validateCampoScore();
function validateCampoScore() {
  View_inputs_quiniela.classList.add("item_disable");
  _seccion_32_equipo_.classList.add("item_disable");
  _seccion_octavos_final_.classList.add("item_disable");
  _seccion_cuartos_final_.classList.add("item_disable");
  _seccion_tercer_lugar.classList.add("item_disable");
  _seccion_semifinal.classList.add("item_disable");
  _seccion_final_.classList.add("item_disable");
  fetch(`${url}?hoja=encuentros_fase_grupo&numero=5869569`)
    .then((res) => res.json())
    .then((data) => {
      const registro = Array.isArray(data) ? data[0] : data;

      if (!registro) {
        console.error("No se encontró el registro");
        return;
      }

      const entradas = Object.entries(registro);

      View_inputs_quiniela.classList.remove("item_disable");
      _seccion_32_equipo_.classList.remove("item_disable");
      _seccion_octavos_final_.classList.remove("item_disable");
      _seccion_cuartos_final_.classList.remove("item_disable");
      _seccion_tercer_lugar.classList.remove("item_disable");
      _seccion_semifinal.classList.remove("item_disable");
      _seccion_final_.classList.remove("item_disable");

      const conDatos = Object.fromEntries(
        entradas.filter(([key, value]) => {
          const valStr = String(value ?? "").trim();
          return valStr !== "" && key.toLowerCase().includes("partido");
        }),
      );

      View_inputs_quiniela.classList.remove("item_disable");

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


validateCampoName();
function validateCampoName() {
  fetch(`${url}?hoja=equipos_clasificados&numero=5869569`)
    .then((res) => res.json())
    .then((data) => {
      const registro = Array.isArray(data) ? data[0] : data;

      if (!registro) {
        console.error("No se encontró el registro");
        return;
      }
      
      const entradas = Object.entries(registro);
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

function compararResultados(usuario, resultados, encabezados) {
  let aciertos = 0;
  let fallos = 0;

  encabezados.forEach((key) => {
    const valorUsuario = usuario[key];
    const valorReal = resultados[key];

    if (valorUsuario === undefined) return;
    if (valorReal === undefined) return;

    // const ganadorReal = obtenerGanador(golesA, golesB);

    // if (valorUsuario === ganadorReal) {
    //   aciertos++;
    // }

    if (valorUsuario === valorReal) {
      aciertos++;
    } else {
      fallos++;
    }
  });

  return { aciertos, fallos };
}

function obtenerGanador(a, b) {
  if (a > b) return 1; // local
  if (a < b) return 2; // visitante
  return 0; // empate
}

function evaluarUsuario(usuario, resultados, encabezados) {
  let puntos = 0;
  let marcador = 0;
  let resultado = 0;
  let fallos = 0;

  for (let i = 0; i < encabezados.length; i += 2) {
    const keyA = encabezados[i];
    const keyB = encabezados[i + 1];

    if (!keyA || !keyB) continue;

    const userA = usuario[keyA];
    const userB = usuario[keyB];

    const realA = resultados[keyA];
    const realB = resultados[keyB];

    // ignorar partidos sin resultado real
    if (realA === "" || realB === "" || realA == null || realB == null)
      continue;

    // ignorar si usuario no jugó
    if (userA === "" || userB === "" || userA == null || userB == null)
      continue;

    const uA = Number(userA);
    const uB = Number(userB);
    const rA = Number(realA);
    const rB = Number(realB);

    const ganadorUser = obtenerGanador(uA, uB);
    const ganadorReal = obtenerGanador(rA, rB);

    if (uA === rA && uB === rB) {
      puntos += 3;
      marcador++;
    } else if (ganadorUser === ganadorReal) {
      puntos += 1;
      resultado++;
    } else {
      fallos++;
    }
  }

  return { puntos, marcador, resultado, fallos };
}

function agruparPartidos(encabezados) {
  const partidos = {};

  encabezados.forEach((key) => {
    const [pais, num] = key.split("_partido_");

    if (!partidos[num]) {
      partidos[num] = [];
    }

    partidos[num].push(key);
  });

  return Object.values(partidos); // [[teamA, teamB], ...]
}

consultarScoreMund();

function consultarScoreMund() {
  const tabla_score_mu = document.getElementById("tabla_score_mu");
  tabla_score_mu.innerHTML = `Cargando...`;

  fetch(`${url}?hoja=puntajes&creado=Si`)
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";
      data.sort((a, b) => a.Puntos - b.Puntos);
      tabla_score_mu.innerHTML = `
            <table class="styled-table">
              <thead style="position: relative;">
                <tr>
                  <th># Registro</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Puntos</th>
                  <th>Marcador</th>
                  <th>Resultado</th>
                  <th>Fallos</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .reverse()
                  .map(
                    (registro, i) => `
                      <tr>
                        <td>${i + 1}</td>
                        <td>${registro.Nombre}</td>
                        <td>${registro.Fecha.substring(0, 10)}</td>
                        <td>${registro.Puntos}</td>
                        <td>${registro.Marcador}</td>
                        <td>${registro.Resultado}</td>
                        <td>${registro.Fallos}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
        `;
    });
}

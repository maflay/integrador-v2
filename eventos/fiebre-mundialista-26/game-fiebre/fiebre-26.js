window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const btn_update_score = document.getElementById("btn_update_score");
const encabezados =
  `mex_partido_1	suda_partido_1	corea_partido_1	cequia_partido_1	canada_partido_1	bosnia_partido_1	usa_partido_1	paraguay_partido_1	catar_partido_1	suiza_partido_1	brasil_partido_1	marruecos_partido_1	haiti_partido_1	escocia_partido_1	australia_partido_1	turquia_partido_1	alemania_partido_1	curazao_partido_1	paises_bajos_partido_1	japon_partido_1	costa_de_marfil_partido_1	ecuador_partido_1	suecia_partido_1	tunez_partido_1	espania_partido_1	cabo_verde_partido_1	belgica_partido_1	egipto_partido_1	arabia_saudi_partido_1	uruguay_partido_1	iran_partido_1	nueva_zelanda_partido_1	francia_partido_1	senegal_partido_1	irak_partido_1	noruega_partido_1	argentina_partido_1	argelia_partido_1	austria_partido_1	jordania_partido_1	portugal_partido_1	congo_partido_1	inglaterra_partido_1	croacia_partido_1	ghana_partido_1	panama_partido_1	uzbekistan_partido_1	colombia_partido_1`.split(
    "\t",
  );

const loader = document.getElementById("loader");
const url =
  "https://script.google.com/macros/s/AKfycbyonIixrGiF1sTtbkzWdjLiMWI28S_40QyFjSVy1bxXKB_Z3RLtr_ttjnGkwHyRUZlw/exec";

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

const btn_env_resultados = document.getElementById("btn_env_resultados");

btn_env_resultados.addEventListener("click", () => {
  handleSendResults();
});

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

validateCampoScore();
function validateCampoScore() {
  View_inputs_quiniela.classList.add("item_disable");
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

function compararResultados(usuario, resultados, encabezados) {
  let aciertos = 0;
  let fallos = 0;

  encabezados.forEach((key) => {
    const valorUsuario = usuario[key];
    const valorReal = resultados[key];

    if (valorUsuario === undefined) return;
    if (valorReal === undefined) return;

    //     const ganadorReal = obtenerGanador(golesA, golesB);

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

btn_update_score.addEventListener("click", () => {
  cargaData();
});

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

  fetch(`${url}?hoja=puntajes`)
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";
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

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const loader = document.getElementById("loader");
const casillas = document.getElementById("casillas");
const btn_pintar_tablero = document.getElementById("btn_pintar_tablero");
const board = document.getElementById("board_cumpleaños");
const btn_inicar_random = document.getElementById("btn_inicar_random");
const btn_reiniciar = document.getElementById("btn_reiniciar");
const btn_opciones = document.getElementById("btn_opciones");
const close_modal_icon = document.getElementById("close_modal_icon");

const IN_FLIGHT = new Set();
const LS_KEY = "registrosNumeroRandom";
const FECHA_KEY = "fechaNumeroRandom";

const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

const audioFicha = new Audio(
  "/dinamicas/randonum/resources/ruleta-win-faw.mp3",
);

const audioCoin = new Audio("/dinamicas/randonum/resources/Sonido_ficha.mp3");

const Promocion = "Numero Random";
const url =
  "https://script.google.com/macros/s/AKfycbxKxEfhRRAY1Fgg60e0U2ZzTyMIcSfQod0gQPnv-zaFsKGyeYoFLrAcApJJhDN2fyjx/exec";

// datos guardar registro
const casino = document.getElementById("casino");
const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const categoria = document.getElementById("categoria");
const bono = document.getElementById("bono");

const btn_submit = document.getElementById("btn_submit");
const btn_submit_obs = document.getElementById("btn_submit_obs");

// datos modal segundo

// datos modal observacion
const casino_observacion = document.getElementById("casino_observacion");
const descripcion_observacion = document.getElementById(
  "descripcion_observacion",
);

const user = inforUser("user");

btn_pintar_tablero.addEventListener("click", () => {
  if (casillas.value == "" || casillas.value > 500) {
    Swal.fire({
      icon: "warning",
      title: "Antes de Pintar",
      html: "Debes digitar un numero valido.",
    });
    return;
  }
  board.innerHTML = "";
  board.style.display = "flex";
  btn_inicar_random.classList.remove("disable_item");
  btn_pintar_tablero.classList.add("disable_item");

  for (let i = 0; i < casillas.value; i++) {
    let casilla = document.createElement("div");
    casilla.id = `posicion_${i + 1}`;
    casilla.className = "posicion_cum";
    casilla.textContent = `${i + 1}`;
    casilla.classList.add("posicion_cum_opacada");

    //En lugar de eliminarla, la marcamos como "usada"
    casilla.addEventListener("click", () => {
      casilla.classList.toggle("posicion_cum_opacada");
      audioCoin.currentTime = 0;
      audioCoin.play();
    });

    board.appendChild(casilla);
    validaCasillaSele();
  }
});

btn_inicar_random.addEventListener("click", () => {
  randomizar();
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function randomizar() {
  if (casillas.value == "" && selectRango.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Antes de Continuar",
      html: "Debes Digitar la cantidad de numeros.",
    });
    return;
  }

  // Tomar SOLO las casillas activas (no opacadas)
  const casillasDisponibles = Array.from(
    document.querySelectorAll(".posicion_cum:not(.posicion_cum_opacada)"),
  );

  if (casillasDisponibles.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Sin casillas disponibles",
      html: "Todas las casillas están usadas. Debes pintar el tablero de nuevo.",
    });
    return;
  }
  const total = casillasDisponibles.length;
  const numerAleatorio = Math.floor(Math.random() * total); // índice del array
  const casillaGanadora = casillasDisponibles[numerAleatorio];

  btn_inicar_random.classList.add("disable_item");
  btn_pintar_tablero.classList.add("disable_item");

  // Limpiar selección previa
  document
    .querySelectorAll(".posicion_cum_seleccionado")
    .forEach((c) => c.classList.remove("posicion_cum_seleccionado"));

  // Vueltas según cantidad
  const vueltas =
    total <= 5
      ? 10
      : total <= 10
        ? 7
        : total <= 20
          ? 5
          : total <= 30
            ? 3
            : total <= 40
              ? 2
              : 1;

  const pasosTotales = vueltas * total + numerAleatorio + 1;

  for (let i = 0; i < pasosTotales; i++) {
    const pos = i % total;
    const actual = casillasDisponibles[pos];
    const prev =
      pos === 0 ? casillasDisponibles[total - 1] : casillasDisponibles[pos - 1];

    if (actual) actual.classList.add("posicion_cum_seleccionado");
    if (prev) prev.classList.remove("posicion_cum_seleccionado");

    audioFicha.currentTime = 0;
    audioFicha.play();
    await delay(total <= 60 ? 30 : 60);
  }

  // Marcar ganadora y opacarla para no volver a usarla
  if (casillaGanadora) {
    casillaGanadora.classList.add("posicion_cum_seleccionado");
    await delay(800);
    casillaGanadora.classList.add("posicion_cum_opacada");
    if (casillaGanadora.id) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      ultimaCasilla = casillaGanadora.id.split("_")[1];
      Swal.fire({
        icon: "success",
        title: `Tu Posición :<p class="casillaGanadora">${
          casillaGanadora.id.split("_")[1]
        }</p>`,
      });
    }
  }

  // Habilitar de nuevo el botón para otro sorteo
  btn_inicar_random.classList.remove("disable_item");
}

btn_reiniciar.addEventListener("click", () => {
  resetBoard();
});

function resetBoard() {
  board.innerHTML = "";
  board.style.display = "none";
  casillas.value = "";
  btn_pintar_tablero.classList.remove("disable_item");
  btn_inicar_random.classList.remove("disable_item");
}

function validaCasillaSele() {
  for (let i = 1; i <= casillas.value; i++) {
    let casiSele = document.getElementById(`posicion_${i}`);
    if (casiSele && casiSele.classList.contains("posicion_cum_seleccionado")) {
      casiSele.classList.remove("posicion_cum_seleccionado");
    }
  }
}

const selectRango = document.getElementById("selectRango");

selectRango.addEventListener("change", () => {
  const rangos = {
    "las-vegas": [{ min: 0, max: 93 }],
    "gold-club": [{ min: 127, max: 136 }],
    "sala-multiple": [{ min: 130, max: 209 }],
    interlock: [{ min: 111, max: 118 }],
    todos: [
      { min: 0, max: 93 },
      { min: 111, max: 118 },
      { min: 127, max: 136 },
      { min: 130, max: 209 },
    ],
  };

  const seleccion = selectRango.value;

  if (!seleccion || !rangos[seleccion]) {
    board.innerHTML = "";
    board.style.display = "none";
    return;
  }

  board.innerHTML = "";
  board.style.display = "flex";

  rangos[seleccion].forEach((rango) => {
    for (let i = rango.min; i <= rango.max; i++) {
      let casilla = document.createElement("div");
      casilla.id = `posicion_${i + 1}`;
      casilla.className = "posicion_cum";
      casilla.textContent = `${i + 1}`;
      casilla.classList.add("posicion_cum_opacada");

      casilla.addEventListener("click", () => {
        casilla.classList.toggle("posicion_cum_opacada");
      });

      board.appendChild(casilla);
    }
  });

  validaCasillaSele();
});

btn_submit.addEventListener("click", () => {
  handleSubmit();
});

function handleSubmit() {
  let casinoS = casino.value;
  let nombreS = nombre.value;
  let cedulaS = cedula.value;
  let bonoS = bono.value;
  let casillaS = ultimaCasilla;

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

  if (casinoS == "" || nombreS == "" || casillaS == "" || bonoS == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: "Completa la información antes de enviar",
    });
    return;
  }

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombreS,
    valor_4: cedulaS,
    valor_5: casinoS,
    valor_6: "Sin Categoria",
    valor_7: casillaS,
    valor_8: bonoS,
    valor_9: Promocion,
    valor_10: user.Nombre,
  };

  if (typeof getDataLocal === "function") getDataLocal();

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      loader.style.display = "none";
      casino.value = "";
      nombre.value = "";
      cedula.value = "";
      bono.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
        html: "La información se envió correctamente",
      });
      getDataLocal();
      if (typeof getDataLocal === "function") getDataLocal();
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el envió",
        html: "Ha ocurrido un error, inténtalo más tarde",
      });
    });
}

btn_submit_obs.addEventListener("click", () => {
  handleSubmitObs();
});

function handleSubmitObs() {
  let casinoO = casino_observacion.value;
  let descripcionO = descripcion_observacion.value;

  if (casinoO == "" || descripcionO == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
      html: "Completa la información para poder hacer el envió",
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
    valor_3: casinoO,
    valor_4: descripcionO,
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
      Swal.fire({
        icon: "success",
        title: "Exito de Envió",
        html: "Se envio la información de manera correcta",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        html: "Ha ocurrido un error en el envió, intentalo mas tarde",
      });
    });
}

getDataLocal();
function getDataLocal() {
  const ultimosRegistros = document.getElementById("ultimos-registros");
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  const filtrados = registro;

  if (filtrados.length != 0) {
    ultimosRegistros.innerHTML = `
  <div class="table-result">
    <table class="styled-table">
      <thead>
        <tr>
          <th># Registro</th>
          <th>Casino</th>
          <th>Nombre</th>
          <th>Bono</th>
          <th>Casilla</th>
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
                <td>${registro.valor_3}</td>
                <td>${registro.valor_8}</td>
                <td>${registro.valor_7}</td>
                <td>${registro.valor_2} ${registro.valor_1}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;
  } else {
    ultimosRegistros.innerHTML = `Sin datos`;
  }
}

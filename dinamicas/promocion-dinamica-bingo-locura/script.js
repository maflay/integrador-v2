window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const readBoard = document.getElementById("readBoard");
const btn_pintar_tablero = document.getElementById("btn_pintar_tablero");
const _board_bingo_ = document.getElementById("_board_bingo_");
const btn_iniciar_bingo = document.getElementById("btn_iniciar_bingo");
const categoria = document.getElementById("categoria");
const nombre = document.getElementById("nombre");
const btn_enviar = document.getElementById("btn_enviar");
const loader = document.getElementById("loader");
const btn_reset = document.getElementById("btn_reset");
const controls_bingo = document.getElementById("controls_bingo");
const _ultima_bola_ = document.getElementById("_ultima_bola_");
const _anterior_posicion_2_ = document.getElementById("_anterior_posicion_2_");
const _anterior_posicion_3_ = document.getElementById("_anterior_posicion_3_");
const _anterior_posicion_4_ = document.getElementById("_anterior_posicion_4_");
const _anterior_posicion_5_ = document.getElementById("_anterior_posicion_5_");
const _letra_bingo_ = document.getElementById("_letra_bingo_");

const promocion = "Bingo Locura";

const user = inforUser();

const url =
  "https://script.google.com/macros/s/AKfycbwDpkog6MSsTiIAZpw83SMJqTM_lltL0STKgkZk4lue0SpVezL77EMypzXKiKVUccUf/exec";

function obtenerBingo(numero) {
  numero = Number(numero);

  if (numero >= 1 && numero <= 15) {
    return `B-${numero}`;
  }

  if (numero >= 16 && numero <= 30) {
    return `I-${numero}`;
  }

  if (numero >= 31 && numero <= 45) {
    return `N-${numero}`;
  }

  if (numero >= 46 && numero <= 60) {
    return `G-${numero}`;
  }

  if (numero >= 61 && numero <= 75) {
    return `O-${numero}`;
  }

  return "Número inválido";
}

_letra_bingo_.addEventListener("change", () => {
  if (_letra_bingo_.value) {
    _board_bingo_.innerHTML = "";

    for (let i = 0; i < 15; i++) {
      let casilla = document.createElement("div");
      casilla.id = `posicion_${i + 1}`;
      casilla.className = "_bola_bingo_locu";
      casilla.textContent = _letra_bingo_.value + `-${i + 1}`;

      casilla.addEventListener("click", () => {
        casilla.classList.add("posicion_cum_opacada");
      });

      _board_bingo_.appendChild(casilla);
      controls_bingo.style.display = "flex";
    }
  } else {
    _board_bingo_.innerHTML = "";
  }
});

btn_pintar_tablero.addEventListener("click", () => {
  _board_bingo_.innerHTML = "";
  if (!readBoard.value || readBoard.value > 75) {
    Swal.fire({
      icon: "warning",
      title: "Número no Válido",
    });
    return;
  }

  for (let i = 0; i < readBoard.value; i++) {
    let casilla = document.createElement("div");
    casilla.id = `posicion_${i + 1}`;
    casilla.className = "_bola_bingo_locu";
    casilla.textContent = `${obtenerBingo(i + 1)}`;

    casilla.addEventListener("click", () => {
      casilla.classList.add("posicion_cum_opacada");
    });

    _board_bingo_.appendChild(casilla);
    controls_bingo.style.display = "flex";
  }
});

btn_iniciar_bingo.addEventListener("click", () => {
  randomizar();
});

async function randomizar() {
  if (!document.getElementById("posicion_1")) {
    Swal.fire({
      icon: "warning",
      title: "Antes de Continuar",
      html: "Debe existir un tablero valido.",
    });
    return;
  }


  // Tomar SOLO las casillas activas (no opacadas)
  const casillasDisponibles = Array.from(
    document.querySelectorAll("._bola_bingo_locu:not(.posicion_cum_opacada)"),
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
    await delay(total <= 40 ? 60 : 120);
  }

  // Marcar ganadora y opacarla para no volver a usarla
  if (casillaGanadora) {
    casillaGanadora.classList.add("posicion_cum_seleccionado");
    await delay(800);
    casillaGanadora.classList.add("posicion_cum_opacada");
    validateLastFicha(obtenerBingo(casillaGanadora.id.split("_")[1]));

    if (casillaGanadora.id) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      ultimaCasilla = casillaGanadora.id.split("_")[1];
      Swal.fire({
        icon: "success",
        title: `<p class="casillaGanadora">${obtenerBingo(
          casillaGanadora.id.split("_")[1],
        )}</p>`,
      });
    }
  }

  // Habilitar de nuevo el botón para otro sorteo
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validateLastFicha(numero) {
  let ultimonumeroSave = "";
  if (!_ultima_bola_.textContent) {
    _ultima_bola_.textContent = String(numero);
    _ultima_bola_.style.display = "flex";
    ultimonumeroSave = String(numero);
  } else if (!_anterior_posicion_2_.textContent) {
    _anterior_posicion_2_.style.display = "flex";
    _anterior_posicion_2_.textContent = _ultima_bola_.textContent;
    _ultima_bola_.textContent = String(numero);
  } else if (!_anterior_posicion_3_.textContent) {
    _anterior_posicion_3_.style.display = "flex";
    _anterior_posicion_3_.textContent = _anterior_posicion_2_.textContent;
    _anterior_posicion_2_.textContent = _ultima_bola_.textContent;
    _ultima_bola_.textContent = String(numero);
  } else if (!_anterior_posicion_4_.textContent) {
    _anterior_posicion_4_.style.display = "flex";
    _anterior_posicion_4_.textContent = _anterior_posicion_3_.textContent;
    _anterior_posicion_3_.textContent = _anterior_posicion_2_.textContent;
    _anterior_posicion_2_.textContent = _ultima_bola_.textContent;
    _ultima_bola_.textContent = String(numero);
  } else if (!_anterior_posicion_5_.textContent) {
    _anterior_posicion_5_.style.display = "flex";
    _anterior_posicion_5_.textContent = _anterior_posicion_4_.textContent;
    _anterior_posicion_4_.textContent = _anterior_posicion_3_.textContent;
    _anterior_posicion_3_.textContent = _anterior_posicion_2_.textContent;
    _anterior_posicion_2_.textContent = _ultima_bola_.textContent;
    _ultima_bola_.textContent = String(numero);
  } else {
    _anterior_posicion_5_.textContent = _anterior_posicion_4_.textContent;
    _anterior_posicion_4_.textContent = _anterior_posicion_3_.textContent;
    _anterior_posicion_3_.textContent = _anterior_posicion_2_.textContent;
    _anterior_posicion_2_.textContent = _ultima_bola_.textContent;
    _ultima_bola_.textContent = String(numero);
  }
}

btn_enviar.addEventListener("click", () => {
  handleSendInfoBingo();
});

function handleSendInfoBingo() {
  if (!nombre.value || !categoria.value) {
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
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Cedula: "",
    Categoria: categoria.value,
    Promocion: promocion,
    Usuario: user.Nombre,
    Bono: "",
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
      nombre.value = "";
      categoria.value = "";
      resetBoard();
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error en el Envió",
        html: `${error}`,
      });
    });
}

btn_reset.addEventListener("click", () => {
  resetBoard();
});

function resetBoard() {
  _board_bingo_.innerHTML = "";
  nombre.value = "";
  categoria.value = "";
  readBoard.value = "";
  controls_bingo.style.display = "none";
  _ultima_bola_.style.display = "none";
  _anterior_posicion_2_.style.display = "none";
  _anterior_posicion_3_.style.display = "none";
  _anterior_posicion_4_.style.display = "none";
  _anterior_posicion_5_.style.display = "none";
}

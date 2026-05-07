window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const btnreinicar = document.getElementById("btn-reiniciar");
  const btnreinicarTablero = document.getElementById("btn-reiniciar-tablero");
  const btnPlantarse = document.getElementById("btn-plantarse");

  btnreinicarTablero.style.display = "none";
  btnPlantarse.style.display = "none";
  loader.style.display = "none";

  renderCard();
});

const user = inforUser();

const btn_enviar = document.getElementById("btn_enviar");
const btn_send_secundario = document.getElementById("btn_send_secundario");
const btn_envia_observacion = document.getElementById("btn_envia_observacion");
const casino = document.getElementById("casino");
const categoria = document.getElementById("categoria");

const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];
let deck = [];
let totalScore = 0;
const promocion = "BlackJack Express";
const url =
  "https://script.google.com/macros/s/AKfycbzsRIbB9JLNb8DC_83wgp7G8ojnKcqUn_OiQ1W7J2vvdH8L9YRJF4ps7A1piyti8LI79g/exec";

const IN_FLIGHT = new Set();
const LS_KEY = "registrosBlackJack";
const FECHA_KEY = "fechaBlackJack";
const hoy = new Date().toDateString();
if (localStorage.getItem(FECHA_KEY) !== hoy) {
  localStorage.setItem(LS_KEY, JSON.stringify([]));
  localStorage.setItem(FECHA_KEY, hoy);
}

casino.addEventListener("change", () => {
  if (casino.value == "" || categoria.value == "") {
    disableCards();
  } else {
    enableCards();
    const tablaCorrecta = casino_table_[casino.value];

    if (!tablaCorrecta) {
      alert("Casino no reconocido");
      return;
    }

    if (tablaCorrecta !== tablaSeleccionada) {
      alert("❌ Este casino no tiene esta categoría");
      return;
    }
  }
});

function validarCasino(casino, tablaSeleccionada) {
  const tablaCorrecta = CASINO_TO_TABLA[casino];

  if (!tablaCorrecta) {
    return "Casino no reconocido";
  }

  if (tablaCorrecta !== tablaSeleccionada) {
    return "Este casino no tiene esta categoría";
  }

  return null; // todo bien
}

categoria.addEventListener("change", () => {
  if (casino.value == "" || categoria.value == "") {
    disableCards();
  } else {
    enableCards();
  }
});

const casino_table_ = {
  A05: 1,
  A07: 1,
  A08: 1,
  A09: 1,
  A12: 1,
  A16: 1,
  A70: 1,
  A43: 2,
  A53: 2,
  A108: 2,
  MP108: 2,
  A127: 2,
  A15: 2,
  "A12-MESAS": 3,
  A19: 3,
  A50: 3,
  A38: 3,
  A35: 3,
  A39: 3,
  A88: 3,
  A48: 3,
  "A48-MESAS": 3,
  A49: 3,
  MP100: 3,
  A100: 3,
  "A127-MESAS": 3,
  A36: 4,
  "A36-MESAS": 4,
  A781: 4,
  "A15-MESAS": 4,
};

const casino_table_1 = ["A05", "A07", "A08", "A09", "A12", "A16", "A70"];

const casino_table_2 = ["A43", "A53", "A108", "MP108", "A127", "A15"];

const casino_table_3 = [
  "A12-MESAS",
  "A19",
  "A50",
  "A38",
  "A35",
  "A39",
  "A88",
  "A48",
  "A48-MESAS",
  "A49",
  "MP100",
  "A100",
  "A127-MESAS"
];

const casino_table_4 = ["A36", "A36-MESAS", "A781", "A15-MESAS"];

// premios WIN

const premios_tabla_1 = {
  GENIUS: "$120.000",
  TITANIO: "$110.000",
  LEGENDARIO: "$100.000",
  GOLD: "$90.000",
  SILVER: "$80.000",
  BRONCE: "$70.000",
};

const premios_tabla_2 = {
  GENIUS: "$150.000",
  TITANIO: "$140.000",
  LEGENDARIO: "$130.000",
  GOLD: "$120.000",
  SILVER: "$110.000",
  BRONCE: "$100.000",
};

const premios_tabla_3 = {
  ESTANDAR: "$70.000",
  SUPERIOR: "$90.000",
};

const premios_tabla_4 = {
  ESTANDAR: "$100.000",
  SUPERIOR: "$120.000",
};

const premiosWin = {
  GENIUS: "$170.000",
  TITANIO: "$150.000",
  LEGENDARIO: "$130.000",
  GOLD: "$110.000",
  SILVER: "$90.000",
  BRONCE: "$70.000",
};

// PREMIOS BLACKJACK

const blackjack_tabla_1 = {
  GENIUS: "$400.000",
  TITANIO: "$350.000",
  LEGENDARIO: "$300.000",
  GOLD: "$250.000",
  SILVER: "$200.000",
  BRONCE: "$150.000",
};

const blackjack_tabla_2 = {
  GENIUS: "$400.000",
  TITANIO: "$350.000",
  LEGENDARIO: "$300.000",
  GOLD: "$250.000",
  SILVER: "$200.000",
  BRONCE: "$150.000",
};

const blackjack_tabla_3 = {
  ESTANDAR: "$150.000",
  SUPERIOR: "$300.000",
};

const blackjack_tabla_4 = {
  ESTANDAR: "$150.000",
  SUPERIOR: "$300.000",
};

const premiosBJ = {
  GENIUS: "$500.000",
  TITANIO: "$450.000",
  LEGENDARIO: "$400.000",
  GOLD: "$350.000",
  SILVER: "$300.000",
  BRONCE: "$150.000",
};

// PREMIOS SUPERIOR A 21

const lose_tabla_1 = {
  GENIUS: "$100.000",
  TITANIO: "$90.000",
  LEGENDARIO: "$80.000",
  GOLD: "$70.000",
  SILVER: "$60.000",
  BRONCE: "$50.000",
};

const lose_tabla_2 = {
  GENIUS: "$130.000",
  TITANIO: "$120.000",
  LEGENDARIO: "$110.000",
  GOLD: "$100.000",
  SILVER: "$90.000",
  BRONCE: "$80.000",
};

const lose_tabla_3 = {
  ESTANDAR: "$50.000",
  SUPERIOR: "$70.000",
};

const lose_tabla_4 = {
  ESTANDAR: "$80.000",
  SUPERIOR: "$100.000",
};

// PREMIOS SE PASO

const premiosLose = {
  GENIUS: "$150.000",
  TITANIO: "$130.000",
  LEGENDARIO: "$110.000",
  GOLD: "$90.000",
  SILVER: "$70.000",
  BRONCE: "$50.000",
};

const PREMIOS = {
  1: premios_tabla_1,
  2: premios_tabla_2,
  3: premios_tabla_3,
  4: premios_tabla_4,
};

function obtenerTablaDesdeCasino(casino) {
  return casino_table_[casino] || null;
}

const drawCard = () => {
  if (deck.length === 0) createDeck();
  return deck.pop();
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const createDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  for (let type of types) {
    for (let sp of specials) {
      deck.push(sp + type);
    }
  }
  return shuffleDeck(deck);
};

function renderCard() {
  const container = document.getElementById("content-card-player");
  container.innerHTML = "";

  const title = document.createElement("h3");
  title.classList.add("title-cards");
  title.textContent = "CARTAS";
  container.appendChild(title);

  const order = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  types.forEach((type) => {
    const row = document.createElement("div");
    row.classList.add("card-row");

    order.forEach((value) => {
      if (type === "D") {
        const card = `${value}${type}`;
        const img = document.createElement("img");
        img.src = `/dinamicas/promocion-BlackJack/resources/cartas/${card}.svg`;
        img.alt = card;
        img.classList.add("card-image");
        img.setAttribute("data-carta", card);

        img.addEventListener("click", (e) => {
          e.target.style.pointerEvents = "none";
          document.getElementById("btn-reiniciar").style.display = "flex";
          document.getElementById("btn-reiniciar-tablero").style.display =
            "flex";
          document.getElementById("btn-plantarse").style.display = "flex";
          e.target.classList.add("disable");
          callCard(card);
        });

        row.appendChild(img);
      }
    });

    container.appendChild(row);
  });
  disableCards();
}

renderCard();

const valueCard = (card) => {
  const value = card.slice(0, -1);
  if (isNaN(value)) {
    if (value === "A") return { val: 11, isAce: true };
    return { val: 10, isAce: false };
  }

  return { val: +value, isAce: false };
};

function callCard(card) {
  const container = document.getElementById("CallCard");
  const scorePlayer = document.getElementById("content-score");
  const valCategoria = document.getElementById("categoria").value;

  const img = document.createElement("img");
  img.src = `/dinamicas/promocion-BlackJack/resources/cartas/${card}.svg`;
  img.alt = card;
  img.classList.add("card-image-call");
  container.appendChild(img);

  const { val, isAce } = valueCard(card);
  totalScore += val;

  if (isAce) {
    img.setAttribute("data-ace", "true");
  }

  const cantidad = container.querySelectorAll("img").length;

  const calcularScore = () => {
    let total = 0;
    let ases = 0;
    const cartas = document.querySelectorAll("#CallCard img");

    cartas.forEach((carta) => {
      const nombre = carta.alt;
      const { val, isAce } = valueCard(nombre);
      total += val;
      if (isAce) ases++;
    });

    let ajustado = total;
    while (ajustado > 21 && ases > 0) {
      ajustado -= 10;
      ases--;
    }

    return {
      ajustado,
      totalOriginal: total,
      hayAs: total !== ajustado || ases > 0, // detecta si hay algún As
    };
  };

  const { ajustado, totalOriginal, hayAs } = calcularScore();

  const perder = () => {
    disableCards();
    if (casino_table_1.includes(casino.value)) {
      alertLose(lose_tabla_1[valCategoria] || "0", valCategoria);
    } else if (casino_table_2.includes(casino.value)) {
      alertLose(lose_tabla_2[valCategoria] || "0", valCategoria);
    } else if (casino_table_3.includes(casino.value)) {
      alertLose(lose_tabla_3[valCategoria] || "0", valCategoria);
    } else if (casino_table_4.includes(casino.value)) {
      alertLose(lose_tabla_4[valCategoria] || "0", valCategoria);
    } else {
      alertCasinoExiste();
    }
  };

  const ganar = (monto, tipo) => {
    const _casino = casino.value;
    const categoria_ = categoria.value;
    const tabla = obtenerTablaDesdeCasino(_casino);
    const premiosTabla = PREMIOS[tabla];

    console.log(tabla);
    if (!tabla) {
      Swal.fire({
        icon: "warning",
        title: "Casino no válido.",
      });
      return;
    }

    if (!(categoria_ in premiosTabla)) {
      Swal.fire({
        icon: "warning",
        title: "Este casino no tiene esa categoría",
      }).then((res) => {
        if (res.isConfirmed) {
          resetTablero();
        }
      });
      return;
    }


    alertWin(valCategoria, monto, tipo);
  };

  if (cantidad >= 2) {
    if (ajustado > 21) {
      perder();
      alertCasinoExiste();
      // const premiosTablaCorrecta = PREMIOS[tabla];
      // if (!(categoria_ in premiosTablaCorrecta)) {
      //   alert("Este casino no tiene esa categoría");
      //   return;
      // }
    } else if ([18, 19, 20, 21].includes(ajustado)) {
      if (casino_table_1.includes(casino.value)) {
        ganar(premios_tabla_1[valCategoria] || "$0", "Ganaste");
      } else if (casino_table_2.includes(casino.value)) {
        ganar(premios_tabla_2[valCategoria] || "$0", "Ganaste");
      } else if (casino_table_3.includes(casino.value)) {
        ganar(premios_tabla_3[valCategoria] || "$0", "Ganaste");
      } else if (casino_table_4.includes(casino.value)) {
        ganar(premios_tabla_4[valCategoria] || "$0", "Ganaste");
      }
    }
  }

  if (cantidad === 2) {
    if (ajustado > 21) {
      perder();
      alertCasinoExiste();
    } else if (ajustado === 21) {
      if (casino_table_1.includes(casino.value)) {
        ganar(blackjack_tabla_1[valCategoria] || "$0", "BlackJack");
      } else if (casino_table_2.includes(casino.value)) {
        ganar(blackjack_tabla_2[valCategoria] || "$0", "BlackJack");
      } else if (casino_table_3.includes(casino.value)) {
        ganar(blackjack_tabla_3[valCategoria] || "$0", "BlackJack");
      } else if (casino_table_4.includes(casino.value)) {
        ganar(blackjack_tabla_4[valCategoria] || "$0", "BlackJack");
      }
    }
  }

  if (hayAs && ajustado >= 13 && ajustado <= 17 && totalOriginal <= 21) {
    const valorAlterno = ajustado - 10;
    scorePlayer.innerHTML = `${valorAlterno} / ${ajustado}`;
  } else {
    scorePlayer.innerHTML = `${ajustado}`;
  }
}

function resetGame() {
  const tblCallCard = document.getElementById("CallCard");
  const Score = document.getElementById("content-score");
  const btnReinicio = document.getElementById("btn-reiniciar");
  const btnReinicioTablero = document.getElementById("btn-reiniciar-tablero");
  const btnPlantarse = document.getElementById("btn-plantarse");

  const nombre = document.getElementById("nombre");
  const casino = document.getElementById("casino");
  const categoria = document.getElementById("categoria");
  const cedula = document.getElementById("cedula");

  btnReinicio.style.display = "none";
  btnReinicioTablero.style.display = "none";
  btnPlantarse.style.display = "none";
  enableCards();

  tblCallCard.innerHTML = "";
  Score.innerHTML = "";
  document.getElementById("textoGanador").innerHTML = ``;

  nombre.value = "";
  casino.value = "";
  categoria.value = "";
  cedula.value = "";

  totalScore = 0;
  disableCards();
}

function resetTablero() {
  const tblCallCard = document.getElementById("CallCard");
  const btnReinicio = document.getElementById("btn-reiniciar");
  const btnReinicioTablero = document.getElementById("btn-reiniciar-tablero");
  const Score = document.getElementById("content-score");
  const btnPlantarse = document.getElementById("btn-plantarse");
  enableCards();
  tblCallCard.innerHTML = "";
  Score.innerHTML = "";
  // btnReinicio.style.display = "none";
  btnReinicioTablero.style.display = "none";
  btnPlantarse.style.display = "none";
  document.getElementById("textoGanador").innerHTML = ``;
  totalScore = 0;
}

function disableCards() {
  const cartas = document.querySelectorAll(".card-image");

  cartas.forEach((carta) => {
    carta.style.pointerEvents = "none";
    carta.classList.add("disable");
  });
}

function enableCards() {
  const cartas = document.querySelectorAll(".card-image.disable");

  cartas.forEach((carta) => {
    carta.style.pointerEvents = "auto";
    carta.classList.remove("disable");
  });
}

function confettiVictoria() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7, x: 0.2 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6, x: 0.2 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.9, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.8, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.7, x: 0.8 },
  });
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6, x: 0.8 },
  });
}

function alertWin(categoria, valor, opcion) {
  Swal.fire({
    icon: "success",
    title: `Categoria ${categoria}`,
    html: `${opcion} con un premio de <span class="valrecompensa">${valor}</span> en Dinero Promocional, con categoria ${categoria}.`,
    confirmButtonColor: "#efb810",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
  confettiVictoria();
  document.getElementById("casino").classList.add("item_disable");
  document.getElementById("categoria").classList.add("item_disable");

  document.getElementById("textoGanador").innerHTML = getTextWinForm(
    categoria,
    valor,
    opcion,
  );
}

function getTextWinForm(categoria, valor, opcion) {
  return `
    <div style="display:flex;gap:10px;">
      <div>${opcion} con un premio de <strong style="font-size: 2rem";>${valor}</strong> en Dinero Promocional, con categoria <strong style="font-size: 2rem";>${categoria}</strong>.</div>
    </div>
  `;
}

function alertLose(valor, categoria) {
  Swal.fire({
    icon: "warning",
    title: `Te has pasado.`,
    text: `Te has pasado pero ganas un premio de ${valor}, con categoria ${categoria}.`,
    confirmButtonColor: "#efb810",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
}

btn_enviar.addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  const nombre = document.getElementById("nombre").value.trim();
  const casino = document.getElementById("casino").value.trim();
  const categoria = document.getElementById("categoria").value.trim();

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
  const cartas = document.querySelectorAll("#CallCard img");
  const { ajustado, totalOriginal } = calcularScore(cartas);
  let resultado = calcularResultado(ajustado, cartas.length);

  let data = {
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre,
    valor_5: casino,
    valor_6: categoria,
    valor_7: categoria == "ADICIONAL" ? "0" : resultado,
    valBono: categoria == "ADICIONAL" ? "0" : "",
    ...(categoria == "ADICIONAL" ? { valor_8: "0" } : ""),
    valor_9: promocion,
    valor_10: user.Nombre,
  };

  if (!nombre || !casino || !categoria) {
    showAlert(
      "warning",
      "Campos obligatorios",
      "Por favor, completa todos los campos.",
    );
    loader.style.display = "none";
    return;
  }

  loader.style.display = "flex";
  const registro = JSON.parse(localStorage.getItem(LS_KEY)) || [];
  registro.push(data);
  localStorage.setItem(LS_KEY, JSON.stringify(registro));

  if (typeof GetResgistroDia === "function") GetResgistroDia();
  if (categoria === "ADICIONAL") {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then(() => {
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
    document.getElementById("casino").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("nombre").value = "";
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

function enviarDatos(data) {
  let registros = JSON.parse(localStorage.getItem("registrosBlackJack")) || [];
  registros.push(data);
  localStorage.setItem("registrosBlackJack", JSON.stringify(registros));
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then(() => {
      resetGame();
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        showAlert(
          "success",
          "Envio Exitoso.",
          "La información fue enviada correctamente.",
        );
      }, 2000);
    })
    .catch(() => {
      document.getElementById("loader").style.display = "none";
      showAlert(
        "error",
        "Error",
        "No se pudo enviar la información. Intenta nuevamente.",
      );
    });
}

function calcularScore(cartas) {
  let total = 0;
  let ases = 0;
  cartas.forEach((carta) => {
    const { val, isAce } = valueCard(carta.alt);
    total += val;
    if (isAce) ases++;
  });
  let ajustado = total;
  while (ajustado > 21 && ases > 0) {
    ajustado -= 10;
    ases--;
  }
  return { ajustado, totalOriginal: total };
}

function calcularResultado(score, cantidad) {
  if (score === 21 && cantidad === 2) return "BLACK JACK";
  if (score >= 18 && score <= 21) return "GANADOR (18-21)";
  if (score === 17) return "ANCAR (17)";
  if (score > 21) return "SUPERIOR A 21";
  return "SIN RESULTADO";
}

function showAlert(icon, title, text) {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: icon === "error" ? "#dc3545" : "#efb810",
    customClass: {
      popup: "mi-popup",
      title: "mi-titulo",
      confirmButton: "btn-Send mi-boton",
    },
  });
}

function verificarResetRegistro() {
  const hoy = new Date().toDateString();
  const ultimaFecha = localStorage.getItem("fechaBlackJack");

  if (ultimaFecha !== hoy) {
    localStorage.setItem("registrosBlackJack", JSON.stringify([]));
    localStorage.setItem("fechaBlackJack", hoy);
  }
}
verificarResetRegistro();

btn_send_secundario.addEventListener("click", () => {
  HandleSecondSubmit();
});

function HandleSecondSubmit() {
  const casinoModal = document.getElementById("casino_modal");
  const categoriaModal = document.getElementById("categoria_modal");
  const nombreModal = document.getElementById("nombre_modal");
  const horaModal = document.getElementById("hora_modal");
  const fechaModal = document.getElementById("fecha_modal");
  const bonoModal = document.getElementById("bono_modal");
  const opcionModal = document.getElementById("opcion_modal");
  const loader = document.getElementById("loader");

  if (categoriaModal.value == "ADICIONAL") {
    if (
      casinoModal.value == "" ||
      categoriaModal.value == "" ||
      nombreModal.value == "" ||
      horaModal.value == "" ||
      fechaModal.value == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Completa toda la información.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
  } else {
    if (
      casinoModal.value == "" ||
      categoriaModal.value == "" ||
      nombreModal.value == "" ||
      horaModal.value == "" ||
      fechaModal.value == "" ||
      bonoModal.value == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Completa toda la información.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
      return;
    }
  }

  const nomModal = nombreModal.value;
  const casModal = casinoModal.value;
  const catModal = categoriaModal.value;
  const valBonoModal = bonoModal.value;
  const valHora = horaModal.value;
  const valFecha = fechaModal.value;
  const valOpcion = opcionModal.value;

  var tipoOpcion = "";

  if (valOpcion == 1) {
    tipoOpcion = "BLACK JACK";
  } else if (valOpcion == 2) {
    tipoOpcion = "GANADOR (18-21)";
  } else if (valOpcion == 3) {
    tipoOpcion = "ANCAR (17)";
  } else if (valOpcion == 4) {
    tipoOpcion = "SUPERIOR A 21";
  }

  const data = {
    tipo: "envio_1",
    valor_1: valHora,
    valor_2: valFecha,
    valor_3: nomModal,
    valor_5: casModal,
    valor_6: catModal,
    valor_7: tipoOpcion,
    valor_8: valBonoModal,
    valor_9: promocion,
    valor_10: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((res) => {
      casinoModal.value = "";
      categoriaModal.value = "";
      nombreModal.value = "";
      horaModal.value = "";
      fechaModal.value = "";
      bonoModal.value = "";
      setTimeout(() => {
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Exito en el Envió",
          confirmButtonColor: "#dc3545",
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        });
      }, 2000);
    })
    .catch((error) => {
      console.log(error.error);
      loader.style.display = "none";
    });
}

function alertCasinoExiste() {
  const _casino = casino.value;
  const categoria_ = categoria.value;
  const tabla = obtenerTablaDesdeCasino(_casino);
  const premiosTabla = PREMIOS[tabla];

  if (!tabla) {
    Swal.fire({
      icon: "warning",
      title: "Casino no válido.",
    });
    return;
  }

  if (!(categoria_ in premiosTabla)) {
    Swal.fire({
      icon: "warning",
      title: "Este casino no tiene esa categoría",
    }).then((res) => {
      if (res.isConfirmed) {
        resetTablero();
      }
    });
    return;
  }
}

function handlePlantarse() {
  const valCategoria = document.getElementById("categoria").value;

  const calcularScore = () => {
    let total = 0;
    let ases = 0;
    const cartas = document.querySelectorAll("#CallCard img");

    cartas.forEach((carta) => {
      const nombre = carta.alt;
      const { val, isAce } = valueCard(nombre);
      total += val;
      if (isAce) ases++;
    });

    let ajustado = total;
    while (ajustado > 21 && ases > 0) {
      ajustado -= 10;
      ases--;
    }

    return {
      ajustado,
      totalOriginal: total,
      hayAs: total !== ajustado || ases > 0, // detecta si hay algún As
    };
  };
  const { ajustado } = calcularScore();
  if (ajustado === 17) {
    if (valCategoria == "GENIUS") {
      if (casino_table_1.includes(casino.value)) {
        alertWin(valCategoria, "$110.000", "Ancar");
      } else if (casino_table_2.includes(casino.value)) {
        alertWin(valCategoria, "$140.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "TITANIO") {
      if (casino_table_1.includes(casino.value)) {
        alertWin(valCategoria, "$100.000", "Ancar");
      } else if (casino_table_2.includes(casino.value)) {
        alertWin(valCategoria, "$130.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "LEGENDARIO") {
      if (casino_table_1.includes(casino.value)) {
        alertWin(valCategoria, "$90.000", "Ancar");
      } else if (casino_table_2.includes(casino.value)) {
        alertWin(valCategoria, "$120.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "GOLD") {
      if (casino_table_1.includes(casino.value)) {
        alertWin(valCategoria, "$80.000", "Ancar");
      } else if (casino_table_2.includes(casino.value)) {
        alertWin(valCategoria, "$110.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "SILVER") {
      if (casino_table_1.includes(casino.value)) {
        alertWin(valCategoria, "$70.000", "Ancar");
      } else if (casino_table_2.includes(casino.value)) {
        alertWin(valCategoria, "$100.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "BRONCE") {
      if (casino_table_1.includes(casino.value)) {
        alertWin(valCategoria, "$60.000", "Ancar");
      } else if (casino_table_2.includes(casino.value)) {
        alertWin(valCategoria, "$90.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "ESTANDAR") {
      if (casino_table_3.includes(casino.value)) {
        alertWin(valCategoria, "$60.000", "Ancar");
      } else if (casino_table_4.includes(casino.value)) {
        alertWin(valCategoria, "$90.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "SUPERIOR") {
      if (casino_table_3.includes(casino.value)) {
        alertWin(valCategoria, "$80.000", "Ancar");
      } else if (casino_table_4.includes(casino.value)) {
        alertWin(valCategoria, "$110.000", "Ancar");
      } else {
        alertCasinoExiste();
      }
    } else if (valCategoria == "SUPERIORMARCOPOLO") {
      alertWin(valCategoria, "$110.000", "Ancar");
    } else if (valCategoria == "ESTANDARMARCOPOLO") {
      alertWin(valCategoria, "$90.000", "Ancar");
    } else if (valCategoria == "SUPERIORALADDIN") {
      alertWin(valCategoria, "$80.000", "Ancar");
    } else if (valCategoria == "ESTANDARALADDIN") {
      alertWin(valCategoria, "$60.000", "Ancar");
    }
  } else {
    Swal.fire({
      title: "Estas seguro de plantarte?",
      text: "Si no cumple con el puntaje minimo no ganaras premio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Me planto!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Perdiste!",
          text: "Tu puntaje con tiene premio.",
          icon: "warning",
        });
        disableCards();
      }
    });
  }
}

btn_envia_observacion.addEventListener("click", () => {
  HandleObservacionSend();
});

function HandleObservacionSend() {
  const valCasino = document.getElementById("casino_observacion");
  const valObservacion = document.getElementById("descripcion_observacion");
  const loader = document.getElementById("loader");

  const valCasinoObs = valCasino.value.trim();
  const valObservacionObs = valObservacion.value.trim();

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

  if (!valCasinoObs || !valObservacionObs) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Debes llenar todos los campos.",
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "btn-Send mi-boton",
      },
    });
    return;
  }

  loader.style.display = "flex";

  const data = {
    tipo: "envio_2",
    valor_1: hora,
    valor_2: fecha,
    valor_3: valCasinoObs,
    valor_4: valObservacionObs,
    valor_5: user.Nombre,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {
      valCasino.value = "";
      valObservacion.value = "";

      loader.style.display = "none";
      getDataObs();
      Swal.fire({
        icon: "success",
        title: "Éxito en el Envió",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al enviar la información.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "btn-Send mi-boton",
        },
      });
    });
}

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
                    data-resultado="${r.valor_7}"
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
    { casino, categoria, nombre, cedula, fecha, hora, resultado },
    valBono,
  ) {
    const regs = getRegs();
    const idx = regs.findIndex(
      (r) =>
        String(r.valor_7).trim() === String(resultado).trim() &&
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
      resultado = "",
    } = btn.dataset;

    const data = {
      tipo: "envio_1",
      valor_1: hora,
      valor_2: fecha,
      valor_3: nombre,
      valor_5: casino,
      valor_6: categoria,
      valor_7: resultado,
      valor_8: valBonoregistr,
      valor_9: promocion,
      valor_10: user.Nombre,
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
          resultado,
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
GetResgistroDia();

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
                   const horaFormateada = new Date(
                     registro.Hora,
                   ).toLocaleTimeString("es-CO", {
                     hour: "2-digit",
                     minute: "2-digit",
                   });

                   return `<tr>
                              <td>${i + 1}</td>
                              <td>${registro.Usuario}</td>
                              <td>${horaFormateada}</td> 
                              <td>${registro.Fecha.substring(0, 10)}</td>
                              <td>${registro.Observacion}</td>
                              <td>${registro.Casino}</td>
                              ${registro.Estado == "" ? `<td class="pendi_obs">Pendiente</td>` : `<td class="corre_obs">Corregido</td>`}
                              
                            </tr>`;
                 })
                 .join("")}
              </tbody>
            </table>
          </div>
        `;
    });
}
getDataObs();

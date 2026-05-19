window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const formatoPesos_monto_efectivo = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const _id_balon_ = document.getElementById("_id_balon_");
const dado_1 = document.getElementById("dado_1");
const dado_2 = document.getElementById("dado_2");
const dado_3 = document.getElementById("dado_3");
const categoria = document.getElementById("categoria");

const numeroAfuera = ["9", "10", "11", "12"];
const numeroPalo = ["4", "17", "5", "6", "15", "16", "7", "8", "13", "14"];
const numeroArquero = ["111", "222", "333", "444", "555"];
const numeroGol = ["666", "18"];

let accion1 = "Marcaste un gran gol";
let accion2 = "El arquero te lo tapo";
let accion3 = "El remate pego en el palo";
let accion4 = "El remate salio desviado";

_id_balon_.addEventListener("click", () => {});

categoria.addEventListener("change", () => {
  if (categoria.value == "") {
    dado_1.disabled = true;
  } else {
    dado_1.disabled = false;
  }
});

function moveBallDina(posi, num) {
  _id_balon_.classList.add(`posicion_${posi}`);
  let realNum;
  if (posi.includes("suma_")) {
    realNum = posi.split("suma_")[1];
  } else {
    realNum = posi;
  }
  setTimeout(() => {
    validateAlert(realNum);
  }, 800);
}

function validateAlert(num) {
  let Allitem = obtenerPremio(categoria.value, Number(num));
  let valPremio = Allitem.premio;
  let valAccion = Allitem.accion;

  Swal.fire({
    html: `<div class="_content_msj_alerta_">
    <img src="/dinamicas/promocion-jugada-ganadora/resources/jugador_ala.png" alt="Aladdin">
            <p>Con ${categoria.value}</p>
            <br/>
            <span>${valAccion} y obtuviste un premio de ${formatoPesos_monto_efectivo.format(valPremio)}, en Dinero Promocional</span>
          </div>`,
    customClass: {
      popup: "_content_alerta_",
    },
    allowOutsideClick: false,
  });
  confettiAl();
}

const premiosCategorias = {
  BRONCE: {
    TRIPLE_6: {
      numeros: [666],
      premio: 500000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 200000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 110000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 100000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 90000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 80000,
      accion: accion4,
    },
  },

  SILVER: {
    TRIPLE_6: {
      numeros: [666],
      premio: 700000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 250000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 120000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 110000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 100000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 90000,
      accion: accion4,
    },
  },

  GOLD: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1000000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 300000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 130000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 120000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 110000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 100000,
      accion: accion4,
    },
  },

  LEGENDARIO: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1300000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 350000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 140000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 130000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 120000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 110000,
      accion: accion4,
    },
  },

  TITANIO: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1500000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 400000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 150000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 140000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 130000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 120000,
      accion: accion4,
    },
  },

  GENIUS: {
    TRIPLE_6: {
      numeros: [666],
      premio: 2000000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 500000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 160000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 150000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 140000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 130000,
      accion: accion4,
    },
  },

  ESTANDAR: {
    TRIPLE_6: {
      numeros: [666],
      premio: 500000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 200000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 120000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 100000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 90000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 80000,
      accion: accion4,
    },
  },

  SUPERIOR: {
    TRIPLE_6: {
      numeros: [666],
      premio: 1000000,
      accion: accion1,
    },

    TRIPLE_1_2_3_4_5: {
      numeros: [111, 222, 333, 444, 555],
      premio: 300000,
      accion: accion2,
    },

    SUMA_4_17: {
      numeros: [4, 17],
      premio: 150000,
      accion: accion3,
    },

    SUMA_5_6_15_16: {
      numeros: [5, 6, 15, 16],
      premio: 120000,
      accion: accion3,
    },

    SUMA_7_8_13_14: {
      numeros: [7, 8, 13, 14],
      premio: 110000,
      accion: accion3,
    },

    SUMA_9_10_11_12: {
      numeros: [9, 10, 11, 12],
      premio: 100000,
      accion: accion4,
    },
  },
};

function obtenerPremio(categoria, numero) {
  const premios = premiosCategorias[categoria];

  if (!premios) {
    return "Categoría no existe";
  }

  for (const key in premios) {
    const jugada = premios[key];

    if (jugada.numeros.includes(numero)) {
      return {
        premio: jugada.premio,
        accion: jugada.accion,
      };
    }
  }

  return "No ganó";
}

dado_1.addEventListener("change", () => {
  if (dado_1.value == "") {
    dado_2.disabled = true;
  } else {
    dado_2.disabled = false;
  }
});

dado_2.addEventListener("change", () => {
  if (dado_2.value == "") {
    dado_3.disabled = true;
  } else {
    dado_3.disabled = false;
  }
});

dado_3.addEventListener("change", () => {
  if (dado_3.value == "") {
    dado_3.disabled = false;
  } else {
    dado_3.disabled = true;
    let valorPosi = "";
    let totalLanza =
      Number(dado_1.value) + Number(dado_2.value) + Number(dado_3.value);

    if (dado_1.value == "6" && dado_2.value == "6" && dado_3.value == "6") {
      valorPosi = "666";
    } else if (
      dado_1.value == "5" &&
      dado_2.value == "5" &&
      dado_3.value == "5"
    ) {
      valorPosi = "555";
    } else if (
      dado_1.value == "4" &&
      dado_2.value == "4" &&
      dado_3.value == "4"
    ) {
      valorPosi = "444";
    } else if (
      dado_1.value == "3" &&
      dado_2.value == "3" &&
      dado_3.value == "3"
    ) {
      valorPosi = "333";
    } else if (
      dado_1.value == "2" &&
      dado_2.value == "2" &&
      dado_3.value == "2"
    ) {
      valorPosi = "222";
    } else if (
      dado_1.value == "1" &&
      dado_2.value == "1" &&
      dado_3.value == "1"
    ) {
      valorPosi = "111";
    } else {
      valorPosi = "suma_" + totalLanza;
    }
    categoria.disabled = true;
    setTimeout(() => {
      moveBallDina(valorPosi, totalLanza);
    }, 800);
  }
});

function deshabilitarItem(elemento) {
  document.getElementById(elemento).disabled = true;
}

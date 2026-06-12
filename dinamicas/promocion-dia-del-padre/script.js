window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const btn_send_padre = document.getElementById("btn_send_padre");
const btn_validar_padre = document.getElementById("btn_validar_padre");
const nombre = document.getElementById("nombre");
const casino = document.getElementById("casino");
const cedula = document.getElementById("cedula");
const categoria = document.getElementById("categoria");
const url =
  "https://script.google.com/macros/s/AKfycbxYm5E7Nc_3ATPxfWVRxMUNCUDf0P2pOvudcivtPZGSdnic4cZea7N0GfVMdw7NP8RU/exec";

btn_validar_padre.addEventListener("click", () => {
  validarPremio(casino.value, categoria.value);
});

function validarPremio(casiVal, catVal) {
  console.log(casiVal);
  console.log(catVal);
  let premio = obtenerPremio(casiVal, catVal);

  let data = {
    Premio: premio,
    Casino: casiVal,
    Categoria: catVal,
  };

  let mensaje_win = `Con ${catVal}, Obtuviste un premio de ${premio}`;

  if (premio == "no valido") {
    Swal.fire({
      html: `<div class="_alert_intentar">
      <img src="/dinamicas/promocion-88-fortune/resources/decepcion.png" alt="Aladdin" >
      <p>Combinación sin Premio, Inténtalo Nuevamente</p>
      </div>`,
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
      },
    });
  } else {
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

    confettiAl();
    btn_send_padre.style.display = "flex";
    btn_validar_padre.style.display = "none";
  }
}

btn_send_padre.addEventListener("click", () => {
  handleSendPadre();
});

const user = inforUser();

function handleSendPadre() {
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

  if (!nombre.value || !casino.value || !categoria.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "dinamica",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Casino: casino.value,
    Categoria: categoria.value,
    Promocion: "Dia del Padre",
    Usuario: user.Nombre,
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
      casino.value = "";
      categoria.value = "";
      Swal.fire({
        icon: "success",
        title: "Envió Exitoso",
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

function obtenerPremio(casinoLocal, categoria) {
  const basePremios = {
    "A50-58": { estandar: "$ 60.000", superior: "$ 80.000" },
    A38: { estandar: "$ 60.000", superior: "$ 80.000" },
    A35: { estandar: "$ 60.000", superior: "$ 80.000" },
    A36: { estandar: "$ 60.000", superior: "$ 80.000" },
    A39: { estandar: "$ 60.000", superior: "$ 80.000" },
    A88: { estandar: "$ 60.000", superior: "$ 80.000" },
    A48: { estandar: "$ 60.000", superior: "$ 80.000" },
    A49: { estandar: "$ 60.000", superior: "$ 80.000" },
    MP100: { estandar: "$ 60.000", superior: "$ 80.000" },
    A781: { estandar: "$ 60.000", superior: "$ 80.000" },

    A05: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A07: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A08: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A12: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    MP15: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A16: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A19: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    "A50 - A58": {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    "'0": {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    L08: {
      bronce: "$ 80.000",
      silver: "$ 90.000",
      gold: "$ 100.000",
      legendario: "$ 110.000",
      titanio: "$ 120.000",
      genius: "$ 150.000",
    },
    A09: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A127: {
      bronce: "$ 80.000",
      silver: "$ 90.000",
      gold: "$ 100.000",
      legendario: "$ 110.000",
      titanio: "$ 120.000",
      genius: "$ 150.000",
    },
    A43: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
    A53: {
      bronce: "$ 60.000",
      silver: "$ 70.000",
      gold: "$ 80.000",
      legendario: "$ 90.000",
      titanio: "$ 100.000",
      genius: "$ 150.000",
    },
  };

  if (!casinoLocal || !categoria) return "no valido";

  const localLimpio = String(casinoLocal).trim();
  const catLimpia = String(categoria).trim().toLowerCase();

  if (basePremios[localLimpio] && basePremios[localLimpio][catLimpia]) {
    return basePremios[localLimpio][catLimpia];
  }

  return "no valido";
}

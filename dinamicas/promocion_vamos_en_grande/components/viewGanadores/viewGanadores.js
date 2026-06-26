const url =
  "https://script.google.com/macros/s/AKfycbyZV3Y8YB91ZQGdSY2O1yECcmSLKfbsggU7sTr-B70TCqN2mriwRPWZ4VYGABcTOpxO/exec";

const content_casino_win = document.getElementById("content_casino_win");
const content_nombre_win = document.getElementById("content_nombre_win");
const numero_ganador = document.getElementById("numero_ganador");
const content_titulo_premio = document.getElementById("content_titulo_premio");
const content_monto_premio = document.getElementById("content_monto_premio");

// ACA HACE LA ACTUALIZACION SIN NECESIDAD DEL INTERVAL

// const bc = new BroadcastChannel("GANADORES_SYNC");

// bc.onmessage = (ev) => {
//   if (ev.data?.type === "WINNER_UPDATED") {
//     getLastaWinner(); // 1 solo GET
//   }
// };

// window.addEventListener("storage", (e) => {
//   if (e.key === "WINNER_UPDATED") getLastaWinner();
// });

const casinos = {
  A05: "Mall Plaza",
  A07: "Karaoke",
  A08: "Plaza Cayzedo",
  A09: "BUGA",
  A12: "Cosmocentro",
  "A12-MESAS": "Cosmocentro",
  MP15: "Hotel Inter",
  A15: "Hotel Inter",
  "A15-MESAS": "Hotel Inter",
  A16: "Mi Tierra - Cosmo",
  A19: "Aladdin Sport Bar",
  A35: "De la 18",
  A36: "Mi Tierra",
  "A36-MESAS": "Mi Tierra",
  A38: "Cll Sarmiento",
  A39: "De la 22",
  A43: "Dragón Fénix",
  A48: "Tequendama",
  "A48-MESAS": "Tequendama",
  A49: "Septima",
  A50: "Terminal #1",
  MP53: "CC Mallplaza",
  A53: "CC Mallplaza",
  A58: "Terminal #2",
  A70: "Calima",
  A781: "CC Alamedas",
  A88: "Del Lago",
  MP100: "Marco Polo",
  A100: "Marco Polo",
  MP108: "Holguines",
  A108: "Holguines",
  "A108-MESAS": "Holguines",
  MP127: "Millonarios",
  A127: "Millonarios",
  "A127-MESAS": "Millonarios",
};

function obtenerCasino(codigo) {
  if (casinos[codigo]) {
    return codigo + " | " + casinos[codigo];
  } else {
    return "Casino no encontrado";
  }
}

function getLastaWinner() {
  const fechaCompleta_validate_register = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
  });

  const [fecha_reg, anio_res] = fechaCompleta_validate_register.split(" de ");
  fetch(
    `${url}?hoja=ganador&mesbus=${fecha_reg}&anobus=${anio_res}&t=${Date.now()}`,
    {
      cache: "no-store",
    },
  )
    .then((res) => res.json())
    .then((data) => {
      let winInfo = data.reverse()[0];
      content_casino_win.innerHTML = obtenerCasino(winInfo.Casino);
      content_nombre_win.innerHTML =
        winInfo.Nombre.length > 18
          ? winInfo.Nombre.substring(0, 18) + "..."
          : winInfo.Nombre;
      numero_ganador.src = `/dinamicas/promocion_lo_hacemos_en_grande/resources/numeros/${winInfo.Numero}.png`;
    });
}

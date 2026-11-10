window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const horaFull = document.getElementById("cuenta-regresiva");
let _currenty_cont_ = document.getElementById("_currenty_cont_");
// if (!horaFull) {
//   return;
// } else {
function actualizarCuentaRegresiva() {
  const ahora = new Date();

  const fechaLimite = new Date("2026-12-18T20:59:59");

  let dias_pr = document.getElementById("dias_pr");
  let horas_pr = document.getElementById("horas_pr");
  let min_pr = document.getElementById("min_pr");
  let seg_pr = document.getElementById("seg_pr");

  const diferencia = fechaLimite - ahora;

  if (diferencia <= 0) {
    horaFull.innerText = "¡El tiempo ha terminado!";
    dias_pr.innerHTML = "00";
    horas_pr.innerHTML = "00";
    min_pr.innerHTML = "00";
    seg_pr.innerHTML = "00";
    return;
  }

  const segundosTotales = Math.floor(diferencia / 1000);
  const dias = Math.floor(segundosTotales / (60 * 60 * 24));
  const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  horaFull.innerText = ` ${dias}d ${horas}h ${minutos}m ${segundos}s.`;
  dias_pr.innerHTML = String(dias).padStart(2, "0");
  horas_pr.innerHTML = String(horas).padStart(2, "0");
  min_pr.innerHTML = String(minutos).padStart(2, "0");
  seg_pr.innerHTML = String(segundos).padStart(2, "0");
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);

window.getAllConteoCrono = function () {
  let result_dia_acumula = document.getElementById("result_conteo");
  let url = `https://script.google.com/macros/s/AKfycbwplk_G2VgnwPXupvc2vyA0WpcguP514S-5irHySvN17RbDhOdLbuX5T-rN8j-59EYPqw/exec?hoja=dinamica`;
  let urna_animada_container = document.getElementById(
    "urna_animada_container",
  );
  let _urna_sorteo_ = document.getElementById("_urna_sorteo_");
  if (result_dia_acumula) {
    result_dia_acumula.innerHTML = `Cargando...`;
  }
  urna_animada_container.style.display = "block";
  lanzarTiquetesConfeti();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        let loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
        if (result_dia_acumula) {
          result_dia_acumula.innerHTML = `Sin Registros (0 / 9999)`;
          result_dia_acumula.style.display = "flex";
        }
        return;
      }

      let numerosRegistradosSet = new Set();
      data.forEach((registro) => {
        let resultadoTexto = String(registro.Resultado || "");
        let numerosArray = resultadoTexto.split(/[.,]/);
        numerosArray.forEach((numIndividual) => {
          let numeroLimpio = numIndividual.trim();
          if (numeroLimpio) {
            numerosRegistradosSet.add(String(numeroLimpio).padStart(4, "0"));
          }
        });
      });

      const TOTAL_MAXIMO = 9999;
      let totalOcupados = numerosRegistradosSet.size;
      let _currenty_cont_ = document.getElementById("_currenty_cont_");
      if (_currenty_cont_) {
        _currenty_cont_.innerHTML = totalOcupados + " / " + TOTAL_MAXIMO;
        if(totalOcupados >= 2500){
            _urna_sorteo_.src = "/dinamicas/crono_premio/resources/2b.png";
        }

        if(totalOcupados >= 5000){
            _urna_sorteo_.src = "/dinamicas/crono_premio/resources/3b.png";
        }

        if(totalOcupados >= 9000){
            _urna_sorteo_.src = "/dinamicas/crono_premio/resources/4b.png";
        }
        setTimeout(() => {
          urna_animada_container.style.display = "none";
        }, 6000);
      }
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      if (result_dia_acumula) {
        result_dia_acumula.innerHTML = `Error al cargar los datos.`;
      }
    });
};

window.getAllConteoCrono();
getAllConteoCrono();

function lanzarTiquetesConfeti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;

  const duracionTotal = 10000; 
  const tiempoInicio = Date.now();

  const intervaloCreacion = setInterval(() => {
    if (Date.now() - tiempoInicio >= duracionTotal) {
      clearInterval(intervaloCreacion);
      return;
    }

    const ticket = document.createElement("div");
    ticket.classList.add("ticket-confetti");

    ticket.style.left = Math.random() * 100 + "vw";

    const duracionCaida = Math.random() * 2 + 2.5;
    ticket.style.animationDuration = duracionCaida + "s";

    ticket.innerHTML = "🟨";

    container.appendChild(ticket);

    setTimeout(() => {
      ticket.remove();
    }, 5000);
  }, 150); 
}

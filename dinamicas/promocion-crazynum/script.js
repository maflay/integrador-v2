window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

function padZero(str, length) {
  return str.padStart(length, "0");
}

function iniciarBusqueda() {
  const numeroInput = document.getElementById("numeroInput");
  const contenedor = document.querySelector(".content_numeros_gene");
  contenedor.innerHTML = ""; // Limpiar contenedor anterior

  const cantidad = parseInt(numeroInput.value);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingresa una cantidad válida");
    return;
  }
  let cargando = document.createElement("p");
  cargando.textContent = "Cargando...";
  contenedor.appendChild(cargando);
  let tiempoTranscurido = 0;
  const duracionTotal = 5000; 
  const intervaloVelocidad = 50;

  let elementosCreados = [];

  for (let i = 0; i < cantidad; i++) {
    let valorEntrada = document.createElement("p");
    valorEntrada.classList.add("itemt_show", "display-box");
    valorEntrada.textContent = "0000"; // Texto inicial temporal
    contenedor.appendChild(valorEntrada);
    elementosCreados.push(valorEntrada);
  }

  const intervalId = setInterval(() => {
    tiempoTranscurido += intervaloVelocidad;

    elementosCreados.forEach((el) => {
      let randomTemp = Math.floor(Math.random() * 9999) + 1;
      el.textContent = String(randomTemp).padStart(4, "0");
    });

    if (tiempoTranscurido >= duracionTotal) {
      clearInterval(intervalId);
      cargando.remove();
      elementosCreados.forEach((el, index) => {
        let randomFinal = Math.floor(Math.random() * 9999) + 1;
        let numeroFormateado = String(randomFinal).padStart(4, "0");

        el.id = numeroFormateado;
        el.textContent = numeroFormateado;

        setTimeout(() => {
          el.classList.add("add_flex");
        }, index * 1000);
      });
    }
  }, intervaloVelocidad);
}

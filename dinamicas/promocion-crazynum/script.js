window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// function iniciarBusqueda() {
//   const numeroInput = document.getElementById("numeroInput");
//   const contenedor = document.querySelector(".content_numeros_gene");
//   contenedor.innerHTML = "";

//   const cantidad = parseInt(numeroInput.value);
//   if (isNaN(cantidad) || cantidad <= 0) {
//     alert("Ingresa una cantidad válida");
//     return;
//   }

//   let cargando = document.createElement("p");
//   cargando.textContent = "Cargando...";
//   contenedor.appendChild(cargando);

//   const hoyStr = new Date().toISOString().slice(0, 10);
//   let historialKey = `numeros_usados_${hoyStr}`;

//   let numerosYaUsados = JSON.parse(localStorage.getItem(historialKey)) || [];

//   let numerosDisponibles = [];
//   for (let i = 1; i <= 9999; i++) {
//     let numStr = String(i).padStart(4, "0");
//     if (!numerosYaUsados.includes(numStr)) {
//       numerosDisponibles.push(numStr);
//     }
//   }

//   if (numerosDisponibles.length < cantidad) {
//     cargando.remove();
//     Swal.fire({
//       icon: "error",
//       title: "¡Límite alcanzado!",
//       text: "Ya se han agotado los números disponibles para el día de hoy.",
//     });
//     return;
//   }

//   for (let i = numerosDisponibles.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     let temp = numerosDisponibles[i];
//     numerosDisponibles[i] = numerosDisponibles[j];
//     numerosDisponibles[j] = temp;
//   }

//   let numerosSeleccionados = numerosDisponibles.slice(0, cantidad);

//   numerosYaUsados.push(...numerosSeleccionados);
//   localStorage.setItem(historialKey, JSON.stringify(numerosYaUsados));

//   let tiempoTranscurido = 0;
//   const duracionTotal = 1000;
//   const intervaloVelocidad = 50;
//   let elementosCreados = [];

//   for (let i = 0; i < cantidad; i++) {
//     let valorEntrada = document.createElement("p");
//     valorEntrada.classList.add("itemt_show", "display-box");
//     valorEntrada.textContent = "0000";
//     contenedor.appendChild(valorEntrada);
//     elementosCreados.push(valorEntrada);
//   }

//   const intervalId = setInterval(() => {
//     tiempoTranscurido += intervaloVelocidad;

//     elementosCreados.forEach((el) => {
//       let randomTemp = Math.floor(Math.random() * 9999) + 1;
//       el.textContent = String(randomTemp).padStart(4, "0");
//     });

//     if (tiempoTranscurido >= duracionTotal) {
//       clearInterval(intervalId);
//       cargando.remove();

//       elementosCreados.forEach((el, index) => {
//         let numeroFormateado = numerosSeleccionados[index];

//         el.id = numeroFormateado;
//         el.textContent = numeroFormateado;

//         setTimeout(() => {
//           el.classList.add("add_flex");
//         }, index * 1000);
//       });
//     }
//   }, intervaloVelocidad);
// }

async function iniciarBusqueda() {
  const numeroInput = document.getElementById("numeroInput");
  const contenedor = document.querySelector(".content_numeros_gene");
  contenedor.innerHTML = "";

  const cantidad = parseInt(numeroInput.value * 2);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingresa una cantidad válida");
    return;
  }

  let cargando = document.createElement("p");
  cargando.textContent = "Verificando números disponibles...";
  contenedor.appendChild(cargando);

  try {
    // 1. Consultamos a tu Google Script todos los registros del día
    // (Asegúrate de que tu Apps Script devuelva todos los registros si no le mandas cédula, o crea un parámetro ?hoja=dinamica&todos=true)
    let url = `https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec?hoja=dinamica`;

    let response = await fetch(url);
    let data = await response.json();

    // 2. Extraemos todos los números que ya han salido hoy en la base de datos
    let numerosOcupados = [];
    if (data && Array.isArray(data)) {
      data.forEach((registro) => {
        let resultadoTexto = String(registro.Resultado || "");
        let numerosArray = resultadoTexto.split(/[.,]/);
        numerosArray.forEach((num) => {
          let limpio = num.trim();
          if (limpio) {
            numerosOcupados.push(String(limpio).padStart(4, "0"));
          }
        });
      });
    }

    // 3. Construimos la lista de números disponibles (del 0001 al 9999 excluyendo los ocupados)
    let numerosDisponibles = [];
    for (let i = 1; i <= 9999; i++) {
      let numStr = String(i).padStart(4, "0");
      if (!numerosOcupados.includes(numStr)) {
        numerosDisponibles.push(numStr);
      }
    }

    // Validar si quedan suficientes números
    if (numerosDisponibles.length < cantidad) {
      cargando.remove();
      Swal.fire({
        icon: "error",
        title: "¡Límite alcanzado!",
        text: "No hay suficientes números libres en la base de datos para completar esta cantidad."
      });
      return;
    }

    // 4. Barajamos los disponibles (Fisher-Yates) de forma aleatoria
    for (let i = numerosDisponibles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = numerosDisponibles[i];
      numerosDisponibles[i] = numerosDisponibles[j];
      numerosDisponibles[j] = temp;
    }

    // 5. Tomamos exactamente la cantidad solicitada
    let numerosSeleccionados = numerosDisponibles.slice(0, cantidad);
    cargando.remove();

    // 6. Mostramos la animación en pantalla con los números ya filtrados
    let tiempoTranscurido = 0;
    const duracionTotal = 1000;
    const intervaloVelocidad = 50;
    let elementosCreados = [];

    for (let i = 0; i < cantidad; i++) {
      let valorEntrada = document.createElement("p");
      valorEntrada.classList.add("itemt_show", "display-box");
      valorEntrada.textContent = "0000";
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

        elementosCreados.forEach((el, index) => {
          let numeroFormateado = numerosSeleccionados[index];
          el.id = numeroFormateado;
          el.textContent = numeroFormateado;

          setTimeout(() => {
            el.classList.add("add_flex");
          }, index * 1000);
        });
      }
    }, intervaloVelocidad);

  } catch (error) {
    console.error("Error al obtener los números de la base de datos:", error);
    cargando.remove();
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo verificar la disponibilidad de los números en el servidor."
    });
  }
}

document.getElementById("btn_enviar").addEventListener("click", () => {
  handleSendInfo();
});

function handleSendInfo() {
  let numeroInput = document.getElementById("numeroInput");
  let loader = document.getElementById("loader");
  let nombre = document.getElementById("nombre");
  let cedula = document.getElementById("cedula");
  let casino = document.getElementById("casino");
  let categoria = document.getElementById("categoria");
  let user = inforUser();
  let Promocion = "Núnmeros Locos";
  let url =
    "https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec";
  const elementosNumeros = document.querySelectorAll(".add_flex");

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
    tipo: "envio_1",
    valor_1: hora,
    valor_2: fecha,
    valor_3: nombre.value,
    valor_4: cedula.value,
    valor_5: casino.value,
    valor_6: categoria.value,
    valor_7: Array.from(elementosNumeros).map((item) => item.textContent),
    valor_8: "",
    valor_9: Promocion,
    valor_10: user.Nombre,
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
      cedula.value = "";
      categoria.value = "";
      casino.value = "";
      numeroInput.value = "";
      const contenedor = document.querySelector(".content_numeros_gene");
      contenedor.innerHTML = "";
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

document.getElementById("btn_cedu_search").addEventListener("click", () => {
  if (document.getElementById("val_cedu_search").value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  } else {
    getData();
  }
});

function getData() {
  let result_dia_acumula = document.getElementById("result_dia_acumula");
  let cedula = document.getElementById("val_cedu_search").value;
  let url = `https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec?hoja=dinamica&cedula=${cedula}`;

  result_dia_acumula.innerHTML = `Cargando...`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length > 0) {
        let clienteNombre = data[0].Nombre || "CLIENTE";
        let casinoNombre = data[0].Casino || "";

        // Extraer todos los números asociados
        let listaNumeros = [];
        let fechasRegistros = [];

        data.forEach((registro) => {
          let resultadoTexto = String(registro.Resultado || "");
          let numerosArray = resultadoTexto.split(/[.,]/);

          let horaFormateada = "";
          if (registro.Hora) {
            try {
              horaFormateada = new Date(registro.Hora).toLocaleTimeString(
                "es-CO",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );
            } catch (e) {
              horaFormateada = "";
            }
          }
          let fechaStr = registro.Fecha ? registro.Fecha.substring(0, 10) : "";
          if (fechaStr) fechasRegistros.push(`${fechaStr} ${horaFormateada}`);

          numerosArray.forEach((numIndividual) => {
            let numeroLimpio = numIndividual.trim();
            if (numeroLimpio) {
              listaNumeros.push(String(numeroLimpio).padStart(4, "0"));
            }
          });
        });

        let fechaImpresion =
          fechasRegistros[0] || new Date().toLocaleString("es-CO");

        // Construcción de la lista de números para la tirilla
        let numerosHTML = listaNumeros
          .map(
            (num, idx) => `
            <div class="tirilla-item">
              <span>#${idx + 1}</span>
              <strong class="tirilla-num">${num}</strong>
            </div>
          `,
          )
          .join("");

        // Filas para la vista normal en pantalla (Tabla)
        let filasTablaHTML = listaNumeros
          .map(
            (num, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${clienteNombre}</td>
              <td>${fechaImpresion}</td>
              <td><strong>${num}</strong></td>
              <td>${casinoNombre}</td>
            </tr>
          `,
          )
          .join("");

        // Guardamos los datos estructurados para la impresión en una propiedad global
        window.datosTirillaActual = {
          nombre: clienteNombre,
          cedula: cedula,
          casino: casinoNombre,
          fecha: fechaImpresion,
          numeros: listaNumeros,
        };

        result_dia_acumula.innerHTML = `
          <div style="margin-bottom: 10px; text-align: right;">
            <button onclick="imprimirResultadosPOS()" class="btn-imprimir" title="Imprimir Tirilla">
              <img id="_excel_search_" src="/resource/impresion.png" alt="Imprimir">
            </button>
          </div>
          <div class="table-result table-scrolld table_all_data">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Número</th>
                  <th>Casino</th>
                </tr>
              </thead>
              <tbody>
                ${filasTablaHTML}
              </tbody>
            </table>
          </div>
        `;
      } else {
        console.log("No se encontró ninguna coincidencia.");
        result_dia_acumula.innerHTML = `No se encontró ninguna coincidencia.`;

        Swal.fire({
          icon: "error",
          title: `Error en la verificación.`,
          text: `No se encontró ninguna coincidencia.`,
        });
      }
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      result_dia_acumula.innerHTML = `Error al cargar los datos.`;
    });
}

function imprimirResultadosPOS() {
  let datos = window.datosTirillaActual;
  if (!datos) {
    Swal.fire({ icon: "warning", title: "No hay datos para imprimir" });
    return;
  }

  let contenedor = document.getElementById("print-container");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "print-container";
    document.body.appendChild(contenedor);
  }

  let numerosTirilla = datos.numeros
    .map(
      (num, idx) => `
        <div class="pos-row">
          <span>NÚMERO ${idx + 1}:</span>
          <span class="pos-num">${num}</span>
        </div>
      `,
    )
    .join("");

  contenedor.innerHTML = `
        <div class="ticket-pos">
            <div class="pos-header">
                <h2>CASINOS ALADDIN</h2>
                <p><strong>PROMO: NÚMEROS LOCOS</strong></p>
                <p>CASINO: ${datos.casino || "GENERAL"}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-info">
                <p><strong>CLIENTE:</strong> ${datos.nombre}</p>
                <p><strong>CÉDULA:</strong> ${datos.cedula}</p>
                <p><strong>FECHA:</strong> ${datos.fecha}</p>
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-title">NÚMEROS REGISTRADOS</div>
            <div class="pos-numeros">
                ${numerosTirilla}
            </div>
            <div class="pos-divider">--------------------------------</div>
            <div class="pos-footer">
                <p>TOTAL JUGADAS: ${datos.numeros.length}</p>
                <p>¡Gracias por participar!</p>
                <p>Conserve este tiquete</p>
            </div>
        </div>
    `;

  window.print();

  setTimeout(() => {
    contenedor.innerHTML = "";
  }, 1000);
}

document
  .getElementById("btn_envia_observacion")
  .addEventListener("click", () => {
    handleSenObs();
  });

function handleSenObs() {
  let loader = document.getElementById("loader");
  let casino_observacion = document.getElementById("casino_observacion");
  let descripcion_observacion = document.getElementById(
    "descripcion_observacion",
  );
  let user = inforUser();
  let url = `https://script.google.com/macros/s/AKfycbxnGHMOWMRLHh8L35p3Hhd0f4dWj9lu7bqsXkM5q6qX1xHu_mhUGCJ2h53Au_zYli0IMw/exec`;
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

  if (casino_observacion.value == "" || descripcion_observacion.value == "") {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let data = {
    tipo: "envio_2",
    valor_1: hora,
    valor_2: fecha,
    valor_3: casino_observacion.value,
    valor_4: descripcion_observacion.value,
    valor_5: user.Nombre,
  };

  loader.style.display = "flex";
  fetch(`${url}`, {
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

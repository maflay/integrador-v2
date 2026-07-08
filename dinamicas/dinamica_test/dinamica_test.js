// const num_test = document.getElementById("numero_ejemplo");

// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         console.log("¡Entró! El contenido cambió a:", num_test.innerHTML);
//         entroCarganueva();
//     });
// });

// observer.observe(num_test, {
//     childList: true,
//     characterData: true,
//     subtree: true
// });

// function ejemploCarga(){
//     console.log("entro a ejemplo Carga");
// }

// // observer.observe(document.getElementById("numero_ejemplo"), { childList: true });

// function entroCarganueva(){
//     console.log("entro nueva peticion");
//     setTimeout(() => {
//         console.log("cargando peticion");
//     }, 1500);
//     setTimeout(() => {
//         console.log("solicitando datos");
//     }, 3000);
//     setTimeout(() => {
//         console.log("datos entregados");
//     }, 4500);
// }

document.addEventListener("DOMContentLoaded", function () {
  var iconoRojo = document.querySelector(".abrir-menu-pantalla img");
  var checkbox = document.getElementById("toggle-menu-completo");
  var enlaces = document.querySelectorAll(".enlaces-pantalla-completa a");

  if (iconoRojo && checkbox) {
    iconoRojo.addEventListener("click", function () {
      checkbox.checked = true;
    });
  }

  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  });
});

testMatriz();

function testMatriz() {
  const matriz2 = [
    [5, 8, 1],
    [2, 7, 6],
    [3, 9, 4],
  ];

  const plano2 = matriz2.flat();

  const ascendente = [...plano2].sort((a, b) => a - b);
  const descendente = [...plano2].sort((a, b) => b - a);

  const pares = plano2.filter((n) => n % 2 === 0);
  const impares = plano2.filter((n) => n % 2 !== 0);

  console.log("Ascendente:", ascendente);
  console.log("Descendente:", descendente);
  console.log("Pares:", pares);
  console.log("Impares:", impares);

  const matriz = [
    ["T", 8, 1],
    [2, "B", "F"],
    [3, 9, "A"],
  ];

  const plano = matriz.flat();

  const numeros = plano.filter((item) => typeof item === "number");
  const letras = plano.filter((item) => typeof item === "string");

  const numAsc = [...numeros].sort((a, b) => a - b);
  const numDesc = [...numeros].sort((a, b) => b - a);

  const letrasAsc = [...letras].sort();
  const letrasDesc = [...letras].sort().reverse();

  console.log("Números (Asc):", numAsc);
  console.log("Letras (Asc):", letrasAsc);
  console.log(
    "Todos los Pares:",
    numeros.filter((n) => n % 2 === 0),
  );
  console.log(
    "Todos los Impares:",
    numeros.filter((n) => n % 2 !== 0),
  );
}

consultaW();
function consultaW(){
  const prueba = document.createElement("button");
  prueba.textContent = "Enviar...";
  document.body.appendChild(prueba);
}
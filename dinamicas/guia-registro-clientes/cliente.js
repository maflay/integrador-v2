window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const seccion_1 = document.getElementById("seccion_1");
const seccion_2 = document.getElementById("seccion_2");
const seccion_3 = document.getElementById("seccion_3");
const seccion_4 = document.getElementById("seccion_4");

const _paso_1_ = document.getElementById("_paso_1_");
const _seperador_2 = document.getElementById("_seperador_2");
const _paso_2_ = document.getElementById("_paso_2_");
const _seperador_3 = document.getElementById("_seperador_3");
const _paso_3_ = document.getElementById("_paso_3_");
const _seperador_4 = document.getElementById("_seperador_4");
const _paso_4_ = document.getElementById("_paso_4_");

const btn_anular = document.getElementById("btn_anular");
const btn_paso_anterior = document.getElementById("btn_paso_anterior");
const btn_siguiente_paso = document.getElementById("btn_siguiente_paso");
const btn_enviar_kiosko = document.getElementById("btn_enviar_kiosko");

let turnoSeccion = 0;

_paso_1_.classList.add("step_done");

seccion_1.style.display = "flex";
seccion_2.style.display = "none";
seccion_3.style.display = "none";
seccion_4.style.display = "none";

btn_enviar_kiosko.style.display = "none";
btn_paso_anterior.style.display = "none";

if (seccion_1.style.display == "flex") {
  btn_paso_anterior.style.display = "none";
} else {
  btn_paso_anterior.style.display = "flex";
}

if (seccion_4.style.display == "flex") {
  btn_siguiente_paso.style.display = "none";
  btn_enviar_kiosko.style.display = "flex";
}

btn_siguiente_paso.addEventListener("click", () => {
  if (turnoSeccion == 0) {
    seccion_1.style.display = "none";
    seccion_2.style.display = "flex";
    seccion_3.style.display = "none";
    seccion_4.style.display = "none";
    turnoSeccion += 1;
    _paso_2_.classList.add("step_done");
    _seperador_2.classList.add("step_done");
  } else if (turnoSeccion == 1) {
    seccion_1.style.display = "none";
    seccion_2.style.display = "none";
    seccion_3.style.display = "flex";
    seccion_4.style.display = "none";
    turnoSeccion += 1;
    _paso_3_.classList.add("step_done");
    _seperador_3.classList.add("step_done");
  } else if (turnoSeccion == 2) {
    seccion_1.style.display = "none";
    seccion_2.style.display = "none";
    seccion_3.style.display = "none";
    seccion_4.style.display = "flex";
    turnoSeccion += 1;
    _paso_4_.classList.add("step_done");
    _seperador_4.classList.add("step_done");
  }

  if (seccion_1.style.display == "flex") {
    btn_paso_anterior.style.display = "none";
  } else {
    btn_paso_anterior.style.display = "flex";
  }

  if (seccion_4.style.display == "flex") {
    btn_siguiente_paso.style.display = "none";
    btn_enviar_kiosko.style.display = "flex";
  }
});

btn_paso_anterior.addEventListener("click", () => {
  if (turnoSeccion == 1) {
    seccion_1.style.display = "flex";
    seccion_2.style.display = "none";
    seccion_3.style.display = "none";
    seccion_4.style.display = "none";
    turnoSeccion -= 1;
    _paso_2_.classList.remove("step_done");
    _seperador_2.classList.remove("step_done");
  } else if (turnoSeccion == 2) {
    seccion_1.style.display = "none";
    seccion_2.style.display = "flex";
    seccion_3.style.display = "none";
    seccion_4.style.display = "none";
    turnoSeccion -= 1;
    _paso_3_.classList.remove("step_done");
    _seperador_3.classList.remove("step_done");
  } else if (turnoSeccion == 3) {
    seccion_1.style.display = "none";
    seccion_2.style.display = "none";
    seccion_3.style.display = "flex";
    seccion_4.style.display = "none";
    turnoSeccion -= 1;
    _paso_4_.classList.remove("step_done");
    _seperador_4.classList.remove("step_done");
  }

  if (seccion_1.style.display == "flex") {
    btn_paso_anterior.style.display = "none";
    btn_siguiente_paso.style.display = "flex";
  } else {
    btn_paso_anterior.style.display = "flex";
    btn_siguiente_paso.style.display = "flex";
  }

  if (seccion_4.style.display == "flex") {
    btn_siguiente_paso.style.display = "none";
    btn_enviar_kiosko.style.display = "flex";
  }
});

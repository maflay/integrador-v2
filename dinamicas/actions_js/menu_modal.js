// btn modal
const btn_guardar_registro = document.getElementById("btn_guardar_registro");
const btn_envio_secundario = document.getElementById("btn_envio_secundario");
const btn_observacion = document.getElementById("btn_observacion");
const btn_tabla_premios = document.getElementById("btn_tabla_premios");
const btn_registro_dia = document.getElementById("btn_registro_dia");
const btn_modal_opcion_6 = document.getElementById("btn_modal_opcion_6");

// view modal
const view_guardar_registro = document.getElementById("view_guardar_registro");
const view_envio_secundario = document.getElementById("view_envio_secundario");
const view_envia_observacion = document.getElementById(
  "view_envia_observacion",
);
const view_tabla_premios = document.getElementById("view_tabla_premios");
const view_registro_dia = document.getElementById("view_registro_dia");
const view_modal_opcion_6 = document.getElementById("view_modal_opcion_6");

const btn_opcion = document.getElementById("btn_opciones");
const close_modal_icon = document.getElementById("close_modal_icon");
const expandir = document.getElementById("expandir");

const notificacion_registro_dia = document.getElementById(
  "notificacion_registro_dia",
);
notificacion_registro_dia.style.display = "none";

btn_opcion.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "flex";
  btn_guardar_registro.classList.add("select_menu");
  view_guardar_registro.style.display = "flex";
});

close_modal_icon.addEventListener("click", () => {
  document.getElementById("modal_opciones_dinamica").style.display = "none";
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_modal_opcion_6?.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
  !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "none");
});

btn_guardar_registro.addEventListener("click", () => {
  btn_guardar_registro.classList.add("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_modal_opcion_6?.classList.remove("select_menu");

  view_guardar_registro.style.display = "flex";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
  !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "none");
});

btn_envio_secundario.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.add("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_modal_opcion_6?.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "flex";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
  !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "none");
});

btn_observacion.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.add("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_modal_opcion_6?.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "flex";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "none";
  !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "none");
});

btn_tabla_premios.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.add("select_menu");
  btn_registro_dia.classList.remove("select_menu");
  btn_modal_opcion_6?.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "flex";
  view_registro_dia.style.display = "none";
  !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "none");
});

btn_registro_dia.addEventListener("click", () => {
  btn_guardar_registro.classList.remove("select_menu");
  btn_envio_secundario.classList.remove("select_menu");
  btn_observacion.classList.remove("select_menu");
  btn_tabla_premios.classList.remove("select_menu");
  btn_registro_dia.classList.add("select_menu");
  btn_modal_opcion_6?.classList.remove("select_menu");

  view_guardar_registro.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_envia_observacion.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registro_dia.style.display = "flex";
  !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "none");
});

if (btn_modal_opcion_6) {
  btn_modal_opcion_6.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registro_dia.classList.remove("select_menu");
    btn_modal_opcion_6?.classList.add("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envia_observacion.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registro_dia.style.display = "none";
    !view_modal_opcion_6 ? "" : (view_modal_opcion_6.style.display = "flex");
  });
}

expandir.addEventListener("click", () => {
  document
    .getElementById("content_modal_dinamica")
    .classList.toggle("item_full_screen");
});

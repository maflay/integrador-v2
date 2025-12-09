metodoprueba();

const cerrar_comunicado = document.getElementById("cerrar_comunicado");
cerrar_comunicado.addEventListener("click", () => {
  document.getElementById("modal_text_intro").style.display = "none";
});

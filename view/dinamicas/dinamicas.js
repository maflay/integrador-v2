metodoprueba();

// const cerrar_comunicado = document.getElementById("cerrar_comunicado");
// cerrar_comunicado.addEventListener("click", () => {
//   document.getElementById("modal_text_intro").style.display = "none";
// });
actionsAcc();
function actionsAcc() {
  const user = metodoprueba();
  const all_card = document.querySelectorAll(".content_text_card_integrador");
  const all_title = document.querySelectorAll(
    ".content_text_card_integrador h3",
  );
  all_card.forEach((card, index) => {});
  if (user.Nivel === 1 || user.Nivel === 2) {
    console.log("entro");
    document.getElementById("all_info").innerHTML =
      ` <a title="Opciones Admin Promotor" class="crear_usuario" href="#crear_usuario"><img
                src="/resource/engranaje.png" alt="Opciones"></a>
        <a class="btn_a_1"
            href="https://docs.google.com/spreadsheets/d/1cDIZJkvZT2afwLahkwNIRQ-TQL3hQPaRC0OHcrrXUvY/edit?gid=976928819#gid=976928819">Información</a>
   `;
  } else if (user.Nivel === 6) {
    console.log("entro");
    console.log(user.Nivel);
    document.getElementById("all_info").innerHTML =
      ` <a title="Opciones Admin Promotor" class="crear_usuario" href="#crear_usuario"><img
                src="/resource/engranaje.png" alt="Opciones"></a>
   `;
  }
}

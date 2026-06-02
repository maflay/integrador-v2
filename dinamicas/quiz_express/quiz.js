window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const _content_form_ask_ = document.getElementById("_content_form_ask_");
const preguntas_cant = document.getElementById("preguntas_cant");
const btn_send_quiz = document.getElementById("btn_send_quiz");
const btn_add_pregunta = document.getElementById("btn_add_pregunta");

const user = inforUser();
const currentHash = window.location.href;
if (currentHash.includes("admin_quiz")) {
  if (user.Nivel != 2 && user.Nivel != 1) {
    window.location.href = "/#login";
  }
}
let contadorPreguntas = 0;
const preguntas = [];

btn_add_pregunta.addEventListener("click", () => {
  _content_form_ask_.style.display = "inline";

  contadorPreguntas++;

  _content_form_ask_.insertAdjacentHTML(
    "beforeend",
    `
    <div class="_card_form_ask_" data-id="${contadorPreguntas}">

      <div>
        ${contadorPreguntas}/
      </div>

      <div class="_control_card_ask">
        <input 
          type="text"
          placeholder="Pregunta"
          class="form-control pregunta"
        >

        <select class="form-control respuesta">
          <option value="">Respuesta</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <div class="_content_answer_">
        <input type="text" placeholder="Opción A" class="form-control opcion">
        <input type="text" placeholder="Opción B" class="form-control opcion">
        <input type="text" placeholder="Opción C" class="form-control opcion">
        <input type="text" placeholder="Opción D" class="form-control opcion">
      </div>

    </div>
    `,
  );
});

function obtenerPreguntas() {
  const cards = document.querySelectorAll("._card_form_ask_");

  const preguntas = [];

  cards.forEach((card) => {
    const pregunta = card.querySelector(".pregunta").value;

    const respuesta = card.querySelector(".respuesta").value;

    const opciones = [...card.querySelectorAll(".opcion")].map(
      (input) => input.value,
    );

    preguntas.push({
      pregunta,
      respuesta,
      opciones,
    });
  });

  console.log(preguntas);
}

btn_send_quiz.addEventListener("click", () => {
  // let _build_preguntas_ = obtenerPreguntas();
  // console.log(_build_preguntas_);

  document.querySelectorAll("._card_form_ask_").forEach((card) => {
    preguntas.push({
      pregunta: card.querySelector(".pregunta").value,
      respuesta: card.querySelector(".respuesta").value,
      opciones: [...card.querySelectorAll(".opcion")].map((op) => op.value),
    });
  });

  console.log(preguntas);
});

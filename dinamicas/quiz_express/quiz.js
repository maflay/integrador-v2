window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const _content_form_ask_ = document.getElementById("_content_form_ask_");
const preguntas_cant = document.getElementById("preguntas_cant");
const btn_send_quiz = document.getElementById("btn_send_quiz");
const btn_add_pregunta = document.getElementById("btn_add_pregunta");
const tiempo_quiz = document.getElementById("tiempo_quiz");

const user = inforUser();
const currentHash = window.location.href;
if (currentHash.includes("admin_quiz")) {
  if (user.Nivel != 2 && user.Nivel != 1) {
    window.location.href = "/#login";
  }
}
let contadorPreguntas = 0;
let preguntas = [];

btn_add_pregunta
  ? btn_add_pregunta.addEventListener("click", () => {
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
          class="form-control pregunta cant_empty"
        >

        <select class="form-control respuesta cant_empty">
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
    })
  : "";

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

btn_send_quiz
  ? btn_send_quiz.addEventListener("click", async () => {
      // let _build_preguntas_ = obtenerPreguntas();
      // console.log(_build_preguntas_);

      let _card_form_ask_ = document.querySelectorAll("._card_form_ask_");
      preguntas = [];
      _card_form_ask_.forEach((card) => {
        preguntas.push({
          pregunta: card.querySelector(".pregunta").value,
          respuesta: card.querySelector(".respuesta").value,
          opciones: [...card.querySelectorAll(".opcion")].map((op) => op.value),
        });
      });

      let longArray = _card_form_ask_.length;

      let campos = document.querySelectorAll(".cant_empty");
      let hayVacios = Array.from(campos).some(
        (campo) => campo.value.trim() === "",
      );

      if (hayVacios) {
        Swal.fire({
          icon: "warning",
          title: "Campos en Blanco",
        });
        return;
      }

      const longitud_card = preguntas.map((card) => {
        return {
          Pregunta: card.pregunta,
          Respuesta: card.pregunta,
          Opcion_1: card.opciones[0],
          Opcion_2: card.opciones[1],
          Opcion_3: card.opciones[2],
          Opcion_4: card.opciones[3],
          Creado: user.Nombre,
          Tiempo: tiempo_quiz.value,
        };
      });

      console.log(longitud_card);

      for (const question of longitud_card) {
        await console.log(question);

        await fetch("sadad", {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            tipo: "update_result",
            sheetName: "resultados",
            match: {
              Numero: "8656214",
            },
            updates: {
              Nombre: question.Nombre,
              Tiempo: "",
              Respuesta: question.Respuesta,
              Creado: question.Creado,
              Opcion_1: question.Opcion_1,
              Opcion_2: question.Opcion_2,
              Opcion_3: question.Opcion_3,
              Opcion_4: question.Opcion_4,
              Tiempo: question.Tiempo,
            },
          }),
        })
          .then((res) => res.text())
          .then(() => {});
      }

      let data = {
        tipo: "quiz",
      };
    })
  : "";

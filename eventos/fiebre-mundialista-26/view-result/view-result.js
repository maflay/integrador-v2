window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// todos los campos

const mex_partido_1 = document.getElementById("mex_partido_1"); // mexico vs sudafrica
const mex_partido_2 = document.getElementById("mex_partido_2"); // mexico vs corea del sur
const mex_partido_3 = document.getElementById("mex_partido_3"); // grupo A por definirse 3 vs mexico

const suda_partido_1 = document.getElementById("suda_partido_1"); // mexico vs sudafrica
const suda_partido_2 = document.getElementById("suda_partido_2"); // grupo A por definirse 2 vs sudafrica
const suda_partido_3 = document.getElementById("suda_partido_3"); // sudafrica vs corea del sur

const corea_partido_1 = document.getElementById("corea_partido_1"); // corea del sur vs grupo A por definirse 1
const corea_partido_2 = document.getElementById("corea_partido_2"); // mexico vs corea del sur
const corea_partido_3 = document.getElementById("corea_partido_3"); // sudafrica vs corea del sur

// cambiar
const definir_grupo_a_partido_1 = document.getElementById(
  "definir_grupo_a_partido_1",
); // corea del sur vs Grupo A por definirse 1
const definir_grupo_a_partido_2 = document.getElementById(
  "definir_grupo_a_partido_2",
); // Grupo A por definirse 2 vs sudafrica
const definir_grupo_a_partido_3 = document.getElementById(
  "definir_grupo_a_partido_3",
); // Grupo A por definirse 3 vs mexico
//

const canada_partido_1 = document.getElementById("canada_partido_1"); // canada vs Grupo B por definirse 1
const canada_partido_2 = document.getElementById("canada_partido_2"); // canada vs catar
const canada_partido_3 = document.getElementById("canada_partido_3"); // suiza vs canada

// cambiar
const definir_grupo_b_partido_1 = document.getElementById(
  "definir_grupo_b_partido_1",
); // canada vs Grupo B por definirse 1
const definir_grupo_b_partido_2 = document.getElementById(
  "definir_grupo_b_partido_2",
); // suiza vs Grupo B por definirse 2
const definir_grupo_b_partido_3 = document.getElementById(
  "definir_grupo_b_partido_3",
); // Grupo B por definirse 3 vs catar
//

const usa_partido_1 = document.getElementById("usa_partido_1"); // estados unidos vs paraguay
const usa_partido_2 = document.getElementById("usa_partido_2"); // estados unidos vs australia
const usa_partido_3 = document.getElementById("usa_partido_3"); // Grupo D por definirse 3 vs estados unidos

const paraguay_partido_1 = document.getElementById("paraguay_partido_1"); // estados unidos vs estados unidos
const paraguay_partido_2 = document.getElementById("paraguay_partido_2"); // Grupo D por definirse 2 vs paraguay
const paraguay_partido_3 = document.getElementById("paraguay_partido_3"); // paraguay vs australia

const catar_partido_1 = document.getElementById("catar_partido_1"); // catar vs suiza
const catar_partido_2 = document.getElementById("catar_partido_2"); // canada vs catar
const catar_partido_3 = document.getElementById("catar_partido_3"); // Grupo B por definirse 3 vs catar

const suiza_partido_1 = document.getElementById("suiza_partido_1"); // catar vs suiza
const suiza_partido_2 = document.getElementById("suiza_partido_2"); // suiza vs Grupo B por definirse 2
const suiza_partido_3 = document.getElementById("suiza_partido_3"); // suiza vs canada

const brasil_partido_1 = document.getElementById("brasil_partido_1"); // brasil vs marruecos
const brasil_partido_2 = document.getElementById("brasil_partido_2"); // brasil vs haiti
const brasil_partido_3 = document.getElementById("brasil_partido_3"); // escocia vs brasil

const marruecos_partido_1 = document.getElementById("marruecos_partido_1"); // brasil vs marruecos
const marruecos_partido_2 = document.getElementById("marruecos_partido_2"); // escocia vs marruecos
const marruecos_partido_3 = document.getElementById("marruecos_partido_3"); // marruecos vs haiti

const escocia_partido_1 = document.getElementById("escocia_partido_1"); // haiti vs escocia
const escocia_partido_2 = document.getElementById("escocia_partido_2"); // escocia vs marruecos
const escocia_partido_3 = document.getElementById("escocia_partido_3"); // escocia vs brasil

const australia_partido_1 = document.getElementById("australia_partido_1"); // australia vs Grupo D por definirse 1
const australia_partido_2 = document.getElementById("australia_partido_2"); // estados unidos vs australia
const australia_partido_3 = document.getElementById("australia_partido_3"); // paraguay vs australia

// cambiar
const definir_grupo_d_partido_1 = document.getElementById(
  "definir_grupo_d_partido_1",
); // australia vs Grupo D por definirse 1
const definir_grupo_d_partido_2 = document.getElementById(
  "definir_grupo_d_partido_2",
); // Grupo D por definirse 2 vs paraguay
const definir_grupo_d_partido_3 = document.getElementById(
  "definir_grupo_d_partido_3",
); // Grupo D por definirse 3 vs estados unidos
//

const alemania_partido_1 = document.getElementById("alemania_partido_1"); // alemania vs curazao
const alemania_partido_2 = document.getElementById("alemania_partido_2"); // alemania vs costa de marfil
const alemania_partido_3 = document.getElementById("alemania_partido_3"); // ecuador vs alemania

const curazao_partido_1 = document.getElementById("curazao_partido_1"); // alemania vs curazao
const curazao_partido_2 = document.getElementById("curazao_partido_2"); // ecuador vs curazao
const curazao_partido_3 = document.getElementById("curazao_partido_3"); // curazao vs costa de marfil

const paises_bajos_partido_1 = document.getElementById(
  "paises_bajos_partido_1",
); // paises bajos vs japon
const paises_bajos_partido_2 = document.getElementById(
  "paises_bajos_partido_2",
); // paises bajos vs Grupo F por definirse 2
const paises_bajos_partido_3 = document.getElementById(
  "paises_bajos_partido_3",
); // tunez vs paises bajos

const japon_partido_1 = document.getElementById("japon_partido_1"); // paises bajos vs japon
const japon_partido_2 = document.getElementById("japon_partido_2"); // tunez vs japon
const japon_partido_3 = document.getElementById("japon_partido_3"); // japon vs Grupo F por definirse 3

const costa_de_marfil_partido_1 = document.getElementById(
  "costa_de_marfil_partido_1",
); // costa de marfil vs ecuador
const costa_de_marfil_partido_2 = document.getElementById(
  "costa_de_marfil_partido_2",
); // alemania vs costa de marfil
const costa_de_marfil_partido_3 = document.getElementById(
  "costa_de_marfil_partido_3",
); // curazao vs costa de marfil

const ecuador_partido_1 = document.getElementById("ecuador_partido_1"); // costa de marfil vs ecuador
const ecuador_partido_2 = document.getElementById("ecuador_partido_2"); // ecuador vs curazao
const ecuador_partido_3 = document.getElementById("ecuador_partido_3"); // ecuador vs alemania

// cambiar
const definir_grupo_f_partido_1 = document.getElementById(
  "definir_grupo_f_partido_1",
); // Grupo F por definirse 1 vs tunez
const definir_grupo_f_partido_2 = document.getElementById(
  "definir_grupo_f_partido_2",
); // paises bajos vs Grupo F por definirse 2
const definir_grupo_f_partido_3 = document.getElementById(
  "definir_grupo_f_partido_3",
); // japon vs Grupo F por definirse 3
//

const tunez_partido_1 = document.getElementById("tunez_partido_1"); // Grupo F por definirse 1 vs tunez
const tunez_partido_2 = document.getElementById("tunez_partido_2"); // tunez vs japon
const tunez_partido_3 = document.getElementById("tunez_partido_3"); // tunez vs paises bajos

const espania_partido_1 = document.getElementById("espania_partido_1"); // españa vs cabo verde
const espania_partido_2 = document.getElementById("espania_partido_2"); // españa vs arabia saudita
const espania_partido_3 = document.getElementById("espania_partido_3"); // uruguay vs españa

const cabo_verde_partido_1 = document.getElementById("cabo_verde_partido_1"); // españa vs cabo verde
const cabo_verde_partido_2 = document.getElementById("cabo_verde_partido_2"); // uruguay vs cabo verde
const cabo_verde_partido_3 = document.getElementById("cabo_verde_partido_3"); // cabo verde vs arabia saudita

const belgica_partido_1 = document.getElementById("belgica_partido_1"); // belgica vs egipto
const belgica_partido_2 = document.getElementById("belgica_partido_2"); // belgica vs iran
const belgica_partido_3 = document.getElementById("belgica_partido_3"); // nueva zelanda vs belgica

const egipto_partido_1 = document.getElementById("egipto_partido_1"); // belgica vs egipto
const egipto_partido_2 = document.getElementById("egipto_partido_2"); // nueva zelanda vs egipto
const egipto_partido_3 = document.getElementById("egipto_partido_3"); // egipto vs iran

const arabia_saudi_partido_1 = document.getElementById(
  "arabia_saudi_partido_1",
); // arabia saudita vs uruguay
const arabia_saudi_partido_2 = document.getElementById(
  "arabia_saudi_partido_2",
); // españa vs arabia saudita
const arabia_saudi_partido_3 = document.getElementById(
  "arabia_saudi_partido_3",
); // cabo verde vs arabia saudita

const uruguay_partido_1 = document.getElementById("uruguay_partido_1"); // arabia saudita vs uruguay
const uruguay_partido_2 = document.getElementById("uruguay_partido_2"); // uruguay vs cabo verde
const uruguay_partido_3 = document.getElementById("uruguay_partido_3"); // uruguay vs españa

const iran_partido_1 = document.getElementById("iran_partido_1"); // iran vs nueva zelanda
const iran_partido_2 = document.getElementById("iran_partido_2"); // belgica vs iran
const iran_partido_3 = document.getElementById("iran_partido_3"); // egipto vs iran

const nueva_zelanda_partido_1 = document.getElementById(
  "nueva_zelanda_partido_1",
); // iran vs nueva zelanda
const nueva_zelanda_partido_2 = document.getElementById(
  "nueva_zelanda_partido_2",
); // nueva zelanda vs egipto
const nueva_zelanda_partido_3 = document.getElementById(
  "nueva_zelanda_partido_3",
); // nueva zelanda vs belgica

const francia_partido_1 = document.getElementById("francia_partido_1"); // francia vs senegal
const francia_partido_2 = document.getElementById("francia_partido_2"); // francia vs Grupo I por definirse 2
const francia_partido_3 = document.getElementById("francia_partido_3"); // noruega vs francia

const senegal_partido_1 = document.getElementById("senegal_partido_1"); // francia vs senegal
const senegal_partido_2 = document.getElementById("senegal_partido_2"); // noruega vs senegal
const senegal_partido_3 = document.getElementById("senegal_partido_3"); // senegal vs Grupo I por definirse 3

const definir_grupo_i_partido_1 = document.getElementById(
  "definir_grupo_i_partido_1",
); // Grupo I por definirse 1 vs noruega
const definir_grupo_i_partido_2 = document.getElementById(
  "definir_grupo_i_partido_2",
); // francia vs Grupo I por definirse 2
const definir_grupo_i_partido_3 = document.getElementById(
  "definir_grupo_i_partido_3",
); // senegal vs Grupo I por definirse 3

const noruega_partido_1 = document.getElementById("noruega_partido_1"); // Grupo I por definirse 1vs noruega
const noruega_partido_2 = document.getElementById("noruega_partido_2"); // noruega vs senegal
const noruega_partido_3 = document.getElementById("noruega_partido_3"); // noruega vs francia

const argentina_partido_1 = document.getElementById("argentina_partido_1"); // argentina vs argelia
const argentina_partido_2 = document.getElementById("argentina_partido_2"); // argentina vs austria
const argentina_partido_3 = document.getElementById("argentina_partido_3"); // jordania vs argentina

const argelia_partido_1 = document.getElementById("argelia_partido_1"); // argentina vs argelia
const argelia_partido_2 = document.getElementById("argelia_partido_2"); // jordania vs argelia
const argelia_partido_3 = document.getElementById("argelia_partido_3"); // argelia vs austria

const jordania_partido_1 = document.getElementById("jordania_partido_1"); // austria vs jordania
const jordania_partido_2 = document.getElementById("jordania_partido_2"); // jordania vs argelia
const jordania_partido_3 = document.getElementById("jordania_partido_3"); // jordania vs argentina

const portugal_partido_1 = document.getElementById("portugal_partido_1"); // portugal vs Grupo K por definirse 1
const portugal_partido_2 = document.getElementById("portugal_partido_2"); // portugal vs uzbekistan
const portugal_partido_3 = document.getElementById("portugal_partido_3"); // colombia vs portugal

// cambiar
const definir_grupo_k_partido_1 = document.getElementById(
  "definir_grupo_k_partido_1",
); // portugal vs Grupo K por definirse 1
const definir_grupo_k_partido_2 = document.getElementById(
  "definir_grupo_k_partido_2",
); // colombia vs Grupo K por definirse 2
const definir_grupo_k_partido_3 = document.getElementById(
  "definir_grupo_k_partido_3",
); // Grupo K por definiser 3 vs uzbekistan
//

const inglaterra_partido_1 = document.getElementById("inglaterra_partido_1"); // inglaterra vs coracia
const inglaterra_partido_2 = document.getElementById("inglaterra_partido_2"); // ghana vs panama
const inglaterra_partido_3 = document.getElementById("inglaterra_partido_3"); // panama vs inglaterra

const croacia_partido_1 = document.getElementById("croacia_partido_1"); // ingleterra vs croacia
const croacia_partido_2 = document.getElementById("croacia_partido_2"); // panama vs croacia
const croacia_partido_3 = document.getElementById("croacia_partido_3"); // croacia vs ghana

const ghana_partido_1 = document.getElementById("ghana_partido_1"); // ghana vs panama
const ghana_partido_2 = document.getElementById("ghana_partido_2"); // inglaterra vs ghana
const ghana_partido_3 = document.getElementById("ghana_partido_3"); // croacia vs ghana

const panama_partido_1 = document.getElementById("panama_partido_1"); // ghana vs panama
const panama_partido_2 = document.getElementById("panama_partido_2"); // panama vs croacia
const panama_partido_3 = document.getElementById("panama_partido_3"); // panama vs inglaterra

const uzbekistan_partido_1 = document.getElementById("uzbekistan_partido_1"); // uzbekistan vs colombia
const uzbekistan_partido_2 = document.getElementById("uzbekistan_partido_2"); // portugal vs uzbekistan
const uzbekistan_partido_3 = document.getElementById("uzbekistan_partido_3"); // Grupo K por definirse 3 vs uzbekistan

const colombia_partido_1 = document.getElementById("colombia_partido_1"); // uzbekistan vs colombia
const colombia_partido_2 = document.getElementById("colombia_partido_2"); // colombia vs Grupo K por definirse 2
const colombia_partido_3 = document.getElementById("colombia_partido_3"); // colombia vs portugal

const btn_actualizar_score = document.getElementById("btn_actualizar_score");

function buildPronosticosPayload() {
  const user = getCookie("user_quiniela"); // {Nombre, Numero}
  if (!user) throw new Error("No hay sesión");

  // toma TODOS los inputs type=number dentro del contenedor de la quiniela
  const container = document.getElementById("View_inputs_quiniela");
  const inputs = container.querySelectorAll('input[type="number"]');

  const pronosticos = {};
  inputs.forEach((inp) => {
    // guarda por id (ej: "mex_partido_1")
    pronosticos[inp.id] = inp.value === "" ? "" : Number(inp.value);
  });

  return {
    tipo: "quiniela_pronosticos",
    Fecha: new Date().toLocaleDateString("es-CO", {
      timeZone: "America/Bogota",
    }),
    Hora: new Date().toLocaleTimeString("es-CO", {
      timeZone: "America/Bogota",
    }),
    Nombre: user.Nombre,
    Numero: user.Numero,
    ...pronosticos, // 🔥 columnas dinámicas
  };
}

const btn_cerrar_session = document.getElementById("btn_cerrar_session");
const user_logeado = document.getElementById("user_logeado");

const loader = document.getElementById("loader");
const btn_start = document.getElementById("btn_iniciar");
const btn_register = document.getElementById("btn_register");
const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const View_iniciar_quiniela = document.getElementById("View_iniciar_quiniela");
const View_inputs_quiniela = document.getElementById("View_inputs_quiniela");
const url =
  "https://script.google.com/macros/s/AKfycbwGYuqouuebNF0QjrD8UumLfnPNg3E2fRH-CPtffMiiF4LWOIkMsDrRVLlovkz-pEmg/exec";

function setCookie(name, value, opts = {}) {
  const {
    hours = 4,
    path = "/",
    sameSite = "Lax", // recomendado
    secure = location.protocol === "https:", // true si estás en https
  } = opts;

  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  const encoded = encodeURIComponent(JSON.stringify(value));
  let cookie = `${name}=${encoded}; Expires=${expires}; Path=${path}; SameSite=${sameSite}`;
  if (secure) cookie += `; Secure`;
  document.cookie = cookie;
}

function getCookie(name) {
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    const [k, ...rest] = part.split("=");
    if (k === name) {
      const val = rest.join("=");
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        return decodeURIComponent(val);
      }
    }
  }
  return null;
}

btn_cerrar_session.addEventListener("click", () => {
  Swal.fire({
    title: "Seguro de salir?",
    text: "Se olvidara el usuario y la contraseña",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si Quiero!",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Exito!",
        text: "Tu usuario has sido olvidado.",
        icon: "success",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          document.cookie = "user_quiniela=; max-age=0; path=/;";
          location.reload();
        }
      });
    }
  });
});

btn_start.addEventListener("click", () => {
  validateUser();
});

function validateUser() {
  if (!nombre.value || !codigo.value) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  loader.style.display = "flex";

  fetch(`${url}?hoja=quiniela&nombre=${nombre.value}&numero=${codigo.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0 || data == []) {
        loader.style.display = "none";
        Swal.fire({
          icon: "warning",
          title: "El Usuario no exite",
          html: "Quieres registrar tu usuario",
        }).then((res) => {
          if (res.isConfirmed) {
            btn_start.style.display = "none";
            btn_register.style.display = "flex";
          }
        });
      } else {
        View_iniciar_quiniela.style.display = "none";
        View_inputs_quiniela.style.display = "flex";
        let body_qui = {
          Nombre: nombre.value,
          Numero: codigo.value,
        };
        setCookie("user_quiniela", body_qui);
        window.location.reload();
      }
    });
}

const userQui = getCookie("user_quiniela");
user_logeado.textContent = "Usuario Conectado : " + userQui.Nombre;

if (userQui) {
  View_iniciar_quiniela.style.display = "none";
  View_inputs_quiniela.style.display = "flex";
} else {
  View_iniciar_quiniela.style.display = "flex";
  View_inputs_quiniela.style.display = "none";
}

btn_register.addEventListener("click", () => {
  createUser();
});

function createUser() {
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
    tipo: "quiniela_iniciar",
    Hora: hora,
    Fecha: fecha,
    Nombre: nombre.value,
    Numero: codigo.value,
  };

  loader.style.display = "flex";
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then(() => {
      let body_qui = {
        Nombre: nombre.value,
        Numero: codigo.value,
      };
      setCookie("user_quiniela", body_qui);
      loader.style.display = "none";
      nombre.value = "";
      codigo.value = "";
      View_iniciar_quiniela.style.display = "none";
      View_inputs_quiniela.style.display = "flex";
      Swal.fire({
        icon: "success",
        title: "Usuario creado con exito",
      });
    })
    .catch((erro) => {
      console.log(erro);
      loader.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Error al crear Usuario, Intentalo mas tarde",
      });
    });
}

btn_actualizar_score.addEventListener("click", () => {
  UpdateScore();
});

function UpdateScore() {
  const result = buildPronosticosPayload();
  console.log(result);
}

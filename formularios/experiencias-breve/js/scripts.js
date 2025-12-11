window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const submit_exp = document.getElementById("submit_exp");
const casino_introduccion = document.getElementById("casino_introduccion");
const fecha_introduccion = document.getElementById("fecha_introduccion");
const edad_18_25 = document.getElementById("18-25");
const edad_26_40 = document.getElementById("26-40");
const edad_41_55 = document.getElementById("41-55");
const edad_56_mas = document.getElementById("56+");
const semanal = document.getElementById("semanal");
const quincenal = document.getElementById("quincenal");
const mensual = document.getElementById("mensual");
const eventual = document.getElementById("eventual");

const allChecks = document.querySelectorAll("input[type='checkbox'][id]");

allChecks.forEach((check) => {
  check.addEventListener("change", () => {
    // Detectar grupo
    const group = check.closest("[data-group]");
    if (!group) return;

    // Buscar todos los checkboxes del mismo grupo
    const groupChecks = group.querySelectorAll("input[type='checkbox']");

    // Desmarcar los demás si uno se marca
    if (check.checked) {
      groupChecks.forEach((otro) => {
        if (otro !== check) otro.checked = false;
      });
    }
  });
});

const fechaCompleta = new Date().toLocaleString("es-CO", {
  timeZone: "America/Bogota",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const [fechaBreve, horaBreve] = fechaCompleta.split(", ");

fecha_introduccion.value = fechaBreve;

const grupoJuegos = document.getElementById("grupo_juegos");
const checkboxes = grupoJuegos.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // contar cuántos están seleccionados
    const seleccionados = grupoJuegos.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    // si ya hay 2 y se intenta marcar otro
    if (seleccionados.length > 2) {
      checkbox.checked = false;
    }
  });
});

function obtenerJuegosSeleccionados() {
  const seleccionados = document.querySelectorAll(
    "#grupo_juegos input[type='checkbox']:checked"
  );
  return Array.from(seleccionados).map((c) => c.id);
}

// ✅ Edad (usa tu lógica actual)
function obtenerValorGrupo(nombreGrupo) {
  const grupo = document.querySelector(`[data-group="${nombreGrupo}"]`);
  if (!grupo) return null;
  const seleccionado = grupo.querySelector("input[type='checkbox']:checked");
  return seleccionado ? seleccionado.id : null;
}

// ✅ Frecuencia de visita (semanal / quincenal / mensual / eventual)
function obtenerFrecuenciaVisita() {
  const seleccionado = document.querySelector(
    ".content_check_xpb:nth-of-type(2) .check_edad input[type='checkbox']:checked"
  );
  return seleccionado ? seleccionado.id : null; // "semanal", "quincenal", etc.
}

// ✅ Sí/No genérico (conoce card, la usa, etc.)
function obtenerSiNo(idSi, idNo) {
  const si = document.getElementById(idSi);
  const no = document.getElementById(idNo);

  if (si && si.checked) return "SI";
  if (no && no.checked) return "NO";
  return null;
}

// ✅ Preferencias de juego (máx 2): devuelve array con ids marcados
function obtenerPreferenciasJuego() {
  const checks = document.querySelectorAll(
    "#maquinas, #Mesas\\(Ruleta,Blackjack,Baccarat\\), #bingo, #ruleta_eletronica"
  );
  const seleccionados = [];
  checks.forEach((c) => {
    if (c.checked) seleccionados.push(c.id);
  });
  return seleccionados; // ej: ["maquinas","bingo"]
}

// ✅ Checkbox múltiples (voz a voz, redes, etc.)
function obtenerChecksMultiple(selector) {
  return Array.from(document.querySelectorAll(selector + ":checked")).map(
    (el) => el.id
  );
}

// ✅ Tabla de experiencia principal (Aladdin)
// Recomendado: añade id="tabla_xp_aladdin" a la primera tabla en el HTML
function obtenerExperienciaCasino(selectorTabla) {
  const tabla = document.querySelector(selectorTabla);
  if (!tabla) return [];

  const filas = tabla.querySelectorAll("tbody tr");
  const resultados = [];

  filas.forEach((fila) => {
    const nombrePregunta = fila.querySelector("th").textContent.trim();
    const checks = fila.querySelectorAll("input[type='checkbox']");
    let valor = null;

    checks.forEach((check, i) => {
      if (check.checked) valor = i + 1; // 1 a 5
    });

    resultados.push({
      pregunta: nombrePregunta,
      valor: valor, // puede ser null si no respondió
    });
  });

  return resultados;
}

// Experiencias en el casino
const filas = document.querySelectorAll(".styled-table tbody tr");

filas.forEach((fila, index) => {
  const checks = fila.querySelectorAll("input[type='checkbox']");

  checks.forEach((check, i) => {
    check.addEventListener("change", () => {
      // Desmarcar los demás
      checks.forEach((c) => {
        if (c !== check) c.checked = false;
      });

      // Obtener el valor (puedes personalizarlo)
      const valorSeleccionado = i + 1; // porque tus columnas son 1 a 5
      const nombrePregunta = fila.querySelector("th").textContent.trim();
    });
  });
});

// 🔹 Lee una tabla de 1 a 5 y devuelve [{pregunta, valor}]
function obtenerExperienciaDesdeTabla(tabla) {
  if (!tabla) return [];

  const filas = tabla.querySelectorAll("tbody tr");
  const resultados = [];

  filas.forEach((fila) => {
    const nombrePregunta = fila.querySelector("th").textContent.trim();
    const checks = fila.querySelectorAll("input[type='checkbox']");
    let valor = null;

    checks.forEach((check, i) => {
      if (check.checked) valor = i + 1; // columnas 1–5
    });

    resultados.push({ pregunta: nombrePregunta, valor });
  });

  return resultados;
}

// 🔹 Experiencia en el casino Aladdin (tabla principal)
function obtenerExperienciaAladdin() {
  const tabla = document.querySelector("#tabla_xp_aladdin");
  return obtenerExperienciaDesdeTabla(tabla);
}

// 🔹 Experiencias en otros casinos (3 bloques dentro de #casinos_calificacion)
function obtenerExperienciaOtrosCasinos() {
  const contenedor = document.getElementById("casinos_calificacion");
  const visitaSi = document.getElementById("si_va_otros_casinos");

  if (!contenedor || !visitaSi || !visitaSi.checked) return [];

  const nombresInputs = contenedor.querySelectorAll(
    ".content_check_xpb input.form-control"
  );
  const tablas = contenedor.querySelectorAll("table.styled-table");

  const resultado = [];

  for (let i = 0; i < tablas.length && i < nombresInputs.length; i++) {
    const nombre = nombresInputs[i].value.trim();
    const experiencia = obtenerExperienciaDesdeTabla(tablas[i]);

    // Solo incluimos el casino si hay nombre o al menos alguna respuesta
    const algunaRespuesta = experiencia.some((e) => e.valor !== null);

    if (nombre || algunaRespuesta) {
      resultado.push({
        casinoNombre: nombre || `Casino_${i + 1}`,
        experiencia,
      });
    }
  }

  return resultado;
}

document.getElementById("si_va_otros_casinos").addEventListener("click", () => {
  if (document.getElementById("si_va_otros_casinos").checked == true) {
    document.getElementById("no_va_otros_casinos").checked = false;
    document.getElementById("casinos_calificacion").style.display = "flex";
  } else {
    document.getElementById("no_va_otros_casinos").checked = false;
    document.getElementById("casinos_calificacion").style.display = "none";
  }
});

document.getElementById("no_va_otros_casinos").addEventListener("click", () => {
  if (document.getElementById("no_va_otros_casinos").checked == true) {
    document.getElementById("si_va_otros_casinos").checked = false;
    document.getElementById("casinos_calificacion").style.display = "none";
  } else {
    document.getElementById("no_va_otros_casinos").checked = false;
    document.getElementById("casinos_calificacion").style.display = "none";
  }
});

function parseMapString(str) {
  if (!str) return {};
  str = String(str).trim();

  // Quitar llaves iniciales/finales si las tiene
  if (str.startsWith("{") && str.endsWith("}")) {
    str = str.slice(1, -1);
  }

  const obj = {};
  // dividir por comas principales
  const partes = str.split(",");

  let claveActual = null;
  let valorActual = "";

  partes.forEach((parte, idx) => {
    const tieneIgual = parte.includes("=");

    if (tieneIgual) {
      // si ya teníamos algo acumulado, guardarlo
      if (claveActual !== null) {
        obj[claveActual] = valorActual.trim();
      }

      const [k, v] = parte.split("=");
      claveActual = k.trim();
      valorActual = (v || "").trim();
    } else {
      // parte que continúa el valor (por ejemplo listas separadas por coma)
      valorActual += "," + parte.trim();
    }

    // al final del recorrido, guardar el último
    if (idx === partes.length - 1 && claveActual !== null) {
      obj[claveActual] = valorActual.trim();
    }
  });

  return obj;
}

function parseExperienciaLista(str) {
  if (!str) return [];
  str = String(str).trim();

  // separar cada bloque {...}
  const bloques = str.split("},{").map((b) => {
    b = b.trim();
    if (!b.startsWith("{")) b = "{" + b;
    if (!b.endsWith("}")) b = b + "}";
    return b;
  });

  return bloques.map((b) => parseMapString(b));
}

submit_exp.addEventListener("click", async () => {
  // 1. Inputs simples
  const casino = casino_introduccion.value.trim();
  const fecha = fecha_introduccion.value.trim();
  const maquinasPreferidas = document
    .getElementById("maquinas_preferidas")
    .value.trim();
  const lvlSatisfaccion = document.getElementById("lvl_satisfacion").value;
  const comentarios = document.getElementById("comentarios").value.trim();

  // 2. Perfil del cliente
  const edad = obtenerValorGrupo("edad"); // "18-25", "26-40", etc.
  const frecuenciaVisita = obtenerValorGrupo("frecuencia"); // "semanal", etc.

  // 3. Experiencia en Aladdin (tabla principal)
  const experienciaAladdin = obtenerExperienciaAladdin(); // array [{pregunta, valor}]

  // 4. Preferencias de juego (máx 2)
  const juegosPreferidos = obtenerJuegosSeleccionados(); // ["maquinas","bingo"]

  // 5. Conocimiento de marca (sí / no)
  const conoceCard = obtenerSiNo("si_conoce_card", "no_conoce_card");
  const usaCard = obtenerSiNo("si_la_usa", "no_la_usa");
  const conoceJuegos = obtenerSiNo("si_conoce_juegos", "no_conoce_juegos");
  const jugarOnline = obtenerSiNo("si_jugar_online", "no_jugar_online");

  // 6. Premios preferidos (ranking 1–4)
  const premio_elec = document.getElementById("premio_elec").value;
  const premio_bonos = document.getElementById("premio_bonos").value;
  const premio_ser = document.getElementById("premio_ser").value;
  const premio_carros = document.getElementById("premio_carros").value;

  // 7. Información y comunicación
  const comoSeEntero = obtenerChecksMultiple(
    "#voz_a_voz, #redes_sociales, #personal_casino, #material_grafico"
  ); // array de ids
  const comoPrefiereRecibir = obtenerChecksMultiple(
    "#recibir_whatsapp, #recibir_email, #recibir_llamada, #recibir_mensaje"
  );

  // 8. Otros casinos
  const visitaOtros = obtenerSiNo("si_va_otros_casinos", "no_va_otros_casinos");
  const detalleOtrosCasinos = obtenerExperienciaOtrosCasinos(); // array de objetos

  // 9. Hora de registro
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
  const [fechaRegistro, hora] = fechaCompleta.split(", ");

  // 10. Aplanar la experiencia de Aladdin en columnas (exp1..exp7)
  const expPlanas = {};
  experienciaAladdin.forEach((item, idx) => {
    expPlanas[`expAladdin_${idx + 1}`] = item.valor ?? "";
  });

  if (
    casino == "" ||
    fecha == "" ||
    maquinasPreferidas == "" ||
    premio_elec == "" ||
    premio_bonos == "" ||
    premio_ser == "" ||
    premio_carros == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en blancos",
    });
    return;
  }

  let data = {
    tipo: "registro",
    hora: hora,
    fecha: fechaRegistro,
    casinos: casino,
    fecha_intro: fecha,
    edad: edad,
    frecuencia: frecuenciaVisita,
    exp_cas_atencion_del_personal: experienciaAladdin[0].pregunta
      ? experienciaAladdin[0].pregunta
      : "Sin Registro",
    valor_adp: experienciaAladdin[0].valor
      ? experienciaAladdin[0].valor
      : "Sin Registro",
    exp_cas_seguridad: experienciaAladdin[1].pregunta
      ? experienciaAladdin[1].pregunta
      : "Sin Registro",
    valor_seg: experienciaAladdin[1].valor
      ? experienciaAladdin[1].valor
      : "Sin Registro",
    exp_cas_ambiente: experienciaAladdin[2].pregunta
      ? experienciaAladdin[2].pregunta
      : "Sin Registro",
    valor_amb: experienciaAladdin[2].valor
      ? experienciaAladdin[2].valor
      : "Sin Registro",
    exp_cas_instalaciones: experienciaAladdin[3].pregunta
      ? experienciaAladdin[3].pregunta
      : "Sin Registro",
    valor_insta: experienciaAladdin[3].valor
      ? experienciaAladdin[3].valor
      : "Sin Registro",
    exp_cas_promociones_y_beneficios: experienciaAladdin[4].pregunta
      ? experienciaAladdin[4].pregunta
      : "Sin Registro",
    valor_promo: experienciaAladdin[4].valor
      ? experienciaAladdin[4].valor
      : "Sin Registro",
    exp_cas_cercania: experienciaAladdin[5].pregunta
      ? experienciaAladdin[5].pregunta
      : "Sin Registro",
    valor_cerca: experienciaAladdin[5].valor
      ? experienciaAladdin[5].valor
      : "Sin Registro",
    exp_cas_comida: experienciaAladdin[6].pregunta
      ? experienciaAladdin[6].pregunta
      : "Sin Registro",
    valor_comida: experienciaAladdin[6].valor
      ? experienciaAladdin[6].valor
      : "Sin Registro",
    juego_preferido_1:
      juegosPreferidos[0] == "" ? "Sin Registro" : juegosPreferidos[0],
    juego_preferido_2: !juegosPreferidos[1]
      ? "Sin Otro Juego"
      : juegosPreferidos[1],
    maquinas_preferidas: maquinasPreferidas,
    conoceCard: conoceCard,
    usaCard: usaCard,
    conoceJuegos: conoceJuegos,
    jugarOnline: jugarOnline,
    electrodomesticos: "Electrodomésticos",
    electrodomesticos_valor: premio_elec,
    bonosDinero: "Bonos / Dinero promocional",
    bonosDinero_valor: premio_bonos,
    servicios: "Servicios (tiquetes, restaurantes, eventos)",
    servicios_valor: premio_ser,
    vehiculosMotos: "Vehículos / Motos",
    vehiculosMotos_valor: premio_carros,
    voz_a_voz:
      document.getElementById("voz_a_voz").checked == true ? "Si" : "No",
    redes_sociales:
      document.getElementById("redes_sociales").checked == true ? "Si" : "No",
    personal_casino:
      document.getElementById("personal_casino").checked == true ? "Si" : "No",
    material_grafico:
      document.getElementById("material_grafico").checked == true ? "Si" : "No",
    recibir_whatsapp:
      document.getElementById("recibir_whatsapp").checked == true ? "Si" : "No",
    recibir_email:
      document.getElementById("recibir_email").checked == true ? "Si" : "No",
    recibir_llamada:
      document.getElementById("recibir_llamada").checked == true ? "Si" : "No",
    recibir_mensaje:
      document.getElementById("recibir_mensaje").checked == true ? "Si" : "No",
    visitaOtros:
      document.getElementById("si_va_otros_casinos").checked == true
        ? "Si"
        : document.getElementById("no_va_otros_casinos").checked == true
        ? "No"
        : "Sin respuesta",
    exp_cas1_nombre:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].casinoNombre == ""
          ? "Sin Registro"
          : detalleOtrosCasinos[0].casinoNombre
        : "Sin Registro",
    exp_cas1_atencion_del_personal:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[0].pregunta
        : "Sin Registro",
    valor_adp_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[0].valor
        : "Sin Registro",
    exp_cas1_seguridad:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[1].pregunta
        : "Sin Registro",
    valor_seg_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[1].valor
        : "Sin Registro",
    exp_cas1_ambiente:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[2].pregunta
        : "Sin Registro",
    valor_amb_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[2].valor
        : "Sin Registro",
    exp_cas1_instalaciones:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[3].pregunta
        : "Sin Registro",
    valor_insta_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[3].valor
        : "Sin Registro",
    exp_cas1_promociones_y_beneficios:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[4].pregunta
        : "Sin Registro",
    valor_promo_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[4].valor
        : "Sin Registro",
    exp_cas1_cercania:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[5].pregunta
        : "Sin Registro",
    valor_cerca_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[5].valor
        : "Sin Registro",
    exp_cas1_comida:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[6].pregunta
        : "Sin Registro",
    valor_comida_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[6].valor
        : "Sin Registro",

    // DETALLE DE CASINO 2

    exp_cas2_nombre:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].casinoNombre
        : "Sin Registro",
    exp_cas2_atencion_del_personal:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[0].pregunta
        : "Sin Registro",
    valor_adp_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[0].valor
        : "Sin Registro",
    exp_cas2_seguridad:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[1].pregunta
        : "Sin Registro",
    valor_seg_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[1].valor
        : "Sin Registro",
    exp_cas2_ambiente:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[2].pregunta
        : "Sin Registro",
    valor_amb_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[2].valor
        : "Sin Registro",
    exp_cas2_instalaciones:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[3].pregunta
        : "Sin Registro",
    valor_insta_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[3].valor
        : "Sin Registro",
    exp_cas2_promociones_y_beneficios:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[4].pregunta
        : "Sin Registro",
    valor_promo_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[4].valor
        : "Sin Registro",
    exp_cas2_cercania:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[5].pregunta
        : "Sin Registro",
    valor_cerca_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[5].valor
        : "Sin Registro",
    exp_cas2_comida:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[6].pregunta
        : "Sin Registro",
    valor_comida_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[6].valor
        : "Sin Registro",

    // DETALLE DE CASINO 3

    exp_cas3_nombre:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].casinoNombre
        : "Sin Registro",
    exp_cas3_atencion_del_personal:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[0].pregunta
        : "Sin Registro",
    valor_adp_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[0].valor
        : "Sin Registro",
    exp_cas3_seguridad:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[1].pregunta
        : "Sin Registro",
    valor_seg_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[1].valor
        : "Sin Registro",
    exp_cas3_ambiente:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[2].pregunta
        : "Sin Registro",
    valor_amb_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[2].valor
        : "Sin Registro",
    exp_cas3_instalaciones:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[3].pregunta
        : "Sin Registro",
    valor_insta_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[3].valor
        : "Sin Registro",
    exp_cas3_promociones_y_beneficios:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[4].pregunta
        : "Sin Registro",
    valor_promo_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[4].valor
        : "Sin Registro",
    exp_cas3_cercania:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[5].pregunta
        : "Sin Registro",
    valor_cerca_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[5].valor
        : "Sin Registro",
    exp_cas3_comida:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[6].pregunta
        : "Sin Registro",
    valor_comida_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[6].valor
        : "Sin Registro",

    nivelSatisfaccion: lvlSatisfaccion,
    comentarios: comentarios,
  };

  let data_log = {
    tipo: "log",
    hora: hora,
    fecha: fechaRegistro,
    casinos: casino,
    fecha_intro: fecha,
    edad: edad,
    frecuencia: frecuenciaVisita,
    exp_cas_atencion_del_personal: experienciaAladdin[0].pregunta
      ? experienciaAladdin[0].pregunta
      : "Sin Registro",
    valor_adp: experienciaAladdin[0].valor
      ? experienciaAladdin[0].valor
      : "Sin Registro",
    exp_cas_seguridad: experienciaAladdin[1].pregunta
      ? experienciaAladdin[1].pregunta
      : "Sin Registro",
    valor_seg: experienciaAladdin[1].valor
      ? experienciaAladdin[1].valor
      : "Sin Registro",
    exp_cas_ambiente: experienciaAladdin[2].pregunta
      ? experienciaAladdin[2].pregunta
      : "Sin Registro",
    valor_amb: experienciaAladdin[2].valor
      ? experienciaAladdin[2].valor
      : "Sin Registro",
    exp_cas_instalaciones: experienciaAladdin[3].pregunta
      ? experienciaAladdin[3].pregunta
      : "Sin Registro",
    valor_insta: experienciaAladdin[3].valor
      ? experienciaAladdin[3].valor
      : "Sin Registro",
    exp_cas_promociones_y_beneficios: experienciaAladdin[4].pregunta
      ? experienciaAladdin[4].pregunta
      : "Sin Registro",
    valor_promo: experienciaAladdin[4].valor
      ? experienciaAladdin[4].valor
      : "Sin Registro",
    exp_cas_cercania: experienciaAladdin[5].pregunta
      ? experienciaAladdin[5].pregunta
      : "Sin Registro",
    valor_cerca: experienciaAladdin[5].valor
      ? experienciaAladdin[5].valor
      : "Sin Registro",
    exp_cas_comida: experienciaAladdin[6].pregunta
      ? experienciaAladdin[6].pregunta
      : "Sin Registro",
    valor_comida: experienciaAladdin[6].valor
      ? experienciaAladdin[6].valor
      : "Sin Registro",
    juego_preferido_1:
      juegosPreferidos[0] == "" ? "Sin Registro" : juegosPreferidos[0],
    juego_preferido_2: !juegosPreferidos[1]
      ? "Sin Otro Juego"
      : juegosPreferidos[1],
    maquinas_preferidas: maquinasPreferidas,
    conoceCard: conoceCard,
    usaCard: usaCard,
    conoceJuegos: conoceJuegos,
    jugarOnline: jugarOnline,
    electrodomesticos: "Electrodomésticos",
    electrodomesticos_valor: premio_elec,
    bonosDinero: "Bonos / Dinero promocional",
    bonosDinero_valor: premio_bonos,
    servicios: "Servicios (tiquetes, restaurantes, eventos)",
    servicios_valor: premio_ser,
    vehiculosMotos: "Vehículos / Motos",
    vehiculosMotos_valor: premio_carros,
    voz_a_voz:
      document.getElementById("voz_a_voz").checked == true ? "Si" : "No",
    redes_sociales:
      document.getElementById("redes_sociales").checked == true ? "Si" : "No",
    personal_casino:
      document.getElementById("personal_casino").checked == true ? "Si" : "No",
    material_grafico:
      document.getElementById("material_grafico").checked == true ? "Si" : "No",
    recibir_whatsapp:
      document.getElementById("recibir_whatsapp").checked == true ? "Si" : "No",
    recibir_email:
      document.getElementById("recibir_email").checked == true ? "Si" : "No",
    recibir_llamada:
      document.getElementById("recibir_llamada").checked == true ? "Si" : "No",
    recibir_mensaje:
      document.getElementById("recibir_mensaje").checked == true ? "Si" : "No",
    visitaOtros:
      document.getElementById("si_va_otros_casinos").checked == true
        ? "Si"
        : document.getElementById("no_va_otros_casinos").checked == true
        ? "No"
        : "Sin respuesta",
    exp_cas1_nombre:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].casinoNombre == ""
          ? "Sin Registro"
          : detalleOtrosCasinos[0].casinoNombre
        : "Sin Registro",
    exp_cas1_atencion_del_personal:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[0].pregunta
        : "Sin Registro",
    valor_adp_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[0].valor
        : "Sin Registro",
    exp_cas1_seguridad:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[1].pregunta
        : "Sin Registro",
    valor_seg_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[1].valor
        : "Sin Registro",
    exp_cas1_ambiente:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[2].pregunta
        : "Sin Registro",
    valor_amb_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[2].valor
        : "Sin Registro",
    exp_cas1_instalaciones:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[3].pregunta
        : "Sin Registro",
    valor_insta_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[3].valor
        : "Sin Registro",
    exp_cas1_promociones_y_beneficios:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[4].pregunta
        : "Sin Registro",
    valor_promo_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[4].valor
        : "Sin Registro",
    exp_cas1_cercania:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[5].pregunta
        : "Sin Registro",
    valor_cerca_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[5].valor
        : "Sin Registro",
    exp_cas1_comida:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[6].pregunta
        : "Sin Registro",
    valor_comida_cas1:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[0].experiencia[6].valor
        : "Sin Registro",

    // DETALLE DE CASINO 2

    exp_cas2_nombre:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].casinoNombre
        : "Sin Registro",
    exp_cas2_atencion_del_personal:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[0].pregunta
        : "Sin Registro",
    valor_adp_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[0].valor
        : "Sin Registro",
    exp_cas2_seguridad:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[1].pregunta
        : "Sin Registro",
    valor_seg_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[1].valor
        : "Sin Registro",
    exp_cas2_ambiente:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[2].pregunta
        : "Sin Registro",
    valor_amb_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[2].valor
        : "Sin Registro",
    exp_cas2_instalaciones:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[3].pregunta
        : "Sin Registro",
    valor_insta_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[3].valor
        : "Sin Registro",
    exp_cas2_promociones_y_beneficios:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[4].pregunta
        : "Sin Registro",
    valor_promo_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[4].valor
        : "Sin Registro",
    exp_cas2_cercania:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[5].pregunta
        : "Sin Registro",
    valor_cerca_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[5].valor
        : "Sin Registro",
    exp_cas2_comida:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[6].pregunta
        : "Sin Registro",
    valor_comida_cas2:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[1].experiencia[6].valor
        : "Sin Registro",

    // DETALLE DE CASINO 3

    exp_cas3_nombre:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].casinoNombre
        : "Sin Registro",
    exp_cas3_atencion_del_personal:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[0].pregunta
        : "Sin Registro",
    valor_adp_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[0].valor
        : "Sin Registro",
    exp_cas3_seguridad:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[1].pregunta
        : "Sin Registro",
    valor_seg_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[1].valor
        : "Sin Registro",
    exp_cas3_ambiente:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[2].pregunta
        : "Sin Registro",
    valor_amb_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[2].valor
        : "Sin Registro",
    exp_cas3_instalaciones:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[3].pregunta
        : "Sin Registro",
    valor_insta_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[3].valor
        : "Sin Registro",
    exp_cas3_promociones_y_beneficios:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[4].pregunta
        : "Sin Registro",
    valor_promo_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[4].valor
        : "Sin Registro",
    exp_cas3_cercania:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[5].pregunta
        : "Sin Registro",
    valor_cerca_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[5].valor
        : "Sin Registro",
    exp_cas3_comida:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[6].pregunta
        : "Sin Registro",
    valor_comida_cas3:
      document.getElementById("si_va_otros_casinos").checked == true
        ? detalleOtrosCasinos[2].experiencia[6].valor
        : "Sin Registro",

    nivelSatisfaccion: lvlSatisfaccion,
    comentarios: comentarios,
  };

  // 12. Validación mínima antes de enviar (ejemplo)
  if (!casino || !fecha || !edad) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      html: "Por favor completa al menos Casino, Fecha y Edad.",
    });
    return;
  }

  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  fetch(
    "https://script.google.com/macros/s/AKfycbxS6JERBY5tkDqyp7BbPgYgWX8yuBJ2cecGfFnzwcUqHC8_os1QI2tr8wEaVOFoQduX/exec?hoja=log",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data_log),
    }
  );

  // 13. Enviar a la API
  fetch(
    "https://script.google.com/macros/s/AKfycbxS6JERBY5tkDqyp7BbPgYgWX8yuBJ2cecGfFnzwcUqHC8_os1QI2tr8wEaVOFoQduX/exec",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.text?.() ?? "")
    .then((response) => {
      loader.style.display = "none";
      Swal.fire({
        icon: "success",
        title: "¡Gracias!",
        html: "Tu respuesta ha sido registrada.",
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((error) => {
      console.error(error);
      loader.style.display = "none";

      Swal.fire({
        icon: "error",
        title: "Error",
        html: "Se produjo un error al enviar la información.",
      });
    });
});

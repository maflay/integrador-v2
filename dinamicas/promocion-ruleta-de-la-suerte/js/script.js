window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  // btn modal
  const btn_guardar_registro = document.getElementById("btn_guardar_registro");
  const btn_envio_secundario = document.getElementById("btn_envio_secundario");
  const btn_envio_observacion = document.getElementById(
    "btn_envio_observacion"
  );
  const btn_tabla_premios = document.getElementById("btn_tabla_premios");
  const btn_registros_dia = document.getElementById("btn_registros_dia");
  const btn_ganadores = document.getElementById("btn_ganadores");
  const btn_reiniciar_tablero = document.getElementById(
    "btn_reiniciar_tablero"
  );

  btn_reiniciar_tablero.addEventListener("click", () => {
    window.location.reload();
  });

  const Promocion = "Ruleta de la Suerte";
  const url =
    "https://script.google.com/macros/s/AKfycbwQbK-SiCfVNPnlWkm9cSR5srUIJhowdUSnw9C7MUyzJEEPJ-m2_GOQOv1ccyxkITRSPQ/exec";

  // notificacion
  const notificacion_registro_dia = document.getElementById(
    "notificacion_registro_dia"
  );

  notificacion_registro_dia.style.display = "none";
  // view modal
  const view_guardar_registro = document.getElementById(
    "view_guardar_registro"
  );
  const view_envio_observacion = document.getElementById(
    "view_envio_observacion"
  );
  const view_envio_secundario = document.getElementById(
    "view_envio_secundario"
  );
  const view_tabla_premios = document.getElementById("view_tabla_premios");
  const view_registros_dia = document.getElementById("view_registros_dia");
  const result_dia_suerte = document.getElementById("result_dia_suerte");
  const view_registros_ganadores = document.getElementById(
    "view_registros_ganadores"
  );

  const casino_modal = document.getElementById("casino_modal");
  const lista_id_modal = document.getElementById("lista_id_modal");
  const select_ronda_modal = document.getElementById("select_ronda_modal");
  const btn_registro_por_casinos = document.getElementById(
    "btn_registro_por_casinos"
  );
  lista_id_modal.style.display = "none";
  select_ronda_modal.style.display = "none";
  btn_registro_por_casinos.style.display = "none";

  const casino_modal_ganadores = document.getElementById(
    "casino_modal_ganadores"
  );
  const lista_id_modal_ganadores = document.getElementById(
    "lista_id_modal_ganadores"
  );
  const select_ronda_modal_ganadores = document.getElementById(
    "select_ronda_modal_ganadores"
  );
  const btn_registro_ganadores = document.getElementById(
    "btn_registro_ganadores"
  );

  casino_modal_ganadores.style.display = "flex";
  lista_id_modal_ganadores.style.display = "none";
  select_ronda_modal_ganadores.style.display = "none";
  btn_registro_ganadores.style.display = "none";

  const user = inforUser();

  // valores registro normal
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const casino = document.getElementById("casino");
  const categoria = document.getElementById("categoria");
  const lista_id = document.getElementById("lista_id");
  const btn_submit = document.getElementById("btn_submit");
  const btn_clean_submit = document.getElementById("btn_clean_submit");

  const casino_observacion = document.getElementById("casino_observacion");
  const descripcion_observacion = document.getElementById(
    "descripcion_observacion"
  );
  const btn_clean_observacion = document.getElementById(
    "btn_clean_observacion"
  );
  const btn_envia_observacion = document.getElementById(
    "btn_envia_observacion"
  );

  const btn_validate_lista = document.getElementById("btn_validate_lista");
  btn_validate_lista.style.display = "none";
  lista_id.style.display = "none";

  const casino_secundario = document.getElementById("casino_secundario");
  const categoria_secundario = document.getElementById("categoria-secundario");
  const cedula_secundario = document.getElementById("cedula_secundario");
  const nombre_secundario = document.getElementById("nombre_secundario");
  const bono_secundario = document.getElementById("bono_secundario");
  const resultado_ruleta_secundario = document.getElementById(
    "resultado_ruleta_secundario"
  );
  const fecha_secundario = document.getElementById("fecha_secundario");
  const hora_secundario = document.getElementById("hora_secundario");
  const btn_clean_secundario = document.getElementById("btn_clean_secundario");
  const btn_submit_secundario = document.getElementById(
    "btn_submit_secundario"
  );

  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [fecha, hora] = fechaCompleta.split(", ");

  view_guardar_registro.style.display = "flex";
  view_envio_observacion.style.display = "none";
  view_envio_secundario.style.display = "none";
  view_tabla_premios.style.display = "none";
  view_registros_dia.style.display = "none";
  view_registros_ganadores.style.display = "none";
  btn_guardar_registro.classList.add("select_menu");

  btn_guardar_registro.addEventListener("click", () => {
    btn_guardar_registro.classList.add("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
    btn_ganadores.classList.remove("select_menu");

    view_guardar_registro.style.display = "flex";
    view_envio_observacion.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
    view_registros_ganadores.style.display = "none";
  });

  btn_envio_secundario.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.add("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
    btn_ganadores.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "flex";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
    view_registros_ganadores.style.display = "none";
  });

  btn_envio_observacion.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.add("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
    btn_ganadores.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "flex";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
    view_registros_ganadores.style.display = "none";
  });

  btn_tabla_premios.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.add("select_menu");
    btn_registros_dia.classList.remove("select_menu");
    btn_ganadores.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "flex";
    view_registros_dia.style.display = "none";
    view_registros_ganadores.style.display = "none";
  });

  btn_registros_dia.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.add("select_menu");
    btn_ganadores.classList.remove("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "flex";
    view_registros_ganadores.style.display = "none";
  });

  btn_ganadores.addEventListener("click", () => {
    btn_guardar_registro.classList.remove("select_menu");
    btn_envio_secundario.classList.remove("select_menu");
    btn_envio_observacion.classList.remove("select_menu");
    btn_tabla_premios.classList.remove("select_menu");
    btn_registros_dia.classList.remove("select_menu");
    btn_ganadores.classList.add("select_menu");

    view_guardar_registro.style.display = "none";
    view_envio_secundario.style.display = "none";
    view_envio_observacion.style.display = "none";
    view_tabla_premios.style.display = "none";
    view_registros_dia.style.display = "none";
    view_registros_ganadores.style.display = "flex";
  });

  const opciones_ruleta = document.getElementById("opciones_ruleta");
  const cerrarmodaleopciones = document.getElementById("cerrarmodaleopciones");
  opciones_ruleta.addEventListener("click", () => {
    const modal = document.getElementById("modal_opciones_suerte");
    modal.style.display = "flex";
  });

  cerrarmodaleopciones.addEventListener("click", () => {
    const modal = document.getElementById("modal_opciones_suerte");
    modal.style.display = "none";
  });

  // Orden real de la ruleta americana (con 00)
  const WHEEL = [
    "3",
    "6",
    "9",
    "12",
    "15",
    "18",
    "21",
    "24",
    "27",
    "30",
    "33",
    "36",
    "2",
    "5",
    "8",
    "11",
    "14",
    "17",
    "20",
    "23",
    "26",
    "29",
    "32",
    "35",
    "1",
    "4",
    "7",
    "10",
    "13",
    "16",
    "19",
    "22",
    "25",
    "28",
    "31",
    "34",
    "0",
    "00",
  ];

  const REDS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ]);

  const board = document.getElementById("board_numbers");
  const input = document.getElementById("nombre_rs");
  const btn = document.getElementById("send_number_ruleta");

  // Construir tablero
  WHEEL.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = `pocket ${colorClass(val)}`;
    cell.textContent = val;
    cell.dataset.idx = idx;
    cell.dataset.value = val;
    cell.id = `pocket_${val.replace("00", "dblzero")}`; // id único (00 → dblzero)
    board.appendChild(cell);
  });

  function colorClass(v) {
    if (v === "0" || v === "00") return "green";
    const n = Number(v);
    return REDS.has(n) ? "red" : "black";
  }

  // Helpers de animación
  let currentIndex = 0;
  let animating = false;

  function getCell(idx) {
    // console.log(idx);
    return board.querySelector(`.pocket[data-idx="${idx}"]`);
  }
  function setActive(idx, on) {
    if (idx == null) return;
    getCell(idx)?.classList.toggle("active", on);
  }

  btn.addEventListener("click", () => {
    const raw = input.value.trim().toUpperCase();

    if (input.value == "") {
      Swal.fire({
        icon: "warning",
        title: "Casilla del # en Blanco",
        html: "Ingresa un numero valido.",
      });
      return;
    }

    // Normaliza entrada: "00" se mantiene; lo demás a número sin ceros a la izquierda
    let targetVal;
    if (raw === "00") {
      targetVal = "00";
    } else if (/^\d+$/.test(raw)) {
      targetVal = String(parseInt(raw, 10)); // "07" -> "7"
    } else {
      warn("Ingresa un número válido (0-36 o 00).");
      return;
    }

    if (!WHEEL.includes(targetVal)) {
      Swal.fire({
        icon: "warning",
        title: "Número inválido",
        text: "Por favor ingresa un número entre 0-36 o 00.",
      });
      warn("Número inválido. Usa 0-36 o 00.");
      return;
    }
    if (animating) return; // evita doble click durante animación

    const idBloqueo = `pocket_${targetVal === "00" ? "dblzero" : targetVal}`;
    const celda = document.getElementById(idBloqueo);
    if (celda && celda.classList.contains("bloqueado")) {
      Swal.fire({
        icon: "warning",
        title: "Número inválido",
        text: `❌ El número ${targetVal} está ocupado. Elige otro.`,
      });
      warn(`❌ El número ${targetVal} está ocupado. Elige otro.`);
      return;
    }

    const targetIndex = WHEEL.indexOf(targetVal);

    // Pasos = unas vueltas + la distancia hasta el destino (sentido horario)
    const laps = 2; // vueltas completas antes de caer
    const dist = (targetIndex - currentIndex + WHEEL.length) % WHEEL.length;
    let steps = laps * WHEEL.length + dist;

    animating = true;
    let prev = currentIndex;
    let i = 0;

    // Quita marcas anteriores
    board.querySelectorAll(".pocket").forEach((c) => c.classList.remove("hit"));

    const tick = () => {
      const next = (prev + 1) % WHEEL.length;
      setActive(prev, false);
      setActive(next, true);
      prev = next;
      i++;

      if (i < steps) {
        // acelera al inicio y desacelera al final
        const remaining = steps - i;
        const delay =
          remaining > WHEEL.length ? 45 : 90 + (WHEEL.length - remaining);
        setTimeout(tick, delay);
      } else {
        // 🎯 LLEGÓ AL NÚMERO FINAL
        currentIndex = next;
        animating = false;
        setActive(currentIndex, false);
        const celdaGanadora = getCell(currentIndex);
        celdaGanadora.classList.add("hit");

        // ⚡️ Aquí imprimes o ejecutas lo que necesites
        const numeroGanador = celdaGanadora.dataset.value;
        // console.log(`El número ganador es: ${numeroGanador}`);

        // 🔔 Ejemplo: Mostrar alerta con SweetAlert
        Swal.fire({
          icon: "success",
          title: "¡Número Elegido!",
          html: `<h2 style="color:#d32f2f">Tu ¡Número elegido es el ${numeroGanador}</h2>`,
          confirmButtonText: "Aceptar",
          background: "#1F253A",
          color: "#fff",
        });

        // 🔒 Si quieres bloquear ese número después de ganar:
        celdaGanadora.classList.add("bloqueado");
      }
    };

    tick();
  });

  const numerosBloqueados = ["7", "19", "00", "30"];
  // bloquearNumeros(numerosBloqueados);

  function warn(msg) {
    // reemplaza por tu Swal si quieres
    console.warn(msg);
    // alert(msg);
  }

  function desbloquearNumeros() {
    const casillas = document.querySelectorAll(".pocket");
    casillas.forEach((c) => {
      c.classList.remove("bloqueado");
    });
  }

  function bloquearNumeros(numbers) {
    numbers.forEach((num) => {
      // ✅ Corrección para índices enviados desde backend
      if (num == "38") num = "00";
      if (num == "37") num = "0";
      const id = `pocket_${num === "00" ? "dblzero" : num}`;
      const el = document.getElementById(id);
      if (el) {
        el.classList.add("bloqueado");
        el.title = "Número ocupado";
      }
    });
  }

  // ✅ CORRECTO
  function desbloquearNumeros() {
    const casillas = document.querySelectorAll(".pocket");
    casillas.forEach((c) => {
      c.classList.remove("bloqueado");
    });
  }

  btn_submit.addEventListener("click", () => {
    handleSubmit();
  });

  function handleSubmit() {
    let nombreValue = nombre.value;
    let cedulaValue = cedula.value;
    let casinoValue = casino.value;
    let categoriaValue = categoria.value;
    let inputValue = input.value;

    if (
      nombreValue == "" ||
      cedulaValue == "" ||
      casinoValue == "" ||
      inputValue == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos en Blanco",
        html: "Debes completar la información",
      });
      return;
    }

    if (inputValue == "0") {
      inputValue = "37";
    } else if (inputValue == "00") {
      inputValue = "38";
    }

    let data = {
      tipo: "dinamica",
      Hora: hora,
      Fecha: fecha,
      Cedula: cedulaValue,
      Nombre: nombreValue,
      Casino: casinoValue,
      Categoria: categoriaValue,
      Numero_rul: inputValue,
      N_Bono: "",
      Promocion: Promocion,
      Usuario: user.Nombre,
    };

    // console.log(data, "data");
    loader.style.display = "flex";

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((data) => {
        loader.style.display = "none";
        nombre.value = "";
        cedula.value = "";
        casino.value = "";
        categoria.value = "";
        input.value = "";
        Swal.fire({
          icon: "success",
          title: "¡Registro enviado!",
          text: `Se envió correctamente la Información`,
        });
      });
  }

  const indicador_validate = document.getElementById("indicador_validate");
  const validate_done_lista = document.getElementById("validate_done_lista");
  const select_ronda = document.getElementById("select_ronda");
  select_ronda.style.display = "none";

  btn_validate_lista.addEventListener("click", () => {
    handlevalidatelista();
  });
  function handlevalidatelista() {
    let casinoValue = casino.value;
    let lista_idValue = lista_id.value;

    if (casinoValue == "" || lista_idValue == "") {
      Swal.fire({
        icons: "warning",
        title: "Campos en blanco",
        html: "Por favor completa los campos para validar los números.",
      });
      return;
    }

    indicador_validate.textContent = "Cargando...";

    desbloquearNumeros();

    fetch(
      `${url}?hoja=${casinoValue.toLowerCase()}&codigo=${lista_idValue.toUpperCase()}&ronda=${
        select_ronda.value
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) {
          validate_done_lista.innerHTML = `<p>No hay datos disponibles.</p>`;
          indicador_validate.textContent = "";
          return;
        }

        const rondas = [...new Set(rows.map((r) => r.Ronda))];
        const ultimaRonda = rondas[rondas.length - 1];

        rondas.length == ""
          ? (validate_done_lista.textContent = `No hay Rondas`)
          : (validate_done_lista.textContent = `Rondas encontradas: ${rondas.join(
              ", "
            )}`);
        const numbers = rows.map(
          (e) => e.Numero_rul ?? e.Numero_Rul ?? e.Numero ?? ""
        );
        bloquearNumeros(numbers);

        indicador_validate.textContent = "";
      })
      .catch((err) => {
        console.error(err);
        indicador_validate.textContent = "";
        desbloquearNumeros();
      });
  }

  // casino.addEventListener("change", () => {
  //   validateRonda();
  // });

  function validateRonda() {
    let casinoValue = casino.value;
    let lista_idValue = lista_id.value;
    select_ronda.innerHTML = `<option value="">Cargando...</option>`;
    document.getElementById("load_casino").style.display = "flex";
    casino.style.pointerEvents = "none";
    casino.style.opacity = "0.7";
    fetch(
      `${url}?hoja=${casinoValue.toLowerCase()}&codigo=${lista_idValue.toUpperCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.reverse());
        const rows = Array.isArray(data) ? data : [];

        const rondas = [...new Set(rows.map((r) => r.Ronda))]; // únicas
        const ultimaRonda = rondas[rondas.length - 1]; // la última

        select_ronda.style.display = "flex";

        select_ronda.innerHTML = `<option value="">Seleccione Ronda</option>`;
        btn_validate_lista.style.display = "flex";
        lista_id.style.display = "flex";
        document.getElementById("load_casino").style.display = "none";
        casino.style.pointerEvents = "auto";
        casino.style.opacity = "1";
        rondas.forEach((lista) => {
          if (!lista) return;
          const option = document.createElement("option");
          option.value = lista;
          option.textContent = lista;
          select_ronda.appendChild(option);
        });
        // console.log("Ronda mostrada:", ultimaRonda);

        rondas.length == ""
          ? (validate_done_lista.textContent = `No hay Rondas`)
          : (validate_done_lista.textContent = `Rondas encontradas: ${rondas.join(
              ", "
            )}`);

        const numbers = data.map((e) => e.Numero_rul);
        // console.log(valRonda,"valRonda"); // Lista de números
        // console.log(numbers); // Lista de números
        indicador_validate.textContent = "";
      })
      .catch(() => {
        document.getElementById("load_casino").textContent =
          "Ha Ocurrido un error, por favor refrescá.";
      });
  }

  casino_modal.addEventListener("change", () => {
    getListas();
  });

  function getListas() {
    let casinoValue = casino_modal.value;
    result_dia_suerte.innerHTML = "Cargando...";

    fetch(`${url}?hoja=${casinoValue.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) {
          validate_done_lista.innerHTML = `No hay datos disponibles.`;
          result_dia_suerte.textContent = `No hay datos disponibles.`;
          lista_id_modal.style.display = "none";
          select_ronda_modal.style.display = "none";
          btn_registro_por_casinos.style.display = "none";
          return;
        }

        lista_id_modal.style.display = "flex";
        select_ronda_modal.style.display = "flex";
        btn_registro_por_casinos.style.display = "flex";

        const rondas = [...new Set(rows.map((r) => r.Ronda))]; // únicas
        console.log(rondas);
        result_dia_suerte.innerHTML = "";

        select_ronda_modal.innerHTML = `<option value="">Seleccione Ronda</option>`;
        rondas.forEach((lista) => {
          if (!lista) return;
          const option = document.createElement("option");
          option.value = lista;
          option.textContent = lista;
          select_ronda_modal.appendChild(option);
        });
        // console.log("Ronda mostrada:", ultimaRonda);

        const numbers = data.map((e) => e.Numero_rul);
        // console.log(valRonda,"valRonda"); // Lista de números
        // console.log(numbers); // Lista de números
        indicador_validate.textContent = "";
      });
  }

  btn_registro_por_casinos.addEventListener("click", () => {
    getonlyLista();
  });

  function getonlyLista() {
    const casinoValue = (casino_modal.value || "").trim();
    const listaValue = (lista_id_modal.value || "").trim();
    const rondaValue = (select_ronda_modal.value || "").trim();

    result_dia_suerte.innerHTML = "Cargando...";

    // Armar query con seguridad
    const qs = new URLSearchParams();
    if (casinoValue) qs.set("hoja", casinoValue.toLowerCase());
    if (listaValue) qs.set("codigo", listaValue.toUpperCase());
    if (rondaValue) qs.set("ronda", rondaValue);

    fetch(`${url}?${qs.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) {
          result_dia_suerte.innerHTML = `<p>No hay datos disponibles.</p>`;
          return;
        }

        // --- ordenar por fecha/hora: recientes primero ---
        const ts = (r) => {
          // intenta combinar Fecha + Hora; si falla, ordena al final
          const f = String(r.Fecha ?? "").replace(/-/g, "/"); // mejor compatibilidad
          const h = r.Hora ? String(r.Hora) : "00:00:00";
          const d = new Date(`${f} ${h}`);
          return isNaN(d) ? 0 : d.getTime();
        };
        rows.sort((a, b) => ts(b) - ts(a));

        // --- formateador de fecha/hora ---
        const formatFechaHora = (fecha, hora) => {
          const f = String(fecha ?? "").replace(/-/g, "/");
          const h = hora ? String(hora) : "00:00:00";
          const d = new Date(`${f} ${h}`);
          if (isNaN(d)) {
            // fallback: si no parsea, devuelve tal cual la fecha
            return `${fecha ?? ""} ${hora ?? ""}`.trim();
          }
          return d.toLocaleString("es-CO", {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        };

        const LIMIT = 6; // cambia el límite si quieres
        const bodyHTML = rows
          .map((registro, i) => {
            console.log(registro);
            const fecha_dia = new Date(registro.Fecha);
            const fecha_larga = fecha_dia.toLocaleDateString("es-CO", {
              timeZone: "America/Bogota",
              day: "2-digit",
              month: "long",
              year: "2-digit",
            });
            const fechaFormateada = formatFechaHora(
              registro.Fecha,
              registro.Hora
            );
            return `
            <tr>
              <td>${i + 1}</td>
              <td>${registro.Nombre ?? ""}</td>
              <td>${fecha_larga}</td>
              <td>${registro.Cedula ?? ""}</td>
              <td>${registro.Casino ?? ""}</td>
              <td>${registro.Numero_rul ?? ""}</td>
              <td>${
                registro.N_Bono == ""
                  ? `<button class="btn btn-primary btn-enviar-api" 
            data-info='${JSON.stringify(registro)}'>
            Enviar
          </button>`
                  : ` ${registro.N_Bono}`
              }</td>
               
            </tr>
          `;
          })
          .join("");

        result_dia_suerte.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha y Hora</th>
                <th>Cédula</th>
                <th>Casino</th>
                <th>Numero Elegido</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              ${bodyHTML}
            </tbody>
          </table>
        </div>
      `;

        document.querySelectorAll(".btn-enviar-api").forEach((btn) => {
          btn.addEventListener("click", () => {
            loader.style.display = "flex";

            const registro = JSON.parse(btn.dataset.info);
            const horaS = new Date(registro.Hora);
            const hora = new Date(registro.Hora).toLocaleTimeString("es-CO", {
              timeZone: "America/Bogota",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });

            const fecha_dia = new Date(registro.Fecha);
            const fecha_larga = fecha_dia.toLocaleDateString();

            let data = {
              tipo: "dinamica",
              Hora: hora,
              Fecha: fecha_larga,
              Nombre: registro.Nombre,
              Cedula: registro.Cedula,
              Casino: registro.Casino,
              Categoria: registro.Categoria,
              Numero_rul: registro.Numero_rul,
              N_Bono: registro.N_Bono,
              Promocion: Promocion,
              Usuario: registro.Usuario,
              Codigo: registro.Codigo,
              Ronda: registro.Ronda,
            };

            console.log(data);
            fetch(url, {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(data),
            })
              .then((res) => res.text())
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title: "¡Registro enviado!",
                  text: `Se envió correctamente la Información`,
                });
                console.log("Respuesta API:", res);
                loader.style.display = "none";
              })
              .catch((err) => {
                console.error(err);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo enviar la información",
                });
                loader.style.display = "none";
              });
          });
        });
      })
      .catch((error) => {
        console.warn("Error al cargar los datos:", error);
        result_dia_suerte.innerHTML = `<p>Error al cargar los datos.</p>`;
      });
  }

  const result_ganadores_suerte = document.getElementById(
    "result_ganadores_suerte"
  );

  casino_modal_ganadores.addEventListener("change", () => {
    getListasGanadores();
  });

  function getListasGanadores() {
    let casinoValue = casino_modal_ganadores.value;

    result_ganadores_suerte.innerHTML = "Cargando...";

    fetch(`${url}?hoja=dinamica&casino=${casinoValue}`)
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) {
          lista_id_modal_ganadores.style.display = "none";
          select_ronda_modal_ganadores.style.display = "none";
          btn_registro_ganadores.style.display = "none";
          result_ganadores_suerte.innerHTML = "No hay datos disponibles.";
          return;
        }

        lista_id_modal_ganadores.style.display = "none";
        select_ronda_modal_ganadores.style.display = "none";
        btn_registro_ganadores.style.display = "flex";
        result_ganadores_suerte.innerHTML = "";

        const rondas = [...new Set(rows.map((r) => r.Ronda))]; // únicas
        result_dia_suerte.innerHTML = "";

        select_ronda_modal_ganadores.innerHTML = `<option value="">Seleccione Ronda</option>`;
        rondas.forEach((lista) => {
          if (!lista) return;
          const option = document.createElement("option");
          option.value = lista;
          option.textContent = lista;
          select_ronda_modal_ganadores.appendChild(option);
        });
        // console.log("Ronda mostrada:", ultimaRonda);

        const numbers = data.map((e) => e.Numero_rul);
        // console.log(valRonda,"valRonda"); // Lista de números
        // console.log(numbers); // Lista de números
        indicador_validate.textContent = "";
      });
  }

  btn_registro_ganadores.addEventListener("click", () => {
    getAllGanadores();
  });

  function getAllGanadores() {
    let listaValue = lista_id_modal_ganadores.value;
    let rondaValue = select_ronda_modal_ganadores.value;
    let casinoValue = casino_modal_ganadores.value;

    let data = {
      casinoValue,
      listaValue,
      rondaValue,
    };

    console.log(data);

    const datatest = {
      rondaValue,
      listaValue,
      casinoValue,
    };

    console.log(datatest, "dataset");
    result_ganadores_suerte.innerHTML = `Cargando...`;

    let valorcodigoApi = rondaValue == "" ? "" : `&codigo=` + listaValue;
    let valorrondaApi = listaValue == "" ? "" : `&ronda=` + rondaValue;
    let valorcasinoApi = casinoValue == "" ? "" : `&casino=` + casinoValue;

    // console.log(
    //   `${url}?hoja=dinamica${valorcodigoApi}${valorrondaApi}${valorcasinoApi}`
    // );

    fetch(
      `${url}?hoja=dinamica${valorcodigoApi}${valorrondaApi}${valorcasinoApi}`
    )
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) {
          result_ganadores_suerte.innerHTML = `<p>No hay datos disponibles.</p>`;
          return;
        }

        // --- ordenar por fecha/hora: recientes primero ---
        const ts = (r) => {
          // intenta combinar Fecha + Hora; si falla, ordena al final
          const f = String(r.Fecha ?? "").replace(/-/g, "/"); // mejor compatibilidad
          const h = r.Hora ? String(r.Hora) : "00:00:00";
          const d = new Date(`${f} ${h}`);
          return isNaN(d) ? 0 : d.getTime();
        };
        rows.sort((a, b) => ts(b) - ts(a));

        // --- formateador de fecha/hora ---
        const formatFechaHora = (fecha, hora) => {
          const f = String(fecha ?? "").replace(/-/g, "/");
          const h = hora ? String(hora) : "00:00:00";
          const d = new Date(`${f} ${h}`);
          if (isNaN(d)) {
            // fallback: si no parsea, devuelve tal cual la fecha
            return `${fecha ?? ""} ${hora ?? ""}`.trim();
          }
          return d.toLocaleString("es-CO", {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        };

        const LIMIT = 6; // cambia el límite si quieres
        const bodyHTML = rows
          .reverse()
          .map((registro, i) => {
            const fecha_dia = new Date(registro.Fecha);
            const fecha_larga = fecha_dia.toLocaleDateString("es-CO", {
              timeZone: "America/Bogota",
              day: "2-digit",
              month: "long",
              year: "2-digit",
            });
            const fechaFormateada = formatFechaHora(
              registro.Fecha,
              registro.Hora
            );
            return `
            <tr>
              <td>${i + 1}</td>
              <td>${registro.Nombre ?? ""}</td>
              <td>${fecha_larga}</td>
              <td>${registro.Cedula ?? ""}</td>
              <td>${registro.Casino ?? ""}</td>
              <td>${registro.Numero_rul ?? ""}</td>
              <td>
              ${
                registro.N_Bono == ""
                  ? `
              <input placeholder="# Bono" class="table_input_bono_suerte" type="text" name="Bono Ganador" id="bono_ganador">`
                  : registro.N_Bono
              }
              </td>
               <td>
         ${
           registro.N_Bono == ""
             ? ` <button class="btn btn-primary btn-enviar-ganadores" 
            data-info='${JSON.stringify(registro)}'>
            Enviar
          </button>`
             : `<p class="table_ya_tiene_bono">Ya Contiene Bono</p>`
         }
        </td>
            </tr>
          `;
          })
          .join("");

        result_ganadores_suerte.innerHTML = `
        <div class="table-result table-scrolld">
          <table class="styled-table">
            <thead>
              <tr>
                <th># Registro</th>
                <th>Nombre</th>
                <th>Fecha y Hora</th>
                <th>Cédula</th>
                <th>Casino</th>
                <th>Numero Elegido</th>
                <th># Bono</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              ${bodyHTML}
            </tbody>
          </table>
        </div>
      `;

        document.querySelectorAll(".btn-enviar-ganadores").forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.textContent = "Enviando...";
            const registro = JSON.parse(btn.dataset.info);
            loader.style.display = "flex";
            // toma el input de la MISMA fila:
            const fila = btn.closest("tr");
            const bonoInput = fila.querySelector(".table_input_bono_suerte");
            const bono = (bonoInput?.value || "").trim();

            if (!bono) {
              Swal.fire({ icon: "warning", title: "Falta el # de bono" });
              return;
            }

            const hora = new Date(registro.Hora).toLocaleTimeString("es-CO", {
              timeZone: "America/Bogota",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            const fecha_larga = new Date(registro.Fecha).toLocaleDateString(
              "es-CO",
              {
                timeZone: "America/Bogota",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            );

            const match = {
              Cedula: registro.Cedula,
              Codigo: registro.Codigo, // LISTA_X
              Ronda: registro.Ronda, // RONDA_Y
            };
            const data = {
              tipo: "update_bono",
              sheetName: "DINAMICA",
              match,
              N_Bono: bono,
            };

            // console.log(data);
            // Quitar input y botón
            bonoInput.remove();
            // btn.remove();

            // Agregar texto de confirmado en la celda del bono
            const cellBono = fila.children[6]; // columna #6 (# Bono)
            cellBono.innerHTML = `<span class="bono-confirmado">${bono} ✅</span>`;

            fetch(url, {
              method: "POST",
              mode: "no-cors",
              body: JSON.stringify(data),
              // evita no-cors si esperas leer la respuesta
            })
              .then((res) => res.text())
              .then(() => {
                Swal.fire({ icon: "success", title: "¡Registro enviado!" });
                bonoInput.value = "";
                btn.textContent = "Enviar";
                loader.style.display = "none";

                getAllGanadores();
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo enviar la información",
                });
                loader.style.display = "none";

                btn.textContent = "Error";
                setTimeout(() => {
                  btn.textContent = "Enviar";
                }, 2000);
              });
          });
        });
      });
  }

  btn_envia_observacion.addEventListener("click", () => {
    handleSubmitObs();
  });

  function handleSubmitObs() {
    let casinoValue = casino_observacion.value;
    let descripcion_observacionValue = descripcion_observacion.value;

    if (casinoValue == "" || descripcion_observacionValue == "") {
      Swal.fire({
        icon: "warning",
        title: "Antes de Continuar",
        html: "Debes Completar la información antes de enviar.",
      });
      return;
    }

    let data = {
      tipo: "observaciones",
      Hora: hora,
      Fecha: fecha,
      Casino: casinoValue,
      Observacion: descripcion_observacionValue,
      Usuario: user.Nombre,
    };

    console.log(data);

    loader.style.display = "flex";
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
        casino_observacion.value = "";
        descripcion_observacion.value = "";
        loader.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Observación enviada!",
          text: `Se envió correctamente la Información`,
        });
      });
  }
  // getAllGanadores();
});

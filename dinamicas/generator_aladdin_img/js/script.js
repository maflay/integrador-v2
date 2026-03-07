document.body.style.zoom = "100%";

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const _titulo = document.getElementById("_titulo");
const _plantilla = document.getElementById("_plantilla");
const _bolsa_entregar = document.getElementById("_bolsa_entregar");
const _monto = document.getElementById("_monto");
const _monto_primer_lugar = document.getElementById("_monto_primer_lugar");
const _fecha = document.getElementById("_fecha");
const _entrada_ = document.getElementById("_entrada_");
const _entrada_primer_lugar = document.getElementById("_entrada_primer_lugar");
const _re_entry = document.getElementById("_re_entry");
const _cupos = document.getElementById("_cupos");
const _stack_inicial = document.getElementById("_stack_inicial");
const _registro = document.getElementById("_registro");
const _nivel = document.getElementById("_nivel");
const _puntualidad = document.getElementById("_puntualidad");
const _dealer_tip = document.getElementById("_dealer_tip");
const loader = document.getElementById("loader");
const _content_img = document.getElementById("_content_img");
const btn_generar = document.getElementById("btn_generar");
const content_campos = document.getElementById("content_campos");
const _sit_and_go = document.getElementById("_sit_and_go");
const _premio_completa = document.getElementById("_premio_completa");
const _premio_aplica = document.getElementById("_premio_aplica");
const btn_descargar = document.getElementById("btn_descargar");

_plantilla.addEventListener("change", () => {
  _entrada_primer_lugar.style.display = "none";
  _monto_primer_lugar.style.display = "none";
  if (_plantilla.value == "") {
    _content_img.innerHTML = "";
    btn_descargar.style.display = "none";
  } else if (_plantilla.value == "martes") {
    const img = document.createElement("img");
    img.src = "/dinamicas/generator_aladdin_img/resources/martes.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "none";
  } else if (_plantilla.value == "martes_sit_and_go") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/martes_sit_and_go.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "flex";
  } else if (_plantilla.value == "martes_entrada") {
    const img = document.createElement("img");
    img.src = "/dinamicas/generator_aladdin_img/resources/martes_entrada.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "flex";
    _entrada_primer_lugar.style.display = "flex";
  } else if (_plantilla.value == "martes_primer_lugar") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/martes_primer_lugar.png";
    _content_img.appendChild(img);
    _monto_primer_lugar.style.display = "flex";
    _sit_and_go.style.display = "flex";
  } else if (_plantilla.value == "martes_descuento_sitandgo") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/martes_descuento_sit_and_go.png";
    _content_img.appendChild(img);
    _entrada_primer_lugar.style.display = "flex";
    _sit_and_go.style.display = "flex"; //fin martes
  } else if (_plantilla.value == "jueves") {
    const img = document.createElement("img");
    img.src = "/dinamicas/generator_aladdin_img/resources/jueves.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "none";
  } else if (_plantilla.value == "jueves_sit_and_go") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/jueves_sit_and_go.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "flex";
  } else if (_plantilla.value == "jueves_entrada") {
    const img = document.createElement("img");
    img.src = "/dinamicas/generator_aladdin_img/resources/jueves_entrada.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "flex";
    _entrada_primer_lugar.style.display = "flex";
  } else if (_plantilla.value == "jueves_primer_lugar") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/jueves_primer_lugar.png";
    _content_img.appendChild(img);
    _monto_primer_lugar.style.display = "flex";
    _sit_and_go.style.display = "flex";
  } else if (_plantilla.value == "jueves_descuento_sitandgo") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/jueves_descuento_sit_and_go.png";
    _content_img.appendChild(img);
    _monto_primer_lugar.style.display = "flex";
    _sit_and_go.style.display = "flex"; //fin jueves
  } else if (_plantilla.value == "sabado") {
    const img = document.createElement("img");
    img.src = "/dinamicas/generator_aladdin_img/resources/sabado.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "none";
  } else if (_plantilla.value == "sabado_sit_and_go") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/sabado_sit_and_go.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "flex";
  } else if (_plantilla.value == "sabado_entrada") {
    const img = document.createElement("img");
    img.src = "/dinamicas/generator_aladdin_img/resources/sabado_entrada.png";
    _content_img.appendChild(img);
    _sit_and_go.style.display = "flex";
    _entrada_primer_lugar.style.display = "flex";
  } else if (_plantilla.value == "sabado_primer_lugar") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/sabado_primer_lugar.png";
    _content_img.appendChild(img);
    _monto_primer_lugar.style.display = "flex";
    _sit_and_go.style.display = "flex";
  } else if (_plantilla.value == "sabado_descuento_sitandgo") {
    const img = document.createElement("img");
    img.src =
      "/dinamicas/generator_aladdin_img/resources/sabado_descuento_sit_and_go.png";
    _content_img.appendChild(img);
    _monto_primer_lugar.style.display = "flex";
    _sit_and_go.style.display = "flex"; //fin sabado
  } else {
    _content_img.innerHTML = "";
  }
});

btn_generar.addEventListener("click", () => {
  Generar();
});

function Generar() {
  content_campos.innerHTML = "";
  if (
    _plantilla.value == "" ||
    _bolsa_entregar.value == "" ||
    _monto.value == "" ||
    _fecha.value == "" ||
    _entrada_.value == "" ||
    _re_entry.value == "" ||
    _cupos.value == "" ||
    _stack_inicial.value == "" ||
    _registro.value == "" ||
    _nivel.value == "" ||
    _puntualidad.value == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos en Blanco",
    });
    return;
  }

  let valorPlanilla = _plantilla.value;

  let _campo_titulo = document.createElement("p");
  if (valorPlanilla.includes("_primer_lugar")) {
    _campo_titulo.classList = "_campo_titulo_primerlugar";
  } else {
    _campo_titulo.classList = "_campo_titulo";
  }
  _campo_titulo.innerHTML = _titulo.value;
  content_campos.appendChild(_campo_titulo);

  let _campo_bolsa_entregar = document.createElement("p");
  _campo_bolsa_entregar.classList = "_campo_bolsa_entregar";
  _campo_bolsa_entregar.innerHTML = _bolsa_entregar.value;
  content_campos.appendChild(_campo_bolsa_entregar);

  let _campo_monto = document.createElement("p");
  if (valorPlanilla.includes("_primer_lugar")) {
    _campo_monto.classList = "_campo_monto_primerlugar";
  } else {
    _campo_monto.classList = "_campo_monto";
  }
  _campo_monto.innerHTML = _monto.value;
  content_campos.appendChild(_campo_monto);

  if (valorPlanilla.includes("_primer_lugar")) {
    let _campo_primer_lugar = document.createElement("p");
    _campo_primer_lugar.classList = "_campo_primer_lugar";
    _campo_primer_lugar.innerHTML = _monto_primer_lugar.value;
    content_campos.appendChild(_campo_primer_lugar);
  }

  let _campo_fecha = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_fecha.classList = "_campo_fecha_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_fecha.classList = "_campo_fecha_primerlugar";
  } else {
    _campo_fecha.classList = "_campo_fecha";
  }
  _campo_fecha.innerHTML = _fecha.value;
  content_campos.appendChild(_campo_fecha);

  let _campo_entrada_ = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_entrada_.classList = "_campo_entrada_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_entrada_.classList = "_campo_entrada_primerlugar_p";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_entrada_.classList = "_campo_entrada_descuento_sit_and_go_p";
  } else {
    _campo_entrada_.classList = "_campo_entrada_";
  }

  _campo_entrada_.innerHTML = _entrada_.value;
  content_campos.appendChild(_campo_entrada_);

  if (
    valorPlanilla.includes("_entrada") ||
    valorPlanilla.includes("_descuento_sitandgo")
  ) {
    let _campo_entrada_primer_lugar = document.createElement("p");
    if (valorPlanilla.includes("_entrada")) {
      _campo_entrada_primer_lugar.classList = "_campo_entrada_primerlugar";
    } else if (valorPlanilla.includes("_descuento_sitandgo")) {
      _campo_entrada_primer_lugar.classList =
        "_campo_entrada_descuento_sit_and_go";
    }
    _campo_entrada_primer_lugar.innerHTML = _entrada_primer_lugar.value;
    content_campos.appendChild(_campo_entrada_primer_lugar);
  }

  let _campo_re_entry = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_re_entry.classList = "_campo_re_entry_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_re_entry.classList = "_campo_re_entry_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_re_entry.classList = "_campo_re_entry_descuento_sit_and_go";
  } else {
    _campo_re_entry.classList = "_campo_re_entry";
  }

  _campo_re_entry.innerHTML = _re_entry.value;
  content_campos.appendChild(_campo_re_entry);

  let _campo_cupos = document.createElement("p");

  if (valorPlanilla.includes("_entrada")) {
    _campo_cupos.classList = "_campo_cupos_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_cupos.classList = "_campo_cupos_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_cupos.classList = "_campo_cupos_descuento_sit_and_go";
  } else {
    _campo_cupos.classList = "_campo_cupos";
  }
  _campo_cupos.innerHTML = _cupos.value;
  content_campos.appendChild(_campo_cupos);

  let _campo_stack_inicial = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_stack_inicial.classList = "_campo_stack_inicial_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_stack_inicial.classList = "_campo_stack_inicial_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_stack_inicial.classList =
      "_campo_stack_inicial_descuento_sit_and_go";
  } else {
    _campo_stack_inicial.classList = "_campo_stack_inicial";
  }
  _campo_stack_inicial.innerHTML = _stack_inicial.value;
  content_campos.appendChild(_campo_stack_inicial);

  let _campo_registro = document.createElement("p");
  if (valorPlanilla.includes("sit_and_go")) {
    _campo_registro.classList = "_campo_registro_sit_and_go";
  } else if (valorPlanilla.includes("_entrada")) {
    _campo_registro.classList = "_campo_registro_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_registro.classList = "_campo_registro_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_registro.classList = "_campo_registro_descuento_sit_and_go";
  } else {
    _campo_registro.classList = "_campo_registro";
  }

  _campo_registro.innerHTML = _registro.value;
  content_campos.appendChild(_campo_registro);

  let _campo_nivel = document.createElement("p");
  if (valorPlanilla.includes("sit_and_go")) {
    _campo_nivel.classList = "_campo_nivel_sit_and_go";
  } else if (valorPlanilla.includes("_entrada")) {
    _campo_nivel.classList = "_campo_nivel_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_nivel.classList = "_campo_nivel_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_nivel.classList = "_campo_nivel_descuento_sit_and_go";
  } else {
    _campo_nivel.classList = "_campo_nivel";
  }

  _campo_nivel.innerHTML = _nivel.value;
  content_campos.appendChild(_campo_nivel);

  if (
    valorPlanilla.includes("sit_and_go") ||
    valorPlanilla.includes("_descuento_sitandgo")
  ) {
    let _campo_sit_and_go = document.createElement("p");
    if (valorPlanilla.includes("sit_and_go")) {
      _campo_sit_and_go.classList = "_campo_sit_and_go";
    } else if (valorPlanilla.includes("_descuento_sitandgo")) {
      _campo_sit_and_go.classList = "_campo_descuento_sit_and_go";
    }
    _campo_sit_and_go.innerHTML = _sit_and_go.value;
    content_campos.appendChild(_campo_sit_and_go);
  }

  let _campo_puntualidad = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_puntualidad.classList = "_campo_puntualidad_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_puntualidad.classList = "_campo_puntualidad_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_puntualidad.classList = "_campo_puntualidad_descuento_sit_and_go";
  } else {
    _campo_puntualidad.classList = "_campo_puntualidad";
  }
  _campo_puntualidad.innerHTML = _puntualidad.value;
  content_campos.appendChild(_campo_puntualidad);

  let _campo_dealer_tip = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_dealer_tip.classList = "_campo_dealer_tip_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_dealer_tip.classList = "_campo_dealer_tip_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_dealer_tip.classList = "_campo_dealer_tip_descuento_sit_and_go";
  } else {
    _campo_dealer_tip.classList = "_campo_dealer_tip";
  }
  _campo_dealer_tip.innerHTML = _dealer_tip.value;
  content_campos.appendChild(_campo_dealer_tip);

  let _campo_premio_completa = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_premio_completa.classList = "_campo_premio_completa_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_premio_completa.classList = "_campo_premio_completa_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_premio_completa.classList =
      "_campo_premio_completa_descuento_sit_and_go";
  } else {
    _campo_premio_completa.classList = "_campo_premio_completa";
  }
  _campo_premio_completa.innerHTML = _premio_completa.value;
  content_campos.appendChild(_campo_premio_completa);

  let _campo_premio_aplica = document.createElement("p");
  if (valorPlanilla.includes("_entrada")) {
    _campo_premio_aplica.classList = "_campo_premio_aplica_entrada";
  } else if (valorPlanilla.includes("_primer_lugar")) {
    _campo_premio_aplica.classList = "_campo_premio_aplica_primerlugar";
  } else if (valorPlanilla.includes("_descuento_sitandgo")) {
    _campo_premio_aplica.classList =
      "_campo_premio_aplica_descuento_sit_and_go";
  } else {
    _campo_premio_aplica.classList = "_campo_premio_aplica";
  }
  _campo_premio_aplica.innerHTML = _premio_aplica.value;
  content_campos.appendChild(_campo_premio_aplica);

  btn_descargar.style.display = "flex";
}

btn_descargar.addEventListener("click", async () => {
  const area = document.getElementById("export_area");
  if (!area) return;

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(area, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });

  document.body.style.overflow = prevOverflow;

  const link = document.createElement("a");
  link.download = `plantilla_${_plantilla.value || "export"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

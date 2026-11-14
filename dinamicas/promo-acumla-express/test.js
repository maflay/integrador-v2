const TIPO_TO_SHEET = {
  //Tipo        Hoja
  dinamica: "DINAMICA",
  observaciones: "OBSERVACIONES",
  horario: "HORARIO",
};

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  const tipo = data.tipo;

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (tipo === "update_puntaje") {
    const sheet = ss.getSheetByName(TIPO_TO_SHEET["dinamica"]);
    const match = data.match || {};
    const nuevoPremio = data.premio;
    const nuevoBono = data.bono;

    if (
      nuevoPremio === undefined ||
      nuevoPremio === null ||
      nuevoPremio === "" ||
      nuevoBono === undefined ||
      nuevoBono === null ||
      nuevoBono === ""
    ) {
      return _json({ error: "Faltan datos" }, 400);
    }

    const updatedPr = updateCellByMatch(sheet, match, "PremioObt", nuevoPremio);
    const updatedBo = updateCellByMatch(sheet, match, "Bono", nuevoBono);
    if (!updatedPr) return _json({ error: "Registro no encontrado" }, 404);
    if (!updatedBo) return _json({ error: "Registro no encontrado" }, 404);

    return _json({
      status: "success",
      mensaje: "Puntaje actualizado",
      updatedPr,
      updatedBo,
    });
  }

  if (tipo === "update_horario") {
    const sheet = ss.getSheetByName(TIPO_TO_SHEET["horario"]);
    const match = data.match || {};
    const horaIni = data.fecini;
    const horaFin = data.fecfin;

    if (
      horaIni === undefined ||
      horaIni === null ||
      horaIni === "" ||
      horaFin === undefined ||
      horaFin === null ||
      horaFin === ""
    ) {
      return _json({ error: "Faltan datos" }, 400);
    }

    const updatedHorini = updateCellByMatch(sheet, match, "Hora_ini", horaIni);
    const updatedHorFin = updateCellByMatch(sheet, match, "Hora_fin", horaFin);
    if (!updatedHorini) return _json({ error: "Registro no encontrado" }, 404);
    if (!updatedHorFin) return _json({ error: "Registro no encontrado" }, 404);

    return _json({
      status: "success",
      mensaje: "Puntaje actualizado",
      updatedHorini,
      updatedHorFin,
    });
  }

  if (!tipo || !TIPO_TO_SHEET[tipo]) {
    return _json({ error: "tipo inválido o no soportado" }, 400);
  }

  const sheet = ss.getSheetByName(TIPO_TO_SHEET[tipo]);
  if (!sheet) return _json({ error: "Hoja no encontrada" }, 404);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map((h) => data[h] ?? "");

  sheet.appendRow(row);

  return _json({
    status: "success",
    mensaje: "Registro guardado correctamente",
  });
}

function _json(payload, status = 200) {
  payload.statusCode = status;
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Función auxiliar para buscar la fila por match y actualizar la celda
function updateCellByMatch(sheet, matchObj, colName, newValue) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const colIndex = headers.indexOf(colName);
  if (colIndex === -1) return null;

  const matchKeys = Object.keys(matchObj);
  let foundRow = -1;

  for (let i = 0; i < rows.length; i++) {
    const fila = rows[i];
    const ok = matchKeys.every((k) => {
      const hIndex = headers.indexOf(k);
      if (hIndex === -1) return false;
      return String(fila[hIndex]).trim() === String(matchObj[k]).trim();
    });

    if (ok) {
      foundRow = i + 2; // +1 por los headers, +1 porque Apps Script empieza en la fila 1
      break;
    }
  }

  if (foundRow === -1) return null;

  // Actualizar la celda con el nuevo valor
  sheet.getRange(foundRow, colIndex + 1).setValue(newValue);

  const updatedRow = sheet
    .getRange(foundRow, 1, 1, headers.length)
    .getValues()[0];
  const updatedObj = {};
  headers.forEach((h, j) => (updatedObj[h] = updatedRow[j]));
  return updatedObj;
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet;
  const hojaParam = e && e.parameter && e.parameter.hoja;

  if (/^\d+$/.test(hojaParam)) {
    const idx = parseInt(hojaParam, 10) - 1;
    sheet = ss.getSheets()[idx];
  } else {
    sheet = ss.getSheetByName(hojaParam);
  }

  if (!sheet) {
    return _json({ error: `Hoja no encontrada: ${hojaParam}` }, 404);
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const identify = e.parameter.idunico;
  const nombreBuscada = e.parameter.nombre;
  const casinoBuscado = e.parameter.casino;
  const cedulaBuscada = e.parameter.cedula;
  const numeroBuscado = e.parameter.puntaje;
  const resultados = [];

  for (let i = 1; i < data.length; i++) {
    const fila = data[i];
    let filaObj = {};
    headers.forEach((h, j) => (filaObj[h] = fila[j]));

    const coincideNombre =
      !nombreBuscada || String(filaObj["Nombre"]) === String(nombreBuscada);
    const coincideCasino =
      !casinoBuscado || String(filaObj["Casino"]) === String(casinoBuscado);
    const coincideCedula =
      !cedulaBuscada || String(filaObj["Cedula"]) === String(cedulaBuscada);
    const coincideNumero =
      !numeroBuscado || String(filaObj["Puntaje"]) === String(numeroBuscado);
    const coincideIdentify =
      !identify || String(filaObj["Identify"]) === String(identify);

    if (
      coincideNombre &&
      coincideCasino &&
      coincideCedula &&
      coincideNumero &&
      coincideIdentify
    ) {
      resultados.push(filaObj);
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify(resultados),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Verificamos si postData tiene contenido
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", mensaje: "No llegaron datos en el post" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);
    const libro = SpreadsheetApp.getActiveSpreadsheet();

    if (data.tipo === "observacion") {
      const sheet = libro.getSheetByName("Observacion");
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const row = headers.map(h => (data[h] ?? ''));
      sheet.appendRow(row);
    } 
    else if (data.tipo === "registro") {
      const sheet = libro.getSheetByName("Jugador");
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const row = headers.map(h => (data[h] ?? ''));
      sheet.appendRow(row);
    }
else if (data.tipo === "update_bono") {
  const sheet = libro.getSheetByName("Jugador");
  const dataSheet = sheet.getDataRange().getValues();

  const cedulaBuscada = String(data.cedula).trim();
  const nuevoBono = data.bono;
  const diaBuscado = String(data.diaRegistroTabla).trim(); // Recibimos el día desde el frontend

  const headers = dataSheet[0];
  const colCedula = headers.indexOf("Cedula");
  const colDiaTabla = headers.indexOf("Dia"); // Columna "Dia" de tu tabla
  const colBono = headers.indexOf("Bono");

  Logger.log("Buscando Cédula: " + cedulaBuscada + " y Día: " + diaBuscado);

  let actualizado = false;

  for (let i = 1; i < dataSheet.length; i++) {
    const cedula = String(dataSheet[i][colCedula]).trim();
    const diaTablaCelda = String(dataSheet[i][colDiaTabla]).trim();

    // Comparamos únicamente por Cédula y el número del Día exacto
    if (cedula === cedulaBuscada && diaTablaCelda === diaBuscado) {
      sheet.getRange(i + 1, colBono + 1).setValue(nuevoBono);
      actualizado = true;
      Logger.log("¡Actualizado en la fila " + (i + 1) + "!");
      break;
    }
  }

  if (!actualizado) {
    Logger.log("No se encontró coincidencia exacta.");
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", mensaje: "No se encontró el registro exacto" })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", mensaje: "Actualizado correctamente" })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", mensaje: "Registro guardado correctamente" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", mensaje: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Jugador");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const nombreBuscada = e.parameter.nombre;
  const casinoBuscado = e.parameter.casino;
  const mesBuscado = e.parameter.mesbus;
  const anoBuscado = e.parameter.anobus;
  const cedulaBuscada = e.parameter.cedula;
  const numeroBuscado = e.parameter.nombre;
  const diaBuscado = e.parameter.dia;
  const diaBusGuardado = e.parameter.diabus;
  const resultados = [];

  for (let i = 1; i < data.length; i++) {
    const fila = data[i];
    let filaObj = {};
    
    headers.forEach((h, j) => {
      let valor = fila[j];
      // Forzamos a que la columna Hora viaje limpia como texto plano en hora de Colombia
      if (h === "Hora" && valor instanceof Date) {
        valor = Utilities.formatDate(valor, "America/Bogota", "HH:mm:ss");
      }
      filaObj[h] = valor;
    });

    const coincideNombre = !nombreBuscada || String(filaObj["Nombre"]) === String(nombreBuscada);
    const coincideCasino = !casinoBuscado || String(filaObj["Casino"]) === String(casinoBuscado);
    const coincideMes = !mesBuscado || String(filaObj["Mes_registro"]) === String(mesBuscado);
    const coincideAno = !anoBuscado || String(filaObj["Ano_registro"]) === String(anoBuscado);
    const coincideCedula = !cedulaBuscada || String(filaObj["Cedula"]) === String(cedulaBuscada);
    const coincideNumero = !numeroBuscado || String(filaObj['Numero']) === String(numeroBuscado);
    const coincideDia = !diaBuscado || String(filaObj['Dia_registro']) === String(diaBuscado);
    const coincidediaBus = !diaBusGuardado || String(filaObj['Dia']) === String(diaBusGuardado);

    if (coincideNombre && coincideCasino && coincideMes && coincideAno && coincideCedula && coincideNumero && coincideDia && coincidediaBus) {
      resultados.push(filaObj);
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify(resultados)
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Google Apps Script Web App Webhook
 * 
 * Instrucciones de instalación:
 * 1. Ve a Google Drive (https://drive.google.com) y crea una nueva "Hoja de cálculo de Google" (Google Sheets).
 * 2. En el menú superior de la hoja de cálculo, haz clic en Extensiones > Apps Script.
 * 3. Borra el código existente y pega este archivo completo.
 * 4. Guarda el proyecto (icono de disco).
 * 5. Haz clic en el botón "Implementar" (en la parte superior derecha) y selecciona "Nueva implementación".
 * 6. Haz clic en el engranaje de configuración y elige "Aplicación web".
 * 7. Configura lo siguiente:
 *    - Descripción: Registro de Pedidos BT Athletics
 *    - Ejecutar como: Tu cuenta de Google (Tú mismo)
 *    - Quién tiene acceso: Cualquier persona (Anyone) -> IMPORTANTE para permitir peticiones del frontend.
 * 8. Haz clic en "Implementar", autoriza los permisos requeridos con tu cuenta de Google.
 * 9. Copia la "URL de la aplicación web" generada (debe terminar en "/exec"). Pega esa URL en el archivo src/App.jsx en la constante GOOGLE_SHEETS_WEBHOOK_URL.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Configuración de cabeceras CORS
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  try {
    var data = JSON.parse(e.postData.contents);
    var items = data.items; // Arreglo de prendas compradas
    
    var customer = data.customer || {};
    var name = customer.name || "N/A";
    var phone = customer.phone || "N/A";
    var address = customer.address || "N/A";
    var dateStr = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });
    
    // Crear cabecera si la hoja de cálculo está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Pedido", 
        "Fecha Solicitud", 
        "Nombre Cliente", 
        "Teléfono / WhatsApp", 
        "Dirección", 
        "ID Prenda", 
        "Descripción de Prenda", 
        "Color", 
        "Talla", 
        "Cantidad", 
        "Estatus"
      ]);
    }
    
    var orderId = "PED-" + new Date().getTime();
    
    // Insertar cada prenda por fila (prenda por prenda)
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var qty = item.quantity || 1;
      
      // Si la cantidad es mayor a 1, agregamos múltiples filas individuales
      for (var j = 0; j < qty; j++) {
        sheet.appendRow([
          orderId,
          dateStr,
          name,
          phone,
          address,
          item.id,
          item.name,
          item.color,
          item.size,
          1, // 1 unidad por fila
          "Solicitado"
        ]);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "orderId": orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Soporte para preflight request CORS OPTIONS
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

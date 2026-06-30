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
    
    // Calcular el monto total del pedido
    var totalPedido = 0;
    for (var k = 0; k < items.length; k++) {
      totalPedido += Number(items[k].price || 0);
    }

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
        "Precio Unitario",
        "Cantidad", 
        "Total Pedido",
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
          item.price, // Precio Unitario
          1, // 1 unidad por fila
          totalPedido, // Total completo del pedido
          "Solicitado"
        ]);
      }
    }
    
    // Enviar correo de notificación al administrador
    try {
      var adminEmail = Session.getEffectiveUser().getEmail();
      if (adminEmail) {
        var itemsDetails = "";
        for (var i = 0; i < items.length; i++) {
          var it = items[i];
          itemsDetails += "- " + it.name + " (" + it.color + ", Talla " + it.size + ") x" + (it.quantity || 1) + "<br>";
        }
        
        var htmlBody = 
          "<h2>¡Nuevo Pedido Recibido!</h2>" +
          "<p><b>ID del Pedido:</b> " + orderId + "</p>" +
          "<p><b>Fecha de Solicitud:</b> " + dateStr + "</p>" +
          "<p><b>Cliente:</b> " + name + "</p>" +
          "<p><b>Teléfono / WhatsApp:</b> <a href='https://wa.me/52" + phone + "'>" + phone + "</a></p>" +
          "<p><b>Dirección de Entrega:</b> " + address + "</p>" +
          "<br>" +
          "<h3>Detalle del Pedido:</h3>" +
          "<p style='font-family: monospace; font-size: 14px;'>" + itemsDetails + "</p>" +
          "<p style='font-size: 16px; font-weight: bold;'>Monto Total del Pedido: $" + totalPedido + " MXN</p>" +
          "<br>" +
          "<p style='color: #666; font-size: 11px;'>Este es un mensaje automático de tu sistema de Apps Script.</p>";
          
        MailApp.sendEmail({
          to: adminEmail,
          subject: "NUEVO PEDIDO RECIBIDO // ID: " + orderId,
          htmlBody: htmlBody
        });
      }
    } catch (emailErr) {
      console.error("Error enviando email: " + emailErr.toString());
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

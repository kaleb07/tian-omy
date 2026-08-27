/**
 * RSVP backend for the wedding invitation.
 * Paste this into the Apps Script editor bound to the RSVP Google Sheet
 * (Extensions > Apps Script), then deploy as a Web App.
 * Expects one sheet: "message" (columns: Name, Message, Timestamp, Attendance).
 */
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var messageSheet = ss.getSheetByName("message");
  var values = messageSheet.getDataRange().getValues();

  var messages = values
    .filter(function (row, index) {
      var isHeaderRow = index === 0 && String(row[0]).trim().toLowerCase() === "name";
      if (isHeaderRow) return false;
      return String(row[0] || "").trim() && String(row[1] || "").trim();
    })
    .map(function (row) {
      var timestamp = row[2] instanceof Date ? row[2].toISOString() : String(row[2] || "");
      return {
        name: String(row[0]).trim(),
        message: String(row[1]).trim(),
        timestamp: timestamp,
        attendance: String(row[3] || "").trim(),
      };
    })
    .reverse();

  return jsonResponse({ ok: true, messages: messages });
}

function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var name = String(payload.name || "").trim();
  var attendance = String(payload.attendance || "").trim();
  var message = String(payload.message || "").trim();

  if (!name || (attendance !== "Yes" && attendance !== "No" && attendance !== "Maybe")) {
    return jsonResponse({ ok: false, error: "Invalid payload" });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var messageSheet = ss.getSheetByName("message");
  messageSheet.appendRow([name, message, new Date(), attendance]);

  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

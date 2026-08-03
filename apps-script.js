function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.answer || '',
      data.text || '',
      data.url || '',
      data.time || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({result: 'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        if (e.postData.type && e.postData.type.indexOf('form-data') !== -1) {
          const parts = e.postData.contents.split('&');
          for (let i = 0; i < parts.length; i++) {
            const kv = parts[i].split('=');
            if (kv.length === 2) {
              data[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
            }
          }
        }
      }
    }

    sheet.appendRow([
      new Date(),
      data.answer || data.text || '',
      data.text || data.answer || '',
      data.url || '',
      data.time || '',
      data.name || '',
      data.instagram || '',
      data.device || ''
    ]);

    return buildCorsResponse({ result: 'ok' });
  } catch (err) {
    return buildCorsResponse({ result: 'error', error: err.toString() });
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    const answers = [];
    if (lastRow > 1) {
      const data = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        answers.push({
          time: row[0] instanceof Date ? row[0].toISOString() : (row[0] || ''),
          answer: row[1] || '',
          text: row[2] || '',
          url: row[3] || '',
          clientTime: row[4] || '',
          name: row[5] || '',
          igHandle: row[6] || '',
          device: row[7] || ''
        });
      }
    }
    return buildCorsResponse({ result: 'ok', answers: answers });
  } catch (err) {
    return buildCorsResponse({ result: 'error', error: err.toString() });
  }
}

function buildCorsResponse(body) {
  const output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return output;
}

function doOptions(e) {
  return buildCorsResponse({ result: 'ok' });
}

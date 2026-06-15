// ============================================================
//  Orgânico do Chico — recebe cadastros da landing foodservice
//  e salva cada um numa linha da planilha.
//  (Cole este código no Apps Script da sua planilha — veja o LEIA-ME)
// ============================================================

function doPost(e) {
  try {
    var planilha = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Cadastros');

    // Se a aba "Cadastros" não existir, cria com o cabeçalho
    if (!planilha) {
      planilha = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Cadastros');
      planilha.appendRow([
        'Data', 'Estabelecimento', 'CNPJ', 'Responsável',
        'WhatsApp', 'E-mail', 'Tipo'
      ]);
    }

    var d = JSON.parse(e.postData.contents);

    planilha.appendRow([
      d.data || new Date().toLocaleString('pt-BR'),
      d.estabelecimento || '',
      d.cnpj || '',
      d.responsavel || '',
      d.whatsapp || '',
      d.email || '',
      d.tipo || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

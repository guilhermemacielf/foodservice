// ============================================================
//  Orgânico do Chico — recebe cadastros da landing foodservice,
//  salva numa planilha e te avisa por e-mail a cada novo cadastro.
//  (Cole este código no Apps Script da sua planilha — veja o LEIA-ME)
// ============================================================

// Pra onde mandar o aviso de novo cadastro (troque se quiser):
var EMAIL_AVISO = "guilhermemacielf@gmail.com";

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

    // Aviso por e-mail (não derruba o cadastro se falhar)
    try {
      var wa = (d.whatsapp || '').replace(/\D/g, '');
      var linkWa = wa ? ('https://wa.me/' + (wa.length === 11 ? '55' + wa : wa)) : '';
      MailApp.sendEmail({
        to: EMAIL_AVISO,
        subject: '🥬 Novo cadastro foodservice: ' + (d.estabelecimento || 'sem nome'),
        body:
          'Novo restaurante cadastrado na landing:\n\n' +
          'Estabelecimento: ' + (d.estabelecimento || '-') + '\n' +
          'CNPJ: ' + (d.cnpj || '-') + '\n' +
          'Responsável: ' + (d.responsavel || '-') + '\n' +
          'WhatsApp: ' + (d.whatsapp || '-') + (linkWa ? ('  ->  ' + linkWa) : '') + '\n' +
          'E-mail: ' + (d.email || '-') + '\n' +
          'Tipo: ' + (d.tipo || '-') + '\n\n' +
          'Mande o cupom de 25% pra ele o quanto antes. 🚀'
      });
    } catch (eMail) { /* ignora falha de e-mail */ }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

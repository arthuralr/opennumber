// Função para extrair o ID da sessão a partir da URL da Bolten/Suporte IA
function capturarEGuardarSessao() {
  const urlAtual = window.location.href;
  
  // Expressão regular para capturar o trecho entre 'sessions/' e '/messaging_rooms' ou o final do segmento
  // Exemplo de URL: .../sessions/e78fcc03-b358-4e93-8ae1-2e6e20146ca2/messaging_rooms...
  const regexSessao = /\/sessions\/([a-zA-Z0-9-]+)/;
  const resultado = urlAtual.match(regexSessao);

  if (resultado && resultado[1]) {
    const idSessao = resultado[1];
    
    // Extrai também a base da URL antes do /sessions/ (ex: https://app.suporte-ia.online/pt/chat/76f887f9-636e-4c22-aebf-9243e19f5eed/whatsapp)
    const urlBase = urlAtual.split('/sessions/')[0];

    // Salva no armazenamento local do Chrome
    chrome.storage.local.set({ 
      idSessaoDia: idSessao, 
      urlBaseDia: urlBase,
      atualizadoEm: new Date().toLocaleDateString()
    }, () => {
      console.log("✅ [Extensão] ID da sessão atualizado com sucesso:", idSessao);
    });
  }
}

// Executa ao carregar a página
capturarEGuardarSessao();
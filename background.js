chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Verifica se a página começou a carregar e se possui o domínio do link intermediário
  if (changeInfo.status === 'loading' && tab.url && tab.url.includes('opennumber.com')) {
    
    try {
      const urlIntermediaria = new URL(tab.url);
      // Extrai o número de telefone (removendo a barra inicial do pathname)
      // Exemplo: /5551254545 -> 5551254545
      const telefone = urlIntermediaria.pathname.replace('/', '');

      if (!telefone || isNaN(telefone)) {
        return; // Caso não seja um número de telefone válido, não faz nada
      }

      // Recupera o ID e a Base salvos no storage
      chrome.storage.local.get(['idSessaoDia', 'urlBaseDia'], (dados) => {
        if (dados.idSessaoDia && dados.urlBaseDia) {
          // Monta a nova URL final perfeitamente estruturada
          // Exemplo esperado: https://app.suporte-ia.online/pt/chat/[ID]/whatsapp/sessions/[ID_SESSÃO]/messaging_rooms?phone=[TELEFONE]
          const urlRedirecionada = `${dados.urlBaseDia}/sessions/${dados.idSessaoDia}/messaging_rooms?phone=${telefone}`;
          
          console.log("➡️ [Extensão] Redirecionando para:", urlRedirecionada);
          
          // Atualiza a aba atual para o destino correto
          chrome.tabs.update(tabId, { url: urlRedirecionada });
        } else {
          console.warn("⚠️ [Extensão] Nenhum ID de sessão ativa encontrado para hoje. Abra a plataforma de atendimento primeiro!");
        }
      });
    } catch (e) {
      console.error("❌ [Extensão] Erro ao processar redirecionamento:", e);
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const brandInput = document.getElementById('brand');
  const promptInput = document.getElementById('prompt');
  const checkBtn = document.getElementById('checkBtn');
  const resultDiv = document.getElementById('result');
  const loadingDiv = document.getElementById('loading');

  // Cargar datos guardados previamente
  chrome.storage.local.get(['apiKey', 'brand'], (data) => {
    if (data.apiKey) apiKeyInput.value = data.apiKey;
    if (data.brand) brandInput.value = data.brand;
  });

  checkBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const brand = brandInput.value.trim();
    const prompt = promptInput.value.trim();

    if (!apiKey || !brand || !prompt) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    // Guardar la API Key y la marca para futuros usos
    chrome.storage.local.set({ apiKey, brand });

    resultDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    checkBtn.disabled = true;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiResponseText = data.choices[0].message.content;
      const regex = new RegExp(brand, 'i'); // Búsqueda ignorando mayúsculas/minúsculas
      const isMentioned = regex.test(aiResponseText);

      loadingDiv.style.display = 'none';
      resultDiv.style.display = 'block';

      if (isMentioned) {
        resultDiv.className = 'success';
        resultDiv.innerHTML = `<strong>¡Éxito!</strong> Tu marca "<b>${brand}</b>" fue mencionada en la respuesta generada por la IA.<br><br><i>Extracto de la IA:</i><br> ${aiResponseText.substring(0, 150)}...`;
      } else {
        resultDiv.className = 'fail';
        resultDiv.innerHTML = `<strong>Sin mención.</strong> La IA no mencionó tu marca en la respuesta para este prompt. ¡Oportunidad de mejora SEO/GEO!`;
      }

    } catch (error) {
      loadingDiv.style.display = 'none';
      resultDiv.style.display = 'block';
      resultDiv.className = 'fail';
      resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
    } finally {
      checkBtn.disabled = false;
    }
  });
});
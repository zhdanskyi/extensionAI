const MI_API_KEY_SECRETA = ""; // API KEY

document.addEventListener('DOMContentLoaded', () => {
  const brandInput = document.getElementById('brand');
  const promptInput = document.getElementById('prompt');
  const checkBtn = document.getElementById('checkBtn');
  const resultDiv = document.getElementById('result');
  const loadingDiv = document.getElementById('loading');

  // Cargar marca guardada previamente para no escribirla siempre
  chrome.storage.local.get(['brand'], (data) => {
    if (data.brand) brandInput.value = data.brand;
  });

  checkBtn.addEventListener('click', async () => {
    const brand = brandInput.value.trim();
    const promptText = promptInput.value.trim();

    if (!brand || !promptText) {
      alert("Por favor, rellena tu marca y la pregunta.");
      return;
    }

    // Guardar la marca para la proxima vez
    chrome.storage.local.set({ brand });

    resultDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    checkBtn.disabled = true;

    try {
      //api keys gemini 
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${""}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptText }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiResponseText = data.candidates[0].content.parts[0].text;
      const regex = new RegExp(brand, 'i');
      const isMentioned = regex.test(aiResponseText);

      loadingDiv.style.display = 'none';
      resultDiv.style.display = 'block';

      if (isMentioned) {
        resultDiv.className = 'success';
        resultDiv.innerHTML = `<strong>Exito!</strong> Tu marca "<b>${brand}</b>" fue mencionada.<br><br><i>Extracto de la IA:</i><br> ${aiResponseText.substring(0, 150)}...`;
      } else {
        resultDiv.className = 'fail';
        resultDiv.innerHTML = `<strong>Sin mencion.</strong> La IA no menciono tu marca para este prompt. Toca mejorar el SEO/GEO!`;
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

<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();
=======
const MI_API_KEY_SECRETA = ""; // API KEY

>>>>>>> 8ac5f62be96eb47725e174bc7b7f64e316d11a32
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
      //se puede usar la misma api key para varios modelos, solo hay que cambiar el endpoint
      //se pueden usar otros modelos como gemini-1.5-flash, gemini-2-flash, etc. dependiendo de la necesidad de velocidad o calidad
      //se pueden usar otras IAS como gpt-4, gpt-3.5-turbo, etc. pero hay que cambiar el endpoint y el formato de la request
<<<<<<< HEAD
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.MI_API_KEY_SECRETA}`;
=======
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${""}`;
>>>>>>> 8ac5f62be96eb47725e174bc7b7f64e316d11a32

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

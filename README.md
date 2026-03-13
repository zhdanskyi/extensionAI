# 🤖 Brand Checker para IA

## ¿Qué hace exactamente este invento?

Esta extensión envía una pregunta a ChatGPT en segundo plano y analiza el texto que devuelve para comprobar si **menciona tu marca o la de tu competencia**.

Es una forma rápida de ver si la inteligencia artificial:

- tiene en cuenta tu marca
- menciona a tus competidores
- o directamente **no sabe que existes**

Resulta muy útil para analizar **visibilidad de marca en sistemas de IA** y detectar si necesitas mejorar tu estrategia de marketing digital.

---

# ⚙️ Cómo instalarla en tu ordenador

1️⃣ Abre **Google Chrome**.

2️⃣ Escribe esto en la barra de direcciones:

```
chrome://extensions
```

3️⃣ En la esquina superior derecha activa **Modo de desarrollador**.

4️⃣ Aparecerán nuevos botones en la parte superior izquierda. Haz clic en:

```
Cargar descomprimida
```

5️⃣ Selecciona la carpeta donde guardaste los **tres archivos de la extensión**.

⚠️ Importante:  
Selecciona la **carpeta normal**, no un archivo `.zip`.

6️⃣ ¡Listo!

Para tener la extensión siempre visible:

- Haz clic en el icono del **puzzle** en la esquina superior derecha de Chrome.
- Busca tu extensión.
- Pulsa la **chincheta 📌** para fijarla.

---

# 🚀 Cómo empezar a usarla

1️⃣ Haz clic en el icono de la extensión.

Se abrirá el **panel de control**.

2️⃣ En el primer campo introduce tu **API Key de OpenAI**.

Puedes obtenerla aquí:

https://platform.openai.com/api-keys

3️⃣ En el segundo campo escribe **tu marca**.

Ejemplos:

```
Nike
Unir
Amazon
Zara
```

4️⃣ En el cuadro grande escribe una **pregunta real que haría un cliente**.

Ejemplos:

```
¿Cuáles son las mejores zapatillas para correr?
¿Qué universidad online es mejor para estudiar derecho?
¿Qué marcas de ropa deportiva son recomendables?
```

5️⃣ Pulsa el **botón naranja**.

6️⃣ Espera unos segundos.

El sistema analizará la respuesta de la IA.

Resultados posibles:

🟢 **Mensaje verde**  
La IA menciona tu marca.

🔴 **Mensaje rojo**  
La IA no menciona tu marca.

---

# 🔧 Qué puedes modificar a tu gusto

Si quieres personalizar la extensión puedes editar los archivos.

---

## 🎨 popup.html — Diseño de la extensión

Aquí controlas el **aspecto visual**.

Puedes modificar:

- textos que aparecen en pantalla
- estructura del panel
- colores

Si buscas la palabra:

```
primary
```

puedes cambiar el **color naranja** por el color de tu marca.

---

## 🧠 popup.js — Lógica de la extensión

Este archivo contiene el **cerebro de la aplicación**.

Aquí se encuentra:

- la llamada a la API de OpenAI
- el análisis de la respuesta
- la detección de la marca

Si tienes acceso a modelos más nuevos puedes cambiar:

```
gpt-3.5-turbo
```

por otro modelo como por ejemplo:

```
gpt-4
gpt-4o
gpt-4o-mini
```

---

## ⚙️ manifest.json — Configuración de Chrome

Este archivo le dice a Chrome:

- cómo se llama la extensión
- qué hace
- qué permisos necesita

Puedes modificar:

```
name
description
```

para cambiar el **nombre y la descripción** de tu extensión.

---

# 💡 Idea de uso

Esta herramienta puede utilizarse para analizar:

- visibilidad de marca en IA
- posicionamiento frente a competidores
- impacto del marketing digital
- aparición en respuestas generadas por inteligencia artificial

En otras palabras:

**SEO para IA.**

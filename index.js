const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/webhook', async (req, res) => {
  const userMsg = req.body.Body;

  const messages = [
    { role: "system", content: "Eres un asistente profesional y amigable que responde preguntas de clientes." },
    { role: "user", content: userMsg }
  ];

  try {
  const gptRes = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
  model: "mistralai/mistral-7b-instruct", // o el modelo que elijas
  messages: messages
}, {
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://tudominio.com', // opcional, puedes usar tu dominio o dejarlo genérico
    'X-Title': 'chatbot-whatsapp'
  }
});

    const reply = gptRes.data.choices[0].message.content;
    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>${reply}</Message></Response>`);
  } catch (error) {
    console.error("Error al procesar:", error.response?.data || error.message);
    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>Error procesando tu mensaje. Intenta más tarde.</Message></Response>`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));
// bot actualizado

 require('dotenv').config();
console.log("CLAVE CARGADA:", process.env.OPENAI_API_KEY); 

 